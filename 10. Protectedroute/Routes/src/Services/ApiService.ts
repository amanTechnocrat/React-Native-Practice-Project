import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

interface RequestOptions {
    [key: string]: any;
}

export default class ApiService {

    static baseURL = (() => {
        switch (Config.NODE_ENV) {
            case "production":
                return Config.REACT_NATIVE_APP_API_URL;
            case "staging":
                return Config.REACT_NATIVE_APP_API_URL_STAGING;
            default:
                return Config.REACT_NATIVE_APP_API_URL_DEVELOPMENT;
        }
    })();


    static methods = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
    };

    static endpoints = {
        login: "/auth/login",
        refreshToken: "/auth/refreshToken"
    };

    static async makeAPICall({
        methodName,
        apiPath,
        body,
        params,
        options,
    }: {
        methodName: string;
        apiPath: string;
        body?: any;
        params?: string;
        options?: RequestOptions;
    }): Promise<AxiosResponse | undefined> {
        const apiUrl = this.baseURL + apiPath;

        // Request interceptor to add the auth token header to requests
        axios.interceptors.request.use(
            async (config: any) => {
                const accessToken = await AsyncStorage.getItem("accessToken");
                config.headers = {
                    accept: "application/json",
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    authorization: accessToken ? `Bearer ${accessToken}` : null,
                    platform: "mobile-user",
                    ...options,
                };
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor to refresh token on receiving token expired error
        axios.interceptors.response.use(
            (response) => response,
            async function (error) {
                const originalRequest = error.config;
                const refreshToken = await AsyncStorage.getItem("refreshToken");
                if (
                    refreshToken &&
                    error?.response?.status === 401 &&
                    !originalRequest._retry
                ) {
                    if (originalRequest.url?.includes("/refreshToken")) {
                        return Promise.reject(error);
                    }
                    originalRequest._retry = true;
                    try {
                        const response = await axios.post(
                            ApiService.baseURL + ApiService.endpoints.refreshToken,
                            {
                                refreshToken: refreshToken,
                            }
                        );
                        if (response.status === 200 && response.data.authToken) {
                            await AsyncStorage.setItem(
                                "accessToken",
                                response.data.authToken.accessToken
                            );
                            await AsyncStorage.setItem(
                                "refreshToken",
                                response.data.authToken.refreshToken
                            );
                            console.log("Access token refreshed!");
                            const res = await axios(originalRequest);
                            return res;
                        } else {
                            console.log("Refresh Token Error", error);
                            return Promise.reject(response);
                        }
                    } catch (e) {
                        return Promise.reject(e);
                    }
                } else {
                    return Promise.reject(error);
                }
            }
        );

        try {
            let response;
            switch (methodName) {
                case this.methods.GET:
                    response = await axios.get(params ? `${apiUrl}?${params}` : apiUrl);
                    break;
                case this.methods.POST:
                    response = await axios.post(
                        params ? `${apiUrl}/${params}` : apiUrl,
                        body,
                        options
                    );
                    break;
                case this.methods.PUT:
                    response = await axios.put(
                        params ? `${apiUrl}/${params}` : apiUrl,
                        body,
                        options
                    );
                    break;
                case this.methods.DELETE:
                    response = await axios.delete(apiUrl, { data: body });
                    break;
                default:
                    throw new Error("Invalid method");
            }

            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    static logOut() {
        // Implement your logout logic here
        console.log("Logging out...");
    }
}

import React, { FC, createContext } from 'react'
import { PropsWithChildren } from 'react';
import { useState } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AuthContextService = createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => { }
})

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const defaultValue = {
    isLoggedIn,
    setIsLoggedIn,
  }
  return (
    <AuthContextService.Provider value={defaultValue}>
      {children}
    </AuthContextService.Provider>
  )
}

export default AuthContextService
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';


function App(): JSX.Element {
  const animation = useRef(new Animated.Value(0)).current
  const [isBlowing, setIsBlowing] = useState(false);
  const [height, setHeight] = useState(30);
  let timeout: any

  animation.addListener(({ value }) => {
    if (value == 0) {
      setHeight(30)
    }
  })

  const startAnimation = () => {
    setIsBlowing(true);

    Animated.spring(animation, {
      toValue: height,
      useNativeDriver: true,
    }).start(() => {
      setIsBlowing(false);
      timeout = setTimeout(() => {
        if (isBlowing) return;
        stopAnimation();
      }, 0)
    });
    setHeight(height + 2)
  };

  const stopAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    clearTimeout(timeout)
  };


  return (
    <>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={classes.container}>
          <Animated.View style={[classes.box, {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -500]
                })
              }
            ]
          }]} />

          <TouchableOpacity style={classes.btn} onPress={startAnimation}>
            <Text style={classes.btnTxt}>Blow Air</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 20
  },
  box: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 50
  },
  btn: {
    marginTop: 15,
    width: "70%",
    height: "10%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  btnTxt: {
    color: "#fff",
    fontSize: 40
  }
});

export default App;

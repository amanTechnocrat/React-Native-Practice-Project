import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme
} from 'react-native';
import FlatCard from './components/FlatCard';


const App = () => {
  const isDarkMode = useColorScheme() == "dark"
  return (
    <View style={styles.container}>
      {/* <Text style={isDarkMode ? styles.textColor : styles.textColor2}>Hello World</Text> */}
     <FlatCard/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  textColor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
  },
  textColor2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default App;

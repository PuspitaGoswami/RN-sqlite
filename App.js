import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View , TouchableWithoutFeedback, Keyboard} from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import Navigator from './Navigations/NavigationScreen';
import SplashScreen from './Screens/SplashScreen';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() =>{
      setIsLoading(false);
    }, 1000)
  });
  if(isLoading){
    return(
      <SplashScreen/>
     
    );
  }
  return (
   <Navigator/>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

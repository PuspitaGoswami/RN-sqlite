import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from 'react';

import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import ForgotPassScreen from '../Screens/ForgotPassScreen';
import HomeScreen from '../Screens/HomeScreen';

const screens = {
  
 
    LoginScreen: {
        screen:LoginScreen,
        navigationOptions: ({navigation}) => {
            return{
                headerShown: false
            }
          

            
        }
    },
    SignUpScreen: {
        screen:SignUpScreen,
        navigationOptions: ({navigation}) => {
            return{
                headerShown: false
            }
          

            
        }
    },
    ForgotPassScreen: {
        screen:ForgotPassScreen,
        
    },
    HomeScreen: {
        screen:HomeScreen,
        
    },

}

const NavigationScreens = createStackNavigator(screens);

export default createAppContainer(NavigationScreens);
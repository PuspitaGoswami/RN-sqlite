import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const logOutHandler = async () => {
        await AsyncStorage.removeItem('userToken');

        navigation.navigate('LoginScreen');
        console.log(   await AsyncStorage.getItem('userToken'));
      }
return (
    <View>
    <Text>HomeScreen</Text>
    <Button title='LogOut' onPress={logOutHandler}/>
</View>
);
};

const styles = StyleSheet.create({

});

export default HomeScreen;
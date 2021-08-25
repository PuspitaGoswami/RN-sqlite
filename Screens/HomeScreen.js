import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

const HomeScreen = ({navigation}) => {
    const logOutHandler = () => {
        navigation.navigate('LoginScreen');
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
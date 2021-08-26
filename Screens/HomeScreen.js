import React, {useState} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    {
      name:'UsersDB',
      location:'default'
    },
    ()=>{},
    error=>{console.log(error)}
  );
  

const HomeScreen = ({navigation}) => {

const [name,setName] = useState('');
const [phone, setPhone] = useState('');

    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT Name, PhoneNo FROM Users",null,
            (tx,result)=>{
                var len = result.rows.length;
                console.log('length: '+ len);
                if(len> 0){
                    console.log( result.rows.item(0).Name);
                    var userName = result.rows.item(0).Name;
                    var phone = result.rows.item(0).PhoneNo;
                    setName(userName);
                    setPhone(phone);
                }
            }
        )
    })

    console.log(name);

    const logOutHandler = async () => {
        await AsyncStorage.removeItem('userToken');

        navigation.navigate('LoginScreen');
        //console.log(await AsyncStorage.getItem('userToken'));
      }
return (
    <View>
    <Text>HomeScreen</Text>
    <Text>{name}</Text>
    <Text>{phone}</Text>

    <Button title='LogOut' onPress={logOutHandler}/>
</View>
);
};

const styles = StyleSheet.create({

});

export default HomeScreen;
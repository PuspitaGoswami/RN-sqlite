import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import style from "../Styles/style";

// const db = SQLite.openDatabase(
//     {
//         name: 'UsersDB',
//         location: 'default'
//     },
//     () => { console.log("success")},
//     error => { console.log(error) }
// );

const db = SQLite.openDatabase('db.testDb')
db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT, PhoneNo TEXT)'
    )
  })


const HomeScreen = ({ navigation }) => {

    const viewData = () => {
        console.log("view data");
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT Name, PhoneNo FROM Users", null,
                (tx, result) => {
                    var len = result.rows.length;
                    console.log('length: ' + len);
                    if (len > 0) {
                        console.log(result.rows.item(0).Name);
                        console.log(result.rows.item(0).PhoneNo);
                    }
                }
            )
        })
        console.log("view data end");
    }

    const insertData = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Users (Name, PhoneNo) values (?, ?)', ['gibberish', '01111'])
        })
    }

    return (
        <View>
            <Text>HomeScreen</Text>
            {/* <Text>{name}</Text>
            <Text>{phone}</Text> */}

            <Button style ={style.submit_button} title='View Data' onPress={viewData} />
            <Button style ={style.submit_button} title='insert data' onPress={insertData} />
        </View>
    );
};

export default HomeScreen;
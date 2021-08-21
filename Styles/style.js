import React from 'react';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    formContainer: {
      width: "80%",
      height: "100%",
      padding: 10,
    },
    input: {
      width: "100%",
      height: 50,
      padding: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      marginVertical: 5,
    },
  
    errorText: {
        color: 'crimson',
        marginBottom: 5,
        marginTop: 5,
        fontWeight:'bold',
    }
  });

export default style;

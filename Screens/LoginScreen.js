import React, {useState} from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import style from "../Styles/style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./HomeScreen";

const LoginSchema = yup.object({
  phone: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const LoginScreen = ({ navigation }) => {

  const [isSucces,setIsSucces] = useState(true);

  const clickHandler = () => {
    navigation.navigate("SignUpScreen");
  };

  const forgotPassHandler = () => {
    navigation.navigate("ForgotPassScreen");
  };
  const LoginHandler = () => {
    navigation.navigate("HomeScreen");
  };


  return (
    <View style={{ width: "100%", height: "100%", marginTop: 80 }}>
      
      <Text>Log in Form</Text>
      <Formik
        style={style.formContainer}
        validationSchema={LoginSchema}
        initialValues={{ phone: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              phone: values.phone,
              password: values.password,
            });

            console.log(raw);

            let respn = await fetch(
              "http://192.168.68.107:4000/api/user/login",
              {
                method: "post",
                mode: "no-cors",
                headers: myHeaders,
                body: raw,
              }
            );
            let response = await respn.json();
            await AsyncStorage.setItem('userToken', response.token);
            const userToken =  await AsyncStorage.getItem('userToken');
            console.log(userToken);

            
            actions.resetForm();
            if (
              response.status === 'success' && userToken!== ''
            ) {
              {
                LoginHandler();
              }
            }
            else{
              alert('Invalid phone number/Password');
            }

          } catch (err) {
            console.log(err);
            alert('Invalid phone number/Password');
          }
          console.log(values);
          actions.resetForm();
        
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={style.input}
              onChangeText={props.handleChange("phone")}
              placeholder="01*********"
              onBlur={props.handleBlur("phone")}
              value={props.values.phone}
            />

            <Text style={style.errorText}>
              {props.touched.phone && props.errors.phone}
            </Text>

            <TextInput
              style={style.input}
              onChangeText={props.handleChange("password")}
              placeholder="Password"
              onBlur={props.handleBlur("password")}
              value={props.values.password}
            />
            <Text style={style.errorText}>
              {props.touched.password && props.errors.password}
            </Text>

            <Button onPress={props.handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <View style={{ marginVertical: 20 }}>
        <Button title="Register" onPress={clickHandler} />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button title="Forgot Password" onPress={forgotPassHandler} />
      </View>
    </View>
  );
};

export default LoginScreen;

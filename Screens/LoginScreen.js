import React from "react";
import { TextInput, StyleSheet, View, Button, Text , TouchableWithoutFeedback} from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import style from "../Styles/style";

const LoginSchema = yup.object({
    email:  yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required')

});

const LoginScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%", marginTop: 100 }}>
      <Text>Log in Form</Text>
      <Formik
        style={style.formContainer}
        validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
            console.log(values)
            actions.resetForm()
        }

           }
      >
        {(props) => (
          <View>
            <TextInput
              style={style.input}
              onChangeText={props.handleChange("email")}
              placeholder="example@gmail.com"
              onBlur={props.handleBlur("email")}
              value={props.values.email}
            />

            <Text style={style.errorText}>{props.touched.email && props.errors.email}</Text>

            <TextInput
              style={style.input}
              onChangeText={props.handleChange("password")}
              placeholder="Password"
              onBlur={props.handleBlur("password")}
              value={props.values.password}
            />
            <Text style={style.errorText}>{props.touched.password && props.errors.password}</Text>

            <Button onPress={props.handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};



export default LoginScreen;

import React from "react";
import { TextInput, StyleSheet, View, Button, Text , TouchableWithoutFeedback} from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import style from "../Styles/style";

const SignUpSchema = yup.object({
    name: yup.string().required('Required'),
    email:  yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required').min(8, (min) => 'Password must be 8 characters.')  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword:  yup.string()
    .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("password")],
          "Both password need to be the same"
        ),
      })
    .required('Required')


});

const SignUpScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%", marginTop: 100 }}>
      <Text>SignUp Form</Text>
      <Formik
        style={style.formContainer}
        validationSchema={SignUpSchema}
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
              onChangeText={props.handleChange("name")}
              placeholder="Enter Full Name"
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />
        <Text style={style.errorText}>{props.touched.name && props.errors.name}</Text>

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

            <TextInput
              style={style.input}
              onChangeText={props.handleChange("confirmPassword")}
              placeholder="Confirm Password"
              onBlur={props.handleBlur("confirmPassword")}
              value={props.values.confirmPassword}
            />

<Text style={style.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>

            <Button onPress={props.handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};



export default SignUpScreen;

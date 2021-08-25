import React from "react";
import { TextInput, StyleSheet, View, Button, Text , TouchableWithoutFeedback} from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import style from "../Styles/style";

const SignUpSchema = yup.object({
    name: yup.string().required('Required'),
    phone:  yup.string().required('Required'),
    password: yup.string().required('Required').min(8, (min) => 'Password must be 8 characters.'),
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

const SignUpScreen = ({navigation}) => {

  const clickHandler = () => {
    navigation.navigate('LoginScreen');
  }


  return (
    <View style={{ width: "100%", height: "100%", marginTop: 70 }}>
      <Text>Registration Form</Text>
      <Formik
        style={style.formContainer}
        validationSchema={SignUpSchema}
        initialValues={{name: "",phone: "", password: "" , confirmPassword:""}}
        onSubmit={async (values, actions) => {
          
            console.log(values)
            try {
              var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "name" : values.name,
              "phone":values.phone,
              "password": values.password,
              "confirmPassword": values.confirmPassword
            });

            console.log(raw);
            
            let respn = await fetch('http://192.168.68.107:4000/api/user/signup', {
              method: 'post',
              mode: 'no-cors',
              headers: myHeaders,
              body: raw
            });
            let response = await respn.json()
            console.log(response);
            actions.resetForm()
            }
           catch(err) {
            console.log(err)
          } 
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
              onChangeText={props.handleChange("phone")}
              placeholder="01*********"
              onBlur={props.handleBlur("phone")}
              value={props.values.phone}
            />

            <Text style={style.errorText}>{props.touched.phone && props.errors.phone}</Text>

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
      <View>
        <Text>Already Have an Account?</Text>
        <Button title='Login Here' onPress={clickHandler}/>
      </View>
    </View>
  );
};



export default SignUpScreen;

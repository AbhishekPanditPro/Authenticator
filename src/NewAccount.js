import React, { useState } from 'react';
import { Alert, Button, ImageBackground, Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Vibration } from 'react-native';
import Axios from 'axios';
import validator from 'validator';


export default function NewAccount({ navigation }) {
  const [fname, setfName] = useState('');
  const [lname, setlname] = useState('');
  const [emailReg, setemailReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');

  const register = () => {

    // console.log('I here');

    if (fname == '') {
      alert("Please enter first name!");
    } else if (lname == '') {
      alert("Please enter last name!");
    } else if (emailReg == '') {
      alert("Please enter email!");
    } else if (passwordReg == '') {
      alert("Please enter password!");
    } else {
      if (validator.isEmail(emailReg)) {
        if (validator.isStrongPassword(passwordReg)) {

          Axios.post('http://localhost:3008/register_check', {
            email: emailReg,
          }).then((res) => {
            console.log(res.data);
            const response = res.data;
            if (response) {
              Alert.alert('Error!', 'Email already exist!');
            }
            else {
              Alert.alert('Error!', 'Email or Password does not match!\n\nDo you want to create a new account?');
            }
          }).catch(error => {
            console.log("Account Created");
            
            Axios.post('http://localhost:3008/register',  // this helps to send the data to the database
            {email: emailReg,
             password: passwordReg,
             first_name:fname,
             last_name:lname,
            }).then((response) => {
              console.log(response);
            });
            alert('Account Created');
            navigation.navigate('Index');
          });



        } else {
          alert("Please enter a strong PASSWORD!");
        }
      } else {
        alert("Please enter a valid email address!");
      }
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.body}>

        <View style={styles.container}>
          <View style={styles.container1}>
            <TextInput placeholder='First Name'
              autoCorrect={false}
              style={styles.textinp1}
              onChangeText={(val) => setfName(val)}>
            </TextInput>
            <TextInput placeholder='Last Name'
              autoCorrect={false}
              style={styles.textinp1}
              onChangeText={(val) => setlname(val)}></TextInput>
          </View>
          {/* <Text> name is: {fname}</Text>  */}

          <View>
            <TextInput placeholder='Email'
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.textinp2}
              keyboardType='email-address'
              onChangeText={(val) => setemailReg(val)}></TextInput>
          </View>
          <View>
            <TextInput
              secureTextEntry={true}
              placeholder='Password'
              autoCorrect={false}
              style={styles.password}
              onChangeText={(val) => setpasswordReg(val)}></TextInput></View>
          <View style={styles.button_create}>
            <Button title="Create" onPress={() => register()} color='red'  ></Button>
            {/* {navigation.navigate('Index'); Vibration.vibrate(20)} */}
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'violet',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'lightblue',
    margin: 20,
    height: 300,
    borderRadius: 20,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 370,
    height: 100,
    borderRadius: 20,
  },
  textinp1: {
    backgroundColor: 'white',
    height: 50,
    marginTop: 25,
    width: 170,
    borderRadius: 20,
    paddingLeft: 20,
  },
  textinp2: {
    backgroundColor: 'white',
    height: 50,
    marginLeft: 10,
    width: 350,
    borderRadius: 20,
    paddingLeft: 20,
  },
  password: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 50,
    marginLeft: 10,
    width: 350,
    borderRadius: 20,
    paddingLeft: 20,
  },
  button_create: {
    marginTop: 20,
    width: 300,
    alignContent: 'center',
    marginLeft: 35,

  }

});

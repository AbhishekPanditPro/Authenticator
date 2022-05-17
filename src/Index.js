import React, { useState } from 'react';
import { Alert, Button, ImageBackground, Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Vibration } from 'react-native';
import Axios from 'axios';


export default function Index({ navigation }) {
  const [send_email, getemailReg] = useState('');
  const [send_password, getpasswordReg] = useState('');
  //from the frontend 

  const [setemail, emailRegis] = useState('');
  const [setpassword, passwordRegis] = useState('');
  //from the server


  const validity = () => {

    Axios.post('http://localhost:3008/validity', {
      email: send_email,
      password: send_password,
    }).then((res) => {
      // console.log(res.data);
      const response = res.data;
      if (response) {
        navigation.navigate('Logged In');
      } else {
        Alert.alert('Error!', 'Email or Password does not match!\n\nDo you want to create a new account?');
      }
    }).catch(error => {
      // console.log('>>>>>>h', error);
      Alert.alert('Error!', 'Email or Password does not match!\n\nDo you want to create a new account?',[{
        text:'Create',
        onPress: ()=>{
          navigation.navigate('New Account');
        }},
        {
          text: 'Cancel',
          onPress: ()=>{
            Vibration.vibrate(20);
          }
        }
      
      ]);
    });

  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.mainContainer}>

      <View style={styles.body}>


        <Text style={styles.text1}>Hi</Text>
        <View style={styles.main}>
          <View style={styles.main1}>
            <Text style={styles.text2}>Sign In/Sign Up</Text>

          </View>
          <View style={styles.email_container}><TextInput
            placeholder='Email'
            keyboardType='email-address'
            autoCorrect={false}
            style={styles.email}
            autoCapitalize="none"
            onChangeText={(val) => getemailReg(val)}
          ></TextInput>
            <TextInput
              secureTextEntry={true}
              placeholder='Password'
              autoCorrect={false}
              style={styles.password}
              onChangeText={(val) => getpasswordReg(val)}></TextInput>
          </View>

          <View style={styles.button_containers}>
            <Button color="green" title='Login In'
              style={styles.button1}
              onPress={() => { Vibration.vibrate(10); validity() }}></Button>
            <Text style={styles.fpass}
              onPress={() => { Vibration.vibrate(250); navigation.navigate('New Account') }}>Create a new account?</Text>
          </View>
        </View>

      </View>
    </View>
    </TouchableWithoutFeedback>

  );
}
const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
  },
  body: {
    // backgroundColor:'yellow',
    alignItems: 'center',
  },
  main: {
    height: 400,
    width: 400,
    backgroundColor: 'violet',
    borderRadius: 20,
  },
  main1: {
    width: 400,
    marginTop: 10,
    alignItems: 'center',
  },

  text1: {
    fontSize: 40,
    alignItems: 'center',
    margin: 20,
  },
  text2: {
    fontSize: 20,
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  email: {
    backgroundColor: 'white',
    width: 350,
    height: 70,
    paddingLeft: 10,
    borderRadius: 10,
  },
  email_container: {
    // backgroundColor:'red',
    marginTop: 20,
    marginLeft: 25,

  },
  password: {
    marginTop: 20,
    marginBottom: 20,

    backgroundColor: 'white',
    width: 350,
    height: 70,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button_containers: {
    marginTop: 10,
    width: 400,
    borderRadius: 30,
    alignItems: 'center'
  },
  button1: {
  },
  fpass: {
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
});


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Index from './src/Index';
import newAccount from './src/NewAccount';
import Login from './src/Login';




const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Index'>
        <Stack.Screen name="Index" component={Index} options={{
            title: 'Main Page',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#763471',
            },
            
          }}/>
        <Stack.Screen name="New Account" component={newAccount} options={{
          title: 'New Account',
          headerStyle:{
            backgroundColor:'violet',
          },
        }}/>
        <Stack.Screen name="Logged In" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};
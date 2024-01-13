import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../Screens/SignupScreen';
import Login from '../Screens/LoginScreen';
import LandingScreen from '../Screens/LandingPage';


const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
  return (

    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      
    </Stack.Navigator>


  )
}


export default AuthStack;
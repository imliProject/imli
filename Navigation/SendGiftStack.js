import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendGiftScreen from '../Screens/SendGiftScreen';

 
const Stack = createNativeStackNavigator();

const SendGiftStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SendGiftScreen" component={SendGiftScreen} />
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default SendGiftStack;
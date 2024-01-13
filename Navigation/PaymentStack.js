import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentScreen from '../Screens/PaymentScreen';
 

const Stack = createNativeStackNavigator();

const PaymentStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default PaymentStack;
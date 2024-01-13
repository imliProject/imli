import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftCatScreen from '../Screens/GiftCatScreen';
import UserWishListScreen from '../Screens/UserWishListScreen';

 

const Stack = createNativeStackNavigator();

const GiftCatStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GiftCatScreen" component={GiftCatScreen} />  
          <Stack.Screen name="UserWishListScreen" component={UserWishListScreen} />       
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default GiftCatStack;
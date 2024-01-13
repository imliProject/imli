import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, ImageBackground, ScrollView } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthContext} from '../Context/AuthContext';
import HomeScreen from '../Screens/HomeScreen';
import GiftCatScreen from  '../Screens/GiftCatScreen';
// import UserCatScreen from '../Screens/UserCatScreen';
import UserOccScreen from '../Screens/UserOccScreen';
import FriendsScreen from '../Screens/FriendsScreen';
import SendGiftScreen from '../Screens/SendGiftScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import SendInviteScreen from '../Screens/SendInviteScreen';
import UserWishListScreen from '../Screens/UserWishListScreen';

import AdminScreen from '../Screens/AdminScreen';
const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  const { userToken, adminToken } = useContext(AuthContext);
  // console.log('In Home screen :' , userToken, adminToken );
  function LogoTitle() {
    return (
      
      <Image
        style={{ width: 20, height: 20 }}
        source={require('../Assets/logo.png')}
      />
    );
  }
  return (
    
    <Stack.Navigator>
       
       { adminToken !== null ?  (
        <>
        <Stack.Group screenOptions={{ headerShown: false }} >
         <Stack.Screen name="AdminScreen" component={AdminScreen} />
         </Stack.Group>
      </>
       ) :
       (
        <>
        {/* <Stack.Group screenOptions={{ headerShown: false}}> */}
      <Stack.Group>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />   */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />        
      </Stack.Group>
      <Stack.Group>
         <Stack.Screen name="GiftCatScreen" component={GiftCatScreen} />
        {/* <Stack.Screen name="UserCatScreen" component={UserCatScreen} /> */}
        <Stack.Screen name="UserWishListScreen" component={UserWishListScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="UserOccScreen" component={UserOccScreen} />
        <Stack.Screen name="SendInviteScreen" component={SendInviteScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
        <Stack.Screen name="SendGiftScreen" component={SendGiftScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Group>
      {/* <Stack.Screen name="GiftCatScreen" component={GiftCatScreen} />
        <Stack.Screen name="UserCatScreen" component={UserCatScreen} />
        <Stack.Screen name="UserOccScreen" component={UserOccScreen} />
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
        <Stack.Screen name="SendGiftScreen" component={SendGiftScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="SendInviteScreen" component={SendInviteScreen} />
        <Stack.Screen name="UserWishListScreen" component={UserWishListScreen} /> */}
        {/* </Stack.Group> */}
      </>
       )
       }
    </Stack.Navigator>


  )
}


export default HomeStack;
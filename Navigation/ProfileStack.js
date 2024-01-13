import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/ProfileScreen';


const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AddrModal" component={AddrModal} />
      </Stack.Group> */}
      
    </Stack.Navigator>


  )
}


export default ProfileStack;
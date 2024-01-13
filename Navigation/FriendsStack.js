import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsScreen from '../Screens/FriendsScreen';
 

const Stack = createNativeStackNavigator();

const FrinedsStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default FrinedsStack;
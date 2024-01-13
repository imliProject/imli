import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from '../Screens/AdminScreen';
import CatAdminScreen from '../Screens/AdminPages/CatAdminScreen';
import VendAdminScreen from '../Screens/AdminPages/VendorAdminScreen';
 

const Stack = createNativeStackNavigator();

const AdminStack = ({ navigation }) => {
  // const { isLoggedIn} = useContext(AuthContext);
  return (

    <Stack.Navigator>

      <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen name="CatAdminScreen" component={CatAdminScreen} />
          <Stack.Screen name="VendAdminScreen" component={VendAdminScreen} />
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default AdminStack;
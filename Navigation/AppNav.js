import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import AuthStack from '../Navigation/AuthStack';
import AppStack from './AppStack';
import AdminStack from './AdminStack';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from '../Context/AuthContext';

const Stack = createNativeStackNavigator();


const AppNav = () => {
    
    const { userToken, adminToken } = useContext(AuthContext);

    console.log("In AppNave:, " , userToken, adminToken );
   
    return (
        <NavigationContainer>

          {adminToken !== null ?   <AppStack/> :
           userToken !== null  ?   <AppStack/>   :
                                    <AuthStack /> }
        </NavigationContainer> 
    )
}
export default AppNav;
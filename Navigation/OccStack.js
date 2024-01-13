import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserOccScreen from '../Screens/UserOccScreen';
import SendInviteScreen  from '../Screens/SendInviteScreen';



const Stack = createNativeStackNavigator();

const OccStack = ({ navigation }) => {
    // const { isLoggedIn} = useContext(AuthContext);
    return (

        <Stack.Navigator>

            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="UserOccScreen" component={UserOccScreen} />
                <Stack.Screen name="SendInviteScreen" component={SendInviteScreen} />
            </Stack.Group>
        </Stack.Navigator>


    )
}


export default OccStack;
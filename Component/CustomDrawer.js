import React, { useState, useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../Context/AuthContext';
// import { Avatar, Title } from 'react-native-paper';

const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);
    // const { userRoleId } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);
    return (
        <View style={{ flex: 1 }}>

             {/* <Image source={require('../Assets/logo.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} /> */}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                {/* <View style={{ flexDirection: 'row'}}>
                    <Avatar.Image source={require('../Assets/logo.png')} style={{ height: 20, width: 20, borderRadius: 20 }}/>
                 </View> */}
                <ImageBackground source={require('../Assets/imli_banner.png')} style={{ height: 180, width: 280, borderRadius: 40}}>
                    {/* <Image source={require('../Assets/logo.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} /> */}
                    {/* <Text style={{ color: '#fff', fontSize: 18 }}> User Name </Text> */}
                    
                </ImageBackground>
                
                <View style={{ flex: 1, alignItem: 'center', backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                   
                </View>

            </DrawerContentScrollView>
            <View style={{ paddingTop: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => logout() } styles={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItem: 'center' }}>
                      
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto-Meduim', marginLeft: 15 }}>
                          <Icon  name= 'logout' style={{ color: '#DAA520', fontSize: 23 }}/>  Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    )
}

export default CustomDrawer
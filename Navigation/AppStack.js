import React, { useContext } from 'react';
import CustomDrawer from '../Component/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import GiftCatStack  from './GiftCatStack';
import OccStack from './OccStack';
import FriendsStack from './FriendsStack';
import SendGiftStack from './SendGiftStack';
import PaymentStack from './PaymentStack';
import AdminStack from './AdminStack';


const Drawer = createDrawerNavigator();


const AppStack = ({ navigation }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  const { userToken, adminToken } = useContext(AuthContext);
  console.log(" in app stack :" , userToken, adminToken);
  return (

    <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -5,
          fontFamily: 'cursive',
          fontSize: 20,
        }
      }}
    >
      {userToken !== null ?  (
          <>
            <Drawer.Screen  name="Home" component={HomeStack} 
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'home'}
              color={'#DAA520'}/>}}
             />
            <Drawer.Screen name="Profile" component={ProfileStack}
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'person'}
              color={'#DAA520'} /> }}
             />
            <Drawer.Screen name="GiftCategory" component={GiftCatStack}
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'card-giftcard'}
              color={'#DAA520'} /> }}
            />
            <Drawer.Screen name="Occassions" component={OccStack} 
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'event'}
              color={'#DAA520'} /> }}
            />
            <Drawer.Screen name="Friends" component={FriendsStack} 
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'supervised-user-circle'}
              color={'#DAA520'} /> }}
            />
            <Drawer.Screen name="Gift Friend" component={SendGiftStack} 
            options = {{ drawerIcon: config => <Icon
              size={23}
              name={'schedule-send'}
              color={'#DAA520'} /> }}
            />
            {/* <Drawer.Screen name="Admin" component={AdminStack} /> */}
          </>
        ) : 
        adminToken !== null ?
        (
         <>
           <Drawer.Screen name="Admin" component={AdminStack} />
           <Drawer.Screen name="Category" component={AdminStack} />
          </>
        ): (
          // (
        <>
            <Drawer.Screen name="Login" component={AuthStack} />
          </>
        )
         }
       
       
       
    </Drawer.Navigator>
        )
}

export default AppStack;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '@env';

// import { resolvePath } from 'react-native-reanimated/lib/types/lib/reanimated2/animation/styleAnimation';
import { Alert } from 'react-native';

export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [UserName, setUserName] = useState("");
  const [UserMobile, setUserMobile] = useState("");
  const [Id, setId] = useState("");
   

  useEffect(() => {
    console.log('In authprovider useEffect');
    isLogggedIn();
    // getuserType(userName);
  }, []);
  
  const login = (UserEmailID, Password) => {
    // setUserToken('fdsdsfsd');
    // AsyncStorage.setItem('userToken', 'fdsdsfsd');
    if (UserEmailID !== "Admin") {
    getUserToken(UserEmailID, Password)
    }
  else {
    getAdminToken(UserEmailID, Password)
  }
    // {userID !== 'Admin' ? getUserToken : getAdminToken}   
  }
  const getUserToken = (UserEmailID, Password) => {
    console.log( 'In getUserToken ');
    axios.get('http://192.168.0.118:3000/api/users/getlogin/'+ UserEmailID + '/' + Password, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
    })
    // axios.get('http://192.168.1.42:3000/api/users/getlogin/'+ UserEmailID + '/' + Password)
    // axios.get(Base_Url + '/users/getlogin/'+ UserEmailID + '/' + Password)
    .then(res => {
    // console.log( 'getUserToken ', 'http://192.168.29.123:3000' + '/users/getlogin/'+ UserEmailID + '/' + Password, 'a....');

      // setUserID(userID);
      // setUserName(userName);
      setUserToken( res.data)
      AsyncStorage.setItem('userToken', res.data);
      getUserDtl(UserEmailID);
   })
      .catch(function (error) {
        Alert.alert("Your user ID or Password is wrong")
      console.log(error);
  })
}
const getAdminToken = (UserEmailID, Password) => {
  console.log( 'In getAdminToken ', UserEmailID)
  axios.get('http://192.168.0.118:3000/api' + '/users/getadmin/'+ UserEmailID + '/' + Password)
  .then(res => {
    // setUserID(userID);
    // setUserName(userName);
    setAdminToken( res.data)
    AsyncStorage.setItem('adminToken', res.data);
    // getuserType(userID);
 })
    .catch(function (error) {
      Alert.alert("Your user ID or Password is wrong")
    console.log(error);
})
}
  
  const getUserDtl = (UserEmailID) => {
    
    console.log('In the Auth Provider axios getuserMobile :', UserEmailID );
    axios.get('http://192.168.0.118:3000/api' + '/users/getoneuser/' + UserEmailID)
        .then(res => {
             console.log('..............', res.data)
            // userRoleId.userrole = JSON.stringify(res.data.UserRoleID);
            setUserMobile(res.data.UserMobile);
            setUserName(res.data.UserName);
            setId(res.data.id);
            console.log('In the Auth Provider axios', res.data.UserMobile);
        })
        .catch(e => { 
            console.log('UserMobile Error', e)
        })

}
  const logout = () => {
    // setIsLoading(true);
    setUserToken(null);
    setAdminToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('adminToken');
    // setIsLoading(false);
  }

  const isLogggedIn = async () => {
    try {
      // setIsLoading(true);
      
      let userToken = await AsyncStorage.getItem('userToken');
      console.log('In AuthProvider  isLoggedIn userToken:', userToken);
      setUserToken(userToken);
      // setIsLoading(false);
    } catch (e) {
      console.log('is logged in error ${e');
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, userToken, adminToken, UserName, UserMobile, Id }}>
      {children}
    </AuthContext.Provider>
  )
}
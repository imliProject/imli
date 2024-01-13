import {Base_Url} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// import { resolvePath } from 'react-native-reanimated/lib/types/lib/reanimated2/animation/styleAnimation';
import { Alert } from 'react-native';

export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [UserName, setUserName] = useState("");
  const [UserID, setUserID] = useState("");
  const [UserMobile, setUserMobile] = useState("");
  const [UserEmailId, setuserEmailId] = useState("");
   

  useEffect(() => {
    console.log('In authprovider useEffect');
    isLogggedIn();
    // getuserType(userName);
  }, []);
  
  const login = (UserID, Password) => {
    console.log( 'In the AuthContext axios' , UserID, Password);
    // setUserToken('fdsdsfsd');
    // AsyncStorage.setItem('userToken', 'fdsdsfsd');
    if (UserID !== "Admin") {
    getUserToken(UserID, Password)
    }
  else {
    getAdminToken(UserID, Password)
  }
    // {userID !== 'Admin' ? getUserToken : getAdminToken}   
  }
  const getUserToken = (UserID, Password) => {
    console.log( 'In getUserToken ', UserID, Base_Url);
    axios.get(Base_Url + '/users/getlogin/'+ UserID + '/' + Password)
    // axios.get('http://192.168.0.103:3000/api/users/getlogin/'+ UserID + '/' + Password)
    .then(res => {
      // setUserID(userID);
      // setUserName(userName);
      setUserToken( res.data)
      AsyncStorage.setItem('userToken', res.data);
      getUserDtl(UserID);
   })
      .catch(function (error) {
        Alert.alert("Your user ID or Password is wrong")
      console.log(error);
  })
}
const getAdminToken = (UserID, Password) => {
  console.log( 'In getAdminToken ', UserID)
  axios.get(Base_Url + '/users/getadmin/'+ UserID + '/' + Password)
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
  
  const getUserDtl = (Userid) => {
    
    console.log('In the Auth Provider axios getuserMobile :', Userid );
    axios.get(Base_Url + '/users/getoneuser/' + Userid)
        .then(res => {
            // userRoleId.userrole = JSON.stringify(res.data.UserRoleID);
            setUserMobile(res.data.UserMobile);
            setUserID(res.data.UserID);
            setUserName(res.data.UserName);
            setuserEmailId(res.data.UserEmailID);
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
    <AuthContext.Provider value={{ login, logout, userToken, adminToken, UserID, UserName, UserMobile, UserEmailId }}>
      {children}
    </AuthContext.Provider>
  )
}
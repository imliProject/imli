import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Avatar, Card, Button, Title, TextInput, Paragraph, label, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import validator from 'validator';
import axios from 'axios';
import {Base_Url} from '@env';

const BLUE = "#428AF8"
const LIGHT_GRAY = "#D3D3D3"
const onPress = () => setCount(prevCount => prevCount + 1);

const Signup = ({ navigation }) => {

  // const navigation = useNavigation();

  const [userEmailID, setUserEmailID] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [userID, setuserID] = useState('');
  // const [UserRoleID, setUserRoleID] = useState('');
  // const {setIsLoggedIn} = React.useContext(AuthContext);
  const pattern = new RegExp(/^\d{1,10}$/);
  const [isError, setIsError] = useState(false);
  const [isPhError, setIsPhError] = useState(false);
  const [usrdID, setusrdID] = useState('');

  // const categories = ["Admin", "Observer",  "Candidate",  "Supporter", "Trainer"]
  const [showDropDown, setShowDropDown] = useState(false);

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const validateMobile = (userMobile) => {
    setUserMobile(userMobile)
     if (!userMobile) {
      setIsPhError('Phone number Required')
      return;
     }
     if ( validator.isMobilePhone(userMobile)) {
      setIsPhError(' ')
     }
    else {
      setIsPhError( 'Please Enter a valid Phone Number')
    }
  }
  const validateEmail = (userEmailID) => {
    setUserEmailID(userEmailID)
    if (!userEmailID) {
      setIsError( 'Email Required')
      return;
    }
    if ( validator.isEmail (userEmailID) ) {
      setIsError(' ')
    }
    else {
      setIsError( 'Please Enter a valid Email address')
    }

  }
  const MoveLogin = (UserID, Password) => {
    console.log('in movelogin' , UserID, Password);
    axios.post(Base_Url + '/users/addlogin', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
       UserID: UserID, Password: Password 
    }).then(function (response) {
      console.log("In response:", UserID);
      Alert.alert("User register successfully \n userID: " + UserID);
      return response.data;
    })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
  }

  const register = async () => {
    console.log('in register');
    // alert(called);
    axios.post(Base_Url + '/users/adduser', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
     UserID: userID, UserEmailID: userEmailID, UserName: userName, UserMobile: userMobile, UserPicPath: Pic 
    }).then(function (response) {
      console.log("In response:", userID);
      MoveLogin(userID, Password);
      Alert.alert("User register successfully \n userID: " + userID);
      return response.data;
    })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
    //  setTimeout(5000);

  }

  return (

    <PaperProvider>
      <SafeAreaView>
        <ScrollView>

          <View>
            <Card style={{ marginTop: 100 }}>
              <TextInput
                style={{ marginTop: 5 }}
                label='UserID'
                mode='outlined'
                maxLength={10}
                onChangeText={(userID) => setuserID(userID)}
              />
              {/* <DropDown style={[styles.dropdown, { borderColor: 'blue' }]}
              label={"UserRole"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={UserRoleID}
              setValue={setUserRoleID}
              list={TypeList}
            /> */}
              <TextInput
                style={{ marginTop: 15 }}
                label='Name'
                mode='outlined'
                onChangeText={(userName) => setUserName(userName)}
              />
              <TextInput
                style={{ marginTop: 15 }}
                label='Mobile Number'
                mode='outlined'
                keyboardType="numeric"
                maxLength={10}
                onChangeText={validateMobile}
              />
              {/* {isPhError !== null && (
                  isPhError ? (
                  <Text style={styles.invalidMark}>✗</Text>
                  ) : ( 
                  
                  <Text style={styles.validMark}>✓</Text>
                  )
                  // setIsError(false) 
                )} */}
                {isPhError ? <Text style={styles.errorMessage}>{isPhError}</Text> : null
                }
              <TextInput
                style={{ marginTop: 15 }}
                label='Email'
                mode='outlined'
                // onChangeText={(userEmailID) => setUserEmailID(userEmailID)}
                onChangeText={validateEmail}
                keyboardType='email-address'
                
              />
              {/* {isError !== null && (
                  isError ? (
                  <Text style={styles.invalidMark}>✗</Text>
                  ) : ( 
                  
                  <Text style={styles.validMark}>✓</Text>
                  )
                  // setIsError(false) 
                )} */}
                {isError ? <Text style={styles.errorMessage}>{isError}</Text> : null}
              <TextInput
                style={{ marginTop: 15 }}
                label='Password'
                mode='outlined'
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
              {/* <TextInput
              style={{ marginTop: 15 }}
              label='Confirm Password'
              mode='outlined'
              onChangeText={Password => setPassword(Password)}
            /> */}
            </Card>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Already have Account?? </Text>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={(() => { navigation.navigate('Login') })}
            ><Text style={{ color: 'red' }}>Login </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingLeft: 25, justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={register}
            >
              <Text style={{ color: '#0000FF', fontWeight: 'bold', padding: 2, fontSize: 15 }}>
                <Icon name="save" style={{ color: '#0000FF', fontSize: 25 }} /> Save </Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={(() => { navigation.navigate('Login') })}
            // onPress={onPress}
            >
              <Text style={{ color: 'red', fontWeight: 'bold', padding: 2, fontSize: 15 }} >
                <Icon name="cancel" style={{ color: 'red', fontSize: 25 }} /> Cancel  </Text>
              {/* <Text style={{ color: 'red', fontWeight:'bold', fontSize:20 }}>Cancel </Text> */}
            </TouchableOpacity>
          </View>
          {/* </View> */}
          {/* </SafeAreaView> */}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>

  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: "#DDDDDD",
    padding: 5,
  },
  innerText: {
    justifyContent: 'space-between',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 45,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue'
  },
  dropdown: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 2,
  },
  errorMessage: {
    color: 'red',
    },
    validMark: {
    color: 'green',
    marginLeft: 5,
    fontSize: 20,
    },
    invalidMark: {
    color: 'red',
    marginLeft: 5,
    fontSize: 20,
    }
});

export default Signup;
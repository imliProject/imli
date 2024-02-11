import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Avatar, Card, Button, Title, TextInput, Paragraph, label, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import validator from 'validator';
import axios from 'axios';
import { Base_Url } from '@env';

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
    if (validator.isMobilePhone(userMobile)) {
      setIsPhError(' ')
    }
    else {
      setIsPhError('Please Enter a valid Phone Number')
    }
  }
  const validateEmail = (userEmailID) => {
    setUserEmailID(userEmailID)
    if (!userEmailID) {
      setIsError('Email Required')
      return;
    }
    if (validator.isEmail(userEmailID)) {
      setIsError(' ')
    }
    else {
      setIsError('Please Enter a valid Email address')
    }

  }
  const MoveLogin = (UserID, Password) => {
    console.log('in movelogin', UserID, Password);
    axios.post(Base_Url + '/users/addlogin', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserID: UserID, Password: Password
    }).then(function (response) {
      console.log("In response:", UserID);
      Alert.alert("User register successfully \n userID: " + UserID);
      navigation.navigate('Login');
      return response.data;
    })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
  }

  const register = async () => {
    console.log('in register', Base_Url);
    // alert(called);
    axios.post(Base_Url + '/users/adduser', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserID: userID, UserEmailID: userEmailID, UserName: userName, UserMobile: userMobile
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
          <View style={styles.container}>
            <View style={styles.header}>
              <View>
                <Image
                  style={styles.tinyLogo}
                  source={require('../Assets/imli_logo.png')}
                />
              </View>

              <View>
                <Button icon="help-circle" mode="elevated" textColor="#000080" onPress={() => { help() }}>
                  Help
                </Button>
              </View>
            </View>

            <View style={styles.mainbody}>
              <TextInput
                style={styles.inputStyle}
                label='UserID'
                mode='outlined'
                maxLength={10}
                onChangeText={(userID) => setuserID(userID)}
              />

              <TextInput
                style={styles.inputStyle}
                label='Name'
                mode='outlined'
                onChangeText={(userName) => setUserName(userName)}
              />
              <TextInput
                style={styles.inputStyle}
                label='Mobile'
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
                style={styles.inputStyle}
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
                style={styles.inputStyle}
                label='Password'
                mode='outlined'
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>


            <View>
              <Button icon="content-save" mode="contained" buttonColor="green" style={styles.buttonstyle} onPress={register}> Save </Button>
              
              <Button icon="close-circle" mode="elevated" textColor="#FF0000" style={styles.buttonstyle} onPress={(() => { navigation.navigate('Login') })}> Cancel </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>

  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red"
  },
  mainbody: {
    marginTop: 50,
  },
  buttonstyle: {
    marginTop: 20,
  },
});

export default Signup;
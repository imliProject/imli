import React, { useState, useContext } from "react";
import { Button } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from '../Context/AuthContext';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const BLUE = "#428AF8"
const LIGHT_GRAY = "#D3D3D3"

const Login = ({ navigation }) => {

  const [userID, setuserID] = useState('');
  const [Password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: "698237364896-orst5ee9e0io9ui2olm4nhf1508c4ptg.apps.googleusercontent.com", 
  //     offlineAccess: true
  //   });
  // }, [])

  // const GoogleSingUp = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signIn().then(result => { console.log(result) });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert('User cancelled the login flow !');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert('Google play services not available or outdated !');
  //       // play services not available or outdated
  //     } else {
  //       console.log(error)
  //     }
  //   }
  // };

  const help = () => {
    navigation.navigate('Login');
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
                label='Email ID'
                mode='outlined'
                onChangeText={(userID) => setuserID(userID.trim())}
              />

              <TextInput
                label='Password'
                mode='outlined'
                secureTextEntry={true}
                onChangeText={(Password) => setPassword(Password.trim())}
              />

              <Text style={styles.forgotPassword}>Forgot Password ?</Text>

              <Button icon="login" mode="contained" buttonColor="green" style={styles.buttonstyle} onPress={() => { login(userID, Password) }}> Login </Button>

              <Button icon="facebook" mode="contained" buttonColor="#000080" style={styles.buttonstyle} onPress={() => { login(userID, Password) }}> Sign In with Facebook </Button>

              <Button icon="google" mode="contained" buttonColor="#FF0000" style={styles.buttonstyle} onPress={() => { login(userID, Password) }}> Sign In with Google </Button>

              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 25
                }}
              />

              <Button icon="account" mode="contained" buttonColor="#DAA520" style={styles.buttonstyle} onPress={() => { navigation.navigate('Signup') }}> Sign up </Button>
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
  forgotPassword: {
    marginTop: 10,
    color: "blue"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red"
  },
  btnLogo: {
    margin: 0,
    padding: 0,
    fontSize: 16,
    paddingRight: 50
  },
  mainbody: {
    marginTop: 100,
  },
  buttonstyle: {
    marginTop: 20,
  },
});

export default Login;
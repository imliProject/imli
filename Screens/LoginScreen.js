import React, { useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, ImageBackground, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from '../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';


const BLUE = "#428AF8"
const LIGHT_GRAY = "#D3D3D3"

const Login = ({ navigation }) => {

  const [userID, setuserID] = useState('');
  const [Password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  // const goback = () => {
  //   navigate('LandingScreen');
  // }

  return (

    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginTop: 150 }}>
          {/* <View> */}
          {/* <ImageBackground  source={require('../Assets/logo.png')} resizeMode="stretch"  style={styles.img}>  */}
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between' , backgroundColor: 'lightgreen', alignContent: 'center' }}>
            <Card.Content style={{ width: 300, height: 250 }}>  
            {/* <ImageBackground  source={require('../Assets/logo.png')} resizeMode="stretch"  style={styles.img}>    */}
            <View >
            <TextInput
              style={{ marginTop: 5, width: 300  }}
              label='UserID' 
              mode='outlined'
              onChangeText={(userID) => setuserID(userID)}
            />
            <TextInput
              style={{ marginTop: 5, width: 300 }}
              label='Password'
              mode='outlined'
              secureTextEntry={true}
              // value='Password'
              onChangeText={(Password) => setPassword(Password)}
            />
            </View>
            {/* </Card.Content>
            </Card>
            <Card>
            <Card.Content style={{ width: 175, height: 270 }}> */}
            <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{ width: 300, marginTop: 5, padding: 5, borderRadius: 50, alignItems: 'center' }}

                onPress={() => { login(userID, Password) }}
              >
                <Text style={{ color: 'green' }}> <Icon name="login" style={{ color: '#FFBF00', fontSize: 35 }} />Login</Text>
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Do not have account?? </Text>
              <TouchableOpacity
                // style={{ alignItems: 'center' }}
                style={{ width: 80, borderRadius: 10, alignItems: 'center' }}
                onPress={(() => { navigation.navigate('Signup') })}
              ><Text style={{ color: 'red' }}>SignUp </Text>
              </TouchableOpacity>

            </View>
            {/* </ImageBackground>  */}
            {/* </View> */}
          </Card.Content>
            </Card>
            {/* </ImageBackground> */}
          </View>
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
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 15,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue'
  },
  img: { 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
});

export default Login;
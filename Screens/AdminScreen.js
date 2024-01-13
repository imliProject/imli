import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Avatar, TextInput, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Base_Url} from '@env';
import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const AdminScreen = ({ navigation }) => {

  // const { userName } = useContext(AuthContext);
  const [Pic, setPic] = React.useState(null);
  const [isclicked, setIsclicked] = React.useState(null);
  const [vendclicked, setVendclicked] = React.useState(null);
  const [catid, setCatID] = useState(null);
  const [subcatid, setSubCatID] = useState(null);
  const [ftype, setFType] = React.useState(null);
  const [fname, setFName] = React.useState(null);
  const [itemid, setItemId] = React.useState(null);
  const [itemname, setItemName] = React.useState(null);
  const [catprc, setCatPrc] = React.useState(null);


  const categoryClick = () => {
    setIsclicked(true);
  }
  const vendorClick = () => {
    setIsclicked(null);
    setVendclicked(true);
  }
  // const CategoryImgSave = () => {

  //   console.log('in category image: ', catid, subcatid, Pic, catprc, itemname)
  //   //  if(picFlag == null) {

  //   axios.post(Base_Url + '/users/categoryimgsave', {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     CatID: catid, SubCatID: subcatid, CatSrcPath: Pic, Price: catprc, ItemName: itemname
  //   })
  //     .then(function (response) {
  //       Alert.alert("Record Inserted successfully \n userID: " + catid);
  //       return response.json();
  //     })
  //     .catch(function (error) {
  //       console.log('There has been a problem with your insert operation: ' + error.message);
  //       throw error;

  //     });
  // }
  const logout = () => {
    // setIsLoading(true);
    // setAdminToken(null);
    AsyncStorage.removeItem('adminToken');
    // setIsLoading(false);
  }
  const handleUploadPhoto = async () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled image selection')
      } else if (response.errorCode == 'permission') {
        setToastMsg('Does not have permission')
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage)
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Maximum size exceded',
          'Please choose image below 2 MB',
          [{ text: 'OK' }],
        )
      } else {
        setPic(response.assets[0].uri)
        setFType(response.assets[0].type)
        setFName(response.assets[0].fileName)
        console.log('the response is: ', response.assets[0].uri, response.assets[0].type, response.assets[0].fileName);

      }
    });
  };

  // });
  const [count, setCount] = useState(null);
  const onPress = () => setCount(prevCount => prevCount + 1);

  // const setToastMsg = msg => {
  //   ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  // }

  return (

    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <Card  >
            <Card.Content style={[styles.container]} >
              <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold'}}> Welcome To Admin Page </Text>
            </Card.Content>
          </Card>
          <View style={[styles.container]}>

            <View style={[styles.container]}>
              <Card >
                <Card.Content style={[styles.container]}>
                  {/* <ImageBackground  source={require('../Assets/images/gift_friends.jpg')} resizeMode="cover" style={styles.image}>  */}
                  <TouchableOpacity
                    onPress={(() => { navigation.navigate('VendAdminScreen') })}
                  ><Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 20 }}>
                    Add Vendors</Text>
                  </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* </View>   */}
                </Card.Content>
                <Card.Content style={[styles.container]}>
                  {/* <ImageBackground  source={require('../Assets/images/gift_friends.jpg')} resizeMode="cover" style={styles.image}>  */}
                  <TouchableOpacity
                    onPress={(() => { navigation.navigate('VendAdminScreen') })}
                  ><Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 20 }}>
                    Add Items</Text>
                  </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* </View>   */}
                </Card.Content>
              </Card>
            </View>
            <View style={[styles.container]}>
            <Card >
              <Card.Content style={[styles.container]}>
                {/* <ImageBackground  source={require('../Assets/images/Maintain_Friends.jpg')} resizeMode="cover" style={styles.image}>  */}
                <TouchableOpacity
                  onPress={(() => { navigation.navigate('FriendsScreen') })}
                >
                  <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', padding: 20}}>
                    Users   </Text>
                </TouchableOpacity>
                {/* </ImageBackground> */}
              </Card.Content>
            </Card>
          </View>
          </View>
          <View style={[styles.container]}>
            <View>
              <Card>
                <Card.Content style={[styles.container]}>
                  {/* <ImageBackground  source={require('../Assets/images/MaintainCategory.png')} resizeMode="cover" style={styles.image}> */}
                  <TouchableOpacity
                    onPress={(() => { navigation.navigate('GiftCatScreen') })}
                  ><Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', padding: 20 }}> Occasions </Text>
                  </TouchableOpacity>
                  {/* </ImageBackground> */}
                </Card.Content>
              </Card>

            </View>
            <View>
              <Card>
                <Card.Content style={[styles.container]}>
                  {/* <ImageBackground  source={require('../Assets/images/occasions.jpg')} resizeMode="cover" style={styles.image}> */}
                  <TouchableOpacity
                    onPress={(() => { navigation.navigate('CatAdminScreen') })}
                  ><Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', padding: 20 }}> Category </Text>
                  </TouchableOpacity>
                  {/* </ImageBackground> */}
                </Card.Content>
              </Card>

            </View>
          </View>
         
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
  },

  item: {
    padding: 0,
    fontSize: 15,

  },
  TouchableOpacityStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  ImageClass:
  {
    // Setting up image width.
    width: 30,

    // Setting up image height.
    height: 30

  },
  FloatingActionButtonStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#0B66D3',
    borderColor: '#000000',
    borderRadius: 200 / 2
  },

  FloatingActionButtonImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#FFFFFF'
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appInnerText: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "none"
  },

});
export default AdminScreen;


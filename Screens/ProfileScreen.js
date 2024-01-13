import React, { useState, useEffect, useContext } from 'react';
import { Card, Avatar, Title, TextInput, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, ToastAndroid } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../Context/AuthContext';
import { Base_Url } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


const BLUE = "#428AF8"
const LIGHT_GRAY = "#D3D3D3"


const ProfileScreen = ({ navigation }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [thState, setThState] = useState(false);
  const [thMobile, setThMobile] = useState(false);

  const { UserName, UserID, UserMobile } = useContext(AuthContext);

  console.log('In create Profile :', UserName);

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const [Pic, setPic] = React.useState(null);
  const [picFlag, setPicFlag] = React.useState(null);
  const [addrFlag, setAddrFlag] = React.useState(null);
  const [ftype, setFType] = React.useState(null);
  const [fname, setFName] = React.useState(null);
  const [mnumber, setMnumber] = React.useState(null);
  const [emailid, setEmailId] = React.useState(null);
  const [userHome, setUserHome] = React.useState('');
  const [userStreet, setUserStreet] = React.useState('');
  const [userDistrict, setUserDistrict] = React.useState('');
  const [userCountry, setUserCountry] = React.useState('');
  const [userPin, setUserPin] = React.useState('');
  const [userState, setUserState] = React.useState('');


  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  useEffect(() => {

    axios.get(Base_Url + '/users/getOneUser/' + UserID)
      .then(res => {
        console.log('from fetch list user:', res.data);
        setEmailId(res.data.UserEmailID);
        setMnumber(res.data.UserMobile);
        setPic(res.data.UserPicPath);
      })
      .catch(error => {
        console.error(error);
      });

    // axios.get(Base_Url + '/users/getuserpic/' + UserID)
    //   .then(res => {
    //     console.log('from fetch list getuserpic:', res.data.UserPicPath);
    //     setPic(res.data.UserPicPath);
    //     setPicFlag(1);
    //     console.log('from fetch list user1:', Pic);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    axios.get(Base_Url + '/users/getuseraddress/' + UserID)
      .then(res => {
        console.log('from fetch Adress of user:', res.data);
        setUserHome(res.data.UserHome);
        setUserStreet(res.data.UserStreet);
        setUserDistrict(res.data.UserDistrict);
        setUserCountry(res.data.UserCountry);
        setUserPin(res.data.UserPin);
        setUserState(res.data.UserState);

        setAddrFlag(1);
        // setUserAdrFlag(1);
        // setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
  const Profileimagedele = () => {
    console.log('the UsrSrcPath is : ', Pic);
    Alert.alert(' pic pressed :', Pic);

  }
  const UpdateUserAddr = () => {
    setAddrFlag(null);
    axios.put(Base_Url + '/users/updtusraddr/' + UserID, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserHome: userHome, UserStreet: userStreet, UserDistrict: userDistrict, UserState: userState, UserPin: userPin, UserCountry: userCountry
    })
      .then(function (response) {
        Alert.alert("Record Updated successfully \n userID: " + UserName);
        return response.json();
      })
      .catch(function (error) {
        console.log('There has been a problem with your Update operation: ' + error.message);
        throw error;

      });

  }
  const ProfileImgUpdt = () => {
    setPicFlag(null);
    console.log('The Pic value: ', Pic);
    axios.put(Base_Url + '/users/updtusrpic/' + UserID, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserPicPath: Pic
    })
      .then(function (response) {
        Alert.alert("Record Updated successfully \n userID: " + UserID);
        return response.json();
      })
      .catch(function (error) {
        console.log('There has been a problem with your Update operation: ' + error.message);
        throw error;

      });

  }
  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };
  // const ProfileImgSave = () => {

  //   //  if(picFlag == null) {
  //   axios.post(Base_Url + '/users/profileimgsave', {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     userID: userID, UsrSrcPath: Pic, fileName: fname, type: ftype
  //   })
  //     .then(function (response) {
  //       Alert.alert("Record Inserted successfully \n userID: " + userName);

  //       return response.json();
  //     })
  //     .catch(function (error) {
  //       console.log('There has been a problem with your insert operation: ' + error.message);
  //       throw error;

  //     });

  //       fetch("http://localhost:3000/api/upload", {
  //         method: "POST",
  //       body: createFormData(Pic, { userID: userID })
  //       })
  //       .then(response => response.json())
  //       .then(response => {
  //        console.log("upload succes", response);
  //       Alert.alert("Upload success!");
  //       setPic(null);
  // })
  // .catch(error => {
  //   console.log("upload error", error);
  //   Alert.alert("Upload failed!");
  // });
  // } else{
  //     setPicFlag(null);
  //     Alert.alert("User has already Profile image: " + userName);
  // }
// }

const UserAddrSave = () => {
  // ProfileImgSave();
  // console.log('After ProfileImgSave call', addrFlag);
  if (addrFlag == null) {
    axios.post(Base_Url + '/users/adduseradress', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserID: UserID, UserHome: userHome, UserStreet: userStreet, UserDistrict: userDistrict, UserState: userState, UserPin: userPin, UserCountry: userCountry
    })
      .then(function (response) {
        Alert.alert("Record Inserted successfully \n userID: " + UserName);
        return response.json();
      })
      .catch(function (error) {
        console.log('There has been a problem with your insert operation: ' + error.message);
        throw error;

      });

  }

}
const UserProfileSave = () => {
  console.log('In UserProfileSave Profile PicFlag AddressFlag : ' + addrFlag, + picFlag);
  // if (picFlag != null)
    ProfileImgUpdt();
  if ((addrFlag == null) ? UserAddrSave() : UpdateUserAddr());
};
return (
  <PaperProvider>
    <SafeAreaView>
      <ScrollView>
        <View >
          <Card >
            <Card.Content>
              <View >
                {/* <Text>{Pic} </Text> */}
                <View style={[styles.container]}>
                  <Avatar.Image
                    size={40}
                    source={{ uri: Pic }}
                  >
                  </Avatar.Image>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleUploadPhoto}>
                    <Text> <Icon name="upload-file" style={{ color: '#0000FF', fontWeight: 'bold', fontSize: 30 }} />Upload File</Text>
                  </TouchableOpacity>
                </View>

                {/* </View> */}
                {/* </TouchableHighlight> */}
              </View>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content style={[styles.container]}>
              <Text> {emailid} </Text>
              <Text> {mnumber} </Text>
            </Card.Content>
          </Card>
          <Text style={{ color: '#0000FF', fontWeight: 'bold', fontSize: 15 }}> Shipping Address </Text>
          <Card>
            <Card.Content style={[styles.container]}>

              {/* <TouchableOpacity
                  // onPress={() => navigation.navigate('AddrModal', {item : item.userStreet, item1 : item.userLocation, item2 : item.userDistrict, item3 : item.userState, item4 : item.userPin, item5 : item.userCountry})}>

                  onPress={() => navigation.navigate('AddrModal', { UserHome: userHome, UserStreet: userStreet, UserDistrict: userDistrict, UserState: userState, UserPin: userPin, UserCountry: userCountry })}>

                  <Text style={{ color: '#FFBF00', fontWeight: 'bold', padding: 2, fontSize: 15 }} >
                    <Icon name="cancel" style={{ color: '#FFBF00', fontSize: 20 }} /> Update Address  </Text>
                </TouchableOpacity> */}
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <TextInput
                placeholder='Home Address'
                onChangeText={(userHome) => setUserHome(userHome)}
                value={userHome}
              />
              <TextInput
                placeholder='Street / Location'
                onChangeText={(userStreet) => setUserStreet(userStreet)}
                value={userStreet}
              />
              <TextInput
                placeholder='District'
                onChangeText={(userDistrict) => setUserDistrict(userDistrict)}
                value={userDistrict}
              />
              <TextInput
                placeholder='State'
                onChangeText={(userState) => setUserState(userState)}
                value={userState}
              />
              <TextInput
                placeholder='Pin'
                onChangeText={(userPin) => setUserPin(userPin)}
                value={userPin}
              />
              <TextInput
                placeholder='Country'
                onChangeText={(userCountry) => setUserCountry(userCountry)}
                value={userCountry}
              />
            </Card.Content>
          </Card>
          <Card>
            <Card.Content style={[styles.container]}>
              <TouchableOpacity
                // style={{ flex:1,  flexDirection: 'row', justifyContent: 'space-between' }}
                // onPress={ProfileAddrSave}
                onPress={UserProfileSave}
              >
                <Text style={{ color: '#0000FF', fontWeight: 'bold', padding: 2, fontSize: 15 }}>
                  <Icon name="save" style={{ color: '#0000FF', fontSize: 25 }} /> Save </Text>
              </TouchableOpacity >

              <TouchableOpacity
                // style={{ width: 30, height: 30, padding: 2, borderRadius: 60, alignItems: 'center' }}
                onPress={() => navigation.goBack()}  >
                {/* <Icon name="cancel" style={{ color: 'amber', fontWeight: 'bold',  fontSize: 20 }}> </Icon> */}
                <Text style={{ color: '#FFBF00', fontWeight: 'bold', padding: 2, fontSize: 15 }} >
                  <Icon name="cancel" style={{ color: '#FFBF00', fontSize: 25 }} /> Cancel  </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                    // style={{ width: 30, height: 30, padding: 2, borderRadius: 60, alignItems: 'center' }}
                    onPress={onPress}
                  >
                    <Text style={{ color: 'red', fontWeight: 'bold', padding: 2, fontSize: 15 }}>
                      <Icon name="delete" style={{ color: 'red', fontSize: 20 }} />Delete </Text>

                  </TouchableOpacity > */}

            </Card.Content>
          </Card>
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
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightblue',
  },
  inputbox: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 0,
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

},
);

export default ProfileScreen;
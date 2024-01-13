import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Avatar, TextInput, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {Base_Url} from '@env';

const VendAdminScreen = ({ navigation }) => {

    const [vendid, setVendId] = React.useState(null);
    const [vendname, setVendName] = React.useState(null);
    const [vendmobile, setVendMobile] = React.useState(null);
    const [vendemailid, setVendEmailID] = React.useState(null);
    const [vendcity, setVendCity] = React.useState(null);
    const [vendlogopath, setVendLogoPath] = React.useState(null);
    const [vendstatus, setVendStatus]  = React.useState(null);
    const [Pic, setPic] = React.useState(null);
    const [itemname, setItemName] = React.useState(null);
    const [itemprc, setItemPrc] = React.useState(null);
    const [ftype, setFType] = React.useState(null);
    const [fname, setFName] = React.useState(null);

    // console.log('in category image: ',  Pic, itemprc, itemname)
    // const ItemImgSave = () => {
    // axios.post(Base_Url + '/category/itemimgsave', {
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     CatID: catid, SubCatID: subcatid, CatSrcPath: Pic, Price: catprc, ItemName: itemname
    // })
    //     .then(function (response) {
    //         Alert.alert("Record Inserted successfully \n userID: " + catid);
    //         return response.json();
    //     })
    //     .catch(function (error) {
    //         console.log('There has been a problem with your insert operation: ' + error.message);
    //         throw error;

    //     });
    //   }
    const setToastMsg = msg => {
      ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
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
                setVendLogoPath(response.assets[0].uri)
                setFType(response.assets[0].type)
                setFName(response.assets[0].fileName)
                console.log('the response is: ', response.assets[0].uri, response.assets[0].type, response.assets[0].fileName);

            }
        });
    };

    // });
    const VendorSave = (item) => {
  
      axios.post(Base_Url + '/vendors/addvendor', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        VendID: vendid, VendName: vendname, VendMobile: vendmobile, VendEmailID: vendemailid, VendCity: vendcity, VendLogoPath: vendlogopath, VendStatus: vendstatus
           
      })
        .then(response => response.json())
        .then(data => {
          Alert.alert("Record Inserted successfully");
          // return response.data();
        })
        .catch(error => {
          if (error.code == 'ER_DUP_ENTRY' || error.errno == 1062) {
            Alert.alert('You have already added it.')
          }
          else {
            console.log('There has been a problem with your insert operation: ' + error.message);
            throw error;
          }
  
          // throw error;
  
        });
      }
    
    const [count, setCount] = useState(null);
    const onPress = () => setCount(prevCount => prevCount + 1);
  // }
    return (
        <PaperProvider>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                    <Card>
                            <Card.Content >
                             
                            {/* <View style={[styles.container]}> */}
                                <Avatar.Image
                                size={40}
                                source={{ uri: Pic }}
                                >
                                </Avatar.Image>
                                <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleUploadPhoto}>
                                    <Text> <Icon name="upload-file" style={{ color: '#0000FF', fontWeight: 'bold', fontSize: 30 }} />Upload Logo</Text>
                                </TouchableOpacity>
                            {/* </View> */}
                           </Card.Content>
                           </Card>
                      <Card style={{ flex: 1,  width: 350,  backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{ flex: 1, alignItems: 'center'}}> Vendor Detail</Text>
                      <Card.Content style={{ flex: 1,  width: 350}}>
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorID'
                            mode='outlined'
                            onChangeText={(VendID) => setVendId(VendID)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorName'
                            mode='outlined'
                            onChangeText={(VendName) => setVendName(VendName)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorMobile'
                            mode='outlined'
                            onChangeText={(VendMobile) => setVendMobile(VendMobile)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorEmailID'
                            mode='outlined'
                            onChangeText={(VendEmailID) => setVendEmailID(VendEmailID)}
                            />
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorCity'
                            mode='outlined'
                            onChangeText={(VendCity) => setVendCity(VendCity)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='VendorStatus'
                            mode='outlined'
                            onChangeText={(vendstatus) => setVendStatus(vendstatus)}
                            />
                            </Card.Content>
                      </Card>
                      
                      <TouchableOpacity onPress={VendorSave}>
                      <Text style={{ color: '#0000FF', fontWeight: 'bold', padding: 100, fontSize: 25 }}>
                            <Icon name="save" style={{ color: '#0000FF', fontSize: 25 }} /> Save </Text>
                            </TouchableOpacity>
                        {/* <Card>
                            <Card.Content >
                            <View >
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
                           

                            <View>
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='CategoryID'
                            mode='outlined'
                            onChangeText={(CatID) => setCatID(CatID)}
                            />
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='SubCatID'
                            mode='outlined'
                                                // secureTextEntry={true}
                                                // value='Password'
                            onChangeText={(subCatID) => setSubCatID(subCatID)}
                            />
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='Price'
                            mode='outlined'
                                                // secureTextEntry={true}
                                                // value='Password'
                            onChangeText={(catprc) => setCatPrc(catprc)}
                            />
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='Item Name'
                            mode='outlined'
                                                // secureTextEntry={true}
                                                // value='Password'
                            onChangeText={(itemname) => setItemName(itemname)}
                            />
                        </View>
                        </View>   
                        <View style={{flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center' }}>
                            <Card>
                                <Card.Content>
                            <TouchableOpacity
                                                // style={{ flex:1,  flexDirection: 'row', justifyContent: 'space-between' }}
                                                // onPress={ProfileAddrSave}
                            onPress={CategoryImgSave}
                            >
                            <Text style={{ color: '#0000FF', fontWeight: 'bold', padding: 2, fontSize: 25 }}>
                            <Icon name="save" style={{ color: '#0000FF', fontSize: 25 }} /> Save </Text>
                            </TouchableOpacity >
                            </Card.Content>
                            </Card>
                            </View>  
                            </Card.Content>
                        </Card> */}
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

export default VendAdminScreen;
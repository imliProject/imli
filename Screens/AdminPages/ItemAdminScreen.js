import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Avatar, TextInput, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {Base_Url} from '@env';

const ItemAdminScreen = ({ navigation }) => {

    const [vendid, setVendId] = React.useState(null);
    const [itemid, setItemID] = React.useState(null);
    const [itemname, setItemName] = React.useState(null);
    const [itemcolor, setItemColor] = React.useState(null);
    const [noofitems, setNoOfItems] = React.useState(null);
    const [itemstatus, setItemStatus]  = React.useState(null);
    const [itempic, setItemPic] =  React.useState(null);
    const [Pic, setPic] = React.useState(null);
    const [categoryid, setCategoryID] = React.useState(null);
    const [unitprice, setUnitPrice] = React.useState(null);
    const [ftype, setFType] = React.useState(null);
    const [fname, setFName] = React.useState(null);

    const TypeList = ["Daughter Marriage",
        "Dewali Celebrations",
        "Marrige Anniverssary",
        "Promotion Party",
        "House Warming Party",
        "Birthday Celebration",
        "Others"
    ]

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
                setItemPic(response.assets[0].uri)
                setFType(response.assets[0].type)
                setFName(response.assets[0].fileName)
                console.log('the response is: ', response.assets[0].uri, response.assets[0].type, response.assets[0].fileName);

            }
        });
    };

    // });
    const ItemSave = (item) => {
  
      axios.post(Base_Url + '/admin/additem', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        ItemID: itemid, ItemName: itemname, ItemPic: itempic, UnitPrice: unitprice, NoOfItems: noofitems, ItemColor: itemcolor, CategoryID: categoryid, VendID: vendid, ItemStatus: itemstatus
           
      }) 
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
                                    <Text> <Icon name="upload-file" style={{ color: '#0000FF', fontWeight: 'bold', fontSize: 30 }} />Upload Item Image</Text>
                                </TouchableOpacity>
                            {/* </View> */}
                            <View>
                            <SelectDropdown
                                        defaultButtonText='Select Vendor'
                                        data={TypeList}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                            setVendId(selectedItem);
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // AddTheSelect(selectedItem);
                                            // setOccasionDesc(selectedItem);
                                            // // setOccID(1);
                                            // setStatus('A');
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                    />
                                    </View>
                           </Card.Content>
                           </Card>
                      <Card style={{ flex: 1,  width: 350,  backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{ flex: 1, alignItems: 'center'}}> Item Detail</Text>
                      <Card.Content style={{ flex: 1,  width: 350}}>
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='ItemID'
                            mode='outlined'
                            onChangeText={(ItemID) => setItemID(ItemID)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='ItemName'
                            mode='outlined'
                            onChangeText={(ItemName) => setItemName(ItemName)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='UnitPrice'
                            mode='outlined'
                            onChangeText={(UnitPrice) => setUnitPrice(UnitPrice)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='NoOfItems'
                            mode='outlined'
                            onChangeText={(NoOfItems) => setNoOfItems(NoOfItems)}
                            />
                            <TextInput
                            style={{ marginTop: 5 }}
                            label='ItemColor'
                            mode='outlined'
                            onChangeText={(ItemColor) => setItemColor(ItemColor)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='CategoryID'
                            mode='outlined'
                            onChangeText={(CategoryID) => setCategoryID(CategoryID)}
                            />
                      <TextInput
                            style={{ marginTop: 5 }}
                            label='ItemStatus'
                            mode='outlined'
                            onChangeText={(ItemStatus) => setItemStatus(ItemStatus)}
                            />
                            </Card.Content>
                      </Card>
                      
                      <TouchableOpacity onPress={ItemSave}>
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

export default ItemAdminScreen;
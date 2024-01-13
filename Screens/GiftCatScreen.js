import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, ImageBackground, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Avatar } from '@mui/material';
import {Base_Url} from '@env';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const GiftCatScreen = ({ navigation }) => {

  // const [allist, setAllList] = useState([
  //   { "CatID": "EL000001", "CatName": "Electronics", "Status": "A", "CatIcon": require('../Assets/images/electronics.png'), },
  //   { "CatID": "FL000001", "CatName": "Flowers", "Status": "A", "CatIcon": require('../Assets/images/flora.png'), },
  //   { "CatID": "HD000001", "CatName": "HomeDecor", "Status": "A", "CatIcon": require('../Assets/images/homeDecor.png'), },
  //   { "CatID": "SP000001", "CatName": "Sports", "Status": "A", "CatIcon": require('../Assets/images/sports.png'), },
  //   { "CatID": "TO000001", "CatName": "Toys", "Status": "A", "CatIcon": require('../Assets/images/toys.png'), },
  // ]);

  const { UserName, UserID, UserMobile } = useContext(AuthContext);
  const [CategoryList, setCategoryList] = useState([]);
  const [catpicpathlist, setcatpicpathlist] = useState([]);

  const [showBox, setShowBox] = useState(true);
  const [electronicsList, setElectronicsList] = useState(null);
  const [flowersList, setFlowersList] = useState(null);

  useEffect(() => {
    // const catid = useRef('');
    // // const catname = useRef('');

    axios.get( Base_Url + '/category/getelectronicsitems')
      .then(res => {
        // console.log('from fetch getallcat:', res.data);
        // setAllCatID(res.data.CatID);
        // catid.current = res.data.CatID;
        // setAllCatName(res.data.CatName);
        // catname.current = res.data.CatName;
        setElectronicsList(res.data);
        // setCategoryList(res.data);
        // getSubCat(res.data.CatID);
        return;
      }).catch(error => {
        console.error(error);
      })

      axios.get( Base_Url + '/category/getfloweritems')
      .then(res => {
        // console.log('from fetch getall flowers:', res.data);
        // setAllCatID(res.data.CatID);
        // catid.current = res.data.CatID;
        // setAllCatName(res.data.CatName);
        // catname.current = res.data.CatName;
        setFlowersList(res.data);
        // setCategoryList(res.data);
        // getSubCat(res.data.CatID);
        return;
      }).catch(error => {
        console.error(error);
      })
    // getUserCat;
    // setTimeout(getUserSubCat , 1000);
    axios.get(Base_Url + '/users/getcategories/' + UserID)
      .then(res => {
        // console.log('from fetch get Cat list:', res.data);
        // setUserCat(res.data);
        // setCatID(res.data.CatID);
        // setCatName(res.data.CatName);
        // setStatus(res.data.Status);
        setCategoryList(res.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  
  const UserWishListSave = (item) => {
    console.log("The userID :", UserID);

    if (UserID) {

    axios.post(Base_Url + '/users/adduserwishlist', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      UserID: UserID, CategoryID: item.CategoryID, ItemID: item.ItemID
         
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
    }else
      {
        Alert.alert('Try again  after a login');
      }
  } 

  // const UserCatSave = (item) => {
  //   console.log("TEST", item);
  //   axios.post(Base_Url + '/users/giftcatsave', {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     userID: userID, SubcatID: item.SubcatID, CatID: item.CatID, CatName: catName, SubName: item.SubName, Status: 'A'
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       Alert.alert("Record Inserted successfully");
  //       // return response.data();
  //     })
  //     .catch(error => {
  //       if (error.code == 'ER_DUP_ENTRY' || error.errno == 1062) {
  //         Alert.alert('You have already added it.')
  //       }
  //       else {
  //         console.log('There has been a problem with your insert operation: ' + error.message);
  //         throw error;
  //       }

  //       // throw error;

  //     });

  // }

  // });
  const [count, setCount] = useState(null);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
 
  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };
  
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView> 

        <View style={[styles.container]}>
                        <TouchableOpacity style={styles.container} 
                            onPress={() => navigation.navigate('UserWishListScreen')}
                        >
                            <Text style={[styles.appInnerText]}>MyWishList</Text>
                        </TouchableOpacity>
                    </View>
          <View >        
          <Text style={[styles.appInnerText]}>Browse and Add to your Wishlist</Text>  
          </View>
          
        <View style={{ flex: 1 }} >
           <Text style={styles.appButtonText}> Electronics </Text>
           {/* <View> */}
            <View>
          <Card >
            {/* <Card.Content> */}
             <FlatList
           horizontal
            data={electronicsList}
            renderItem={({ item }) => (
              
              <View style={{backgroundColor: '#00000000'}}>
                {/* <Card > */}
                    {/* <Text >{item.ItemPic}  </Text> */}
                    <Image
                    style={{
                    width: 200,
                    height: 190,
                    borderWidth:1,
                    borderColor:'gold',
                    paddingEnd:15,
                    backgroundColor: '#00000000'
                    }}
                    source={{ uri: item.ItemPic }}

                    />
                    {/* <Icon name="bell" color="red" Size: 20/> */}
                    <TouchableOpacity style={{ position: 'absolute'}}

                              onPress={() => UserWishListSave(item)}
                            >
                    <Icon name="add" style={{ position: 'absolute', color: 'green', fontSize: 20 }} />
                    </TouchableOpacity>
                    {/* <Text style={{position: 'absolute', fontSize: 20}}>890</Text> */}
                <Text style={[styles.appInnerText]}>{item.ItemName}  </Text> 
                {/* </Card> */}
              </View>
            )}
            FlatListItemSeparator
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </Card.Content> */}
</Card>
{/* </View> */}
</View>
<Text style={styles.appButtonText}> Flowers </Text>
           {/* <View> */}
            <View>
          <Card>
            {/* <Card.Content> */}
             <FlatList
           horizontal
            data={flowersList}
            renderItem={({ item }) => (
              
              <View >
                {/* <Card > */}
                    {/* <Text >{item.ItemPic}  </Text> */}
                    <Image
                    style={{
                    width: 200,
                    height: 190,
                    borderWidth:1,
                    borderColor:'gold',
                    }}
                    // resizeMode="contain"
                            // source={require('../Assets/imli_banner.png')}
                    source={{ uri: item.ItemPic }}
                    />
                    <TouchableOpacity style={{ position: 'absolute'}}
                     onPress={() => UserWishListSave(item)}>
                    <Icon name="add" style={{ position: 'absolute', color: 'green', fontSize: 20 }} />
                    </TouchableOpacity>
                <Text style={[styles.appInnerText]}>{item.ItemName}  </Text> 
                {/* </Card> */}
              </View>
            )}
            FlatListItemSeparator
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </Card.Content> */}
          
</Card>
{/* </View> */}
</View>
<Text style={styles.appButtonText}> Home Decor </Text>
           {/* <View> */}
            <View>
          <Card>
            {/* <Card.Content> */}
             <FlatList
           horizontal
            data={flowersList}
            renderItem={({ item }) => (
              
              <View >
                {/* <Card > */}
                    {/* <Text >{item.ItemPic}  </Text> */}
                    <Image
                    style={{
                    width: 200,
                    height: 190,
                    borderWidth:1,
                    borderColor:'gold',
                    }}
                    // resizeMode="contain"
                            // source={require('../Assets/imli_banner.png')}
                    source={{ uri: item.ItemPic }}
                    />
                    <TouchableOpacity style={{ position: 'absolute'}}
                     onPress={() => UserWishListSave(item)}>
                     <Icon name="add" style={{ position: 'absolute', color: 'green', fontSize: 20 }} />
                    </TouchableOpacity>
                <Text style={[styles.appInnerText]}>{item.ItemName}  </Text> 
                {/* </Card> */}
              </View>
            )}
            FlatListItemSeparator
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </Card.Content> */}
          
</Card>
{/* </View> */}
</View>
<Text style={styles.appButtonText}> Flowers </Text>
           {/* <View> */}
            <View>
          <Card>
            {/* <Card.Content> */}
             <FlatList
           horizontal
            data={flowersList}
            renderItem={({ item }) => (
              
              <View >
                {/* <Card > */}
                    {/* <Text >{item.ItemPic}  </Text> */}
                    <Image
                    style={{
                    width: 200,
                    height: 190,
                    borderWidth:1,
                    borderColor:'gold',
                    }}
                    // resizeMode="contain"
                            // source={require('../Assets/imli_banner.png')}
                    source={{ uri: item.ItemPic }}
                    />
                    <TouchableOpacity style={{ position: 'absolute'}}
                    onPress={() => UserWishListSave(item)}>
                    <Icon name="add" style={{ position: 'absolute', color: 'green', fontSize: 20 }} />
                   </TouchableOpacity>
                <Text style={[styles.appInnerText]}>{item.ItemName}  </Text> 
                {/* </Card> */}
              </View>
            )}
            FlatListItemSeparator
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </Card.Content> */}
          
</Card>
{/* </View> */}
</View>
      </View> 
      </ScrollView>   
      </SafeAreaView >
    </PaperProvider >
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'white',
    marginBottom: 0,
    marginTop: 0,
  },

  item: {
    padding: 0,
    fontSize: 15,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: 50,
    length: 30,
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

  itemContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
   
},
itemContainerSelected: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
},
appButtonContainer: {
  elevation: 8,
  backgroundColor: "#009688",
  borderRadius: 15,
  paddingVertical: 0,
  paddingHorizontal: 5
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
export default GiftCatScreen;


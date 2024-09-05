import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, Title, TextInput, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import { AuthContext } from '../Context/AuthContext';
import {Base_Url} from '@env';
import axios from 'axios';
// 
const HomeScreen = ({ navigation }) => {

    const { UserName, UserID, UserMobile } = useContext(AuthContext);
    const [imlifrnds, setImliFrnds] = useState(0);
    const [WishCnt, setWishCnt] = useState(0);
    const [IFrndsCnt, setIFrndsCnt] = useState(0);
    const [OccCnt, setOccCnt] = useState(0);
    
    const [OccList, setOccList] = useState([]);
    const [catpicpathlist, setCatPicPathList] = useState([]);

    // const imlifrnds = useRef(0);
    // const WishCnt = useRef(0);
    // const IfrndsCnt = useRef(0);
    // const OccCnt = useRef(0)
     
    console.log('In home Screen :', UserName , UserID, UserMobile );
    const [count, setCount] = useState(null);
    const onPress = () => setCount(prevCount => prevCount + 1);

    useEffect(() => {

    const getWishListCnt = () => {
      axios.get(Base_Url + '/users/getuseritemscnt/' + UserID)
      .then(res => {
        console.log('from fetch getWishListCnt:', res.data);
        // setWishCnt (res.data);
        setWishCnt(res.data);
      })
      .catch(error => {
        console.error(error);
      });
    }

    const getIFrnds = () => {
      axios.get(Base_Url + '/friends/getifriendsbyid/' + UserID)
      .then(res => {
        console.log('from fetch get Friends list:', res.data);
        setImliFrnds(res.data);
        
      })
      .catch(error => {
        console.error(error);
      });      
    }

    const getIFrndsCnt = () => {
      axios.get(Base_Url + '/friends/getifriendscntbyid/' + UserID)
      .then(res => {
        console.log('from fetch get getIFrndsCnt:', res.data);
        setIFrndsCnt(res.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    
    const getOccCnt = () => {
      axios.get(Base_Url + '/occasion/getusrocccnt/' + UserID)
      .then(res => {
        console.log('from fetch user OccCnt:', res.data);
        setOccCnt(res.data);
      })
      .catch(error => {
        console.error(error);
    });

    }
    // useEffect(() => {
      setTimeout(() => {
        getWishListCnt();
      }, 3000);
      setTimeout(() => {
        getIFrnds();
      }, 3000);
      setTimeout(() => {
        getIFrndsCnt();
      }, 3000);
      setTimeout(() => {
        getOccCnt();
      }, 3000);
      
      
      // axios.get(Base_Url + '/users/getuseritemscnt/' + UserID)
      // .then(res => {
      //   console.log('from fetch getuseritemscnt:', res.data);
      //   // setWishCnt (res.data);
      //   WishCnt.current = res.data;
      // })
      // .catch(error => {
      //   console.error(error);
      // });

      // axios.get(Base_Url + '/friends/getifriendsbyid/' + UserID)
      // .then(res => {
      //   console.log('from fetch get Friends list:', res.data);
      //   setImliFrnds(res.data);
        
      // })
      // .catch(error => {
      //   console.error(error);
      // });
      
      // axios.get(Base_Url + '/friends/getifriendscntbyid/' + UserID)
      // .then(res => {
      //   console.log('from fetch get getifriendscntbyid:', res.data);
      //   IfrndsCnt.current = res.data;
      // })
      // .catch(error => {
      //   console.error(error);
      // });

      // axios.get(Base_Url + '/occasion/getusroccdtlbydate/' + UserID)
      // .then(res => {
      //     console.log('from fetch user Occ list:', res.data);
      //     setOccList(res.data);
      // })
      // .catch(error => {
      //     console.error(error);
      // });
      
    //   axios.get(Base_Url + '/occasion/getUserOccCount/' + UserID)
    //   .then(res => {
    //     console.log('from fetch user Occ list:', res.data);
    //     OccCnt.current = res.data;
    //   })
    //   .catch(error => {
    //     console.error(error);
    // });

    }, []);

    const ListEmptyView = () => {
        return (
          <Text> No Friends list</Text>
    
        );
      }
      // const ListEmptyView1 = () => {
      //   return (
      //     <Text> No Occasion list</Text>
    
      //   );
      // };
      // const ListEmptyView2 = () => {
      //   return (
      //     <View >
      //       <Text > Nothing in your Wishlist</Text>
      //       {/* <Text style={{ textAlign: 'center', fontSize: 10 }}> Click on the Category to list the Sub Categories</Text> */}
      //     </View>
    
      //   );
      // }
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
          <View style={{flex: 1}}>
          <Card  >
          <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold' }}> Welcome {UserName} </Text>
           </Card>
           </View>
          
            {/* <View> */}
            <View style={{flex: 1}} >
            <Card  >
                    {/* <Card.Content  > */}
             
                        <TouchableOpacity    
                             onPress={(() => { navigation.navigate('SendGiftScreen') })}
                           >
                            <ImageBackground  source={require('../Assets/images/gift_friends.jpg')} resizeMode="cover" style={styles.image}> 
                            <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold', paddingLeft: 25}}> Gift Friends</Text>
                            
                            <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', paddingLeft: 27 }}> Your friends count: {IFrndsCnt} </Text>
                            
                            </ImageBackground>
                          </TouchableOpacity>
                    {/* </Card.Content> */}
            </Card> 
            </View> 
      <View style={{ flex: 1, flexDirection: 'row', width: 350,  justifyContent: 'space-between' }}>
      <Card  >
          <Card.Content style={{ flex: 1, flexDirection: 'row', width: 350,  justifyContent: 'space-between' }}>
           <Card>              
          <TouchableOpacity    
          onPress={(() => { navigation.navigate('GiftCatScreen') })}
          >
          <ImageBackground  source={require('../Assets/images/Category.png')}  style={styles.subimage}> 
          <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', paddingLeft: 5 }}> Categories</Text>
          <Text> Add/Del WishList </Text>
          </ImageBackground>
          </TouchableOpacity>
          <Text> WishList Total: {WishCnt} </Text>
          </Card>
          <Card>
                {/* <Card.Content  >           */}
                  <TouchableOpacity    
                  onPress={(() => { navigation.navigate('UserOccScreen') })}
                  >
                  <ImageBackground  source={require('../Assets/images/Occassion.png')}  style={styles.subimage}> 
                  <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', paddingLeft: 5 }}> Occassions</Text>
                  <Text> Add/Del OccasionList: </Text>
                  </ImageBackground>
                  </TouchableOpacity>
                  {/* </Card.Content> */}
                  <Text> Occasion Total: {OccCnt}</Text>
                  </Card>
          </Card.Content>
          </Card>
          </View>
          <View style={{flex:1}} >
            <Card  >
                    <Card.Content style={[styles.container]} >
             
                        <TouchableOpacity    
                             onPress={(() => { navigation.navigate('FriendsScreen') })}
                           >
                            <ImageBackground  source={require('../Assets/images/Friends.png')}  style={styles.subimage}> 
                            <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', paddingLeft: 5 }}> Add Friends</Text>
                            </ImageBackground>
                            <Text> Add/Del FriendsList </Text>
                          </TouchableOpacity>
                   <View>  
                   <View >
                            <Text style={styles.innerText}> Friends List  </Text>   
                    </View>  
                      
                <FlatList
                  data={imlifrnds}
                 
                  //data defined in constructor
                  ItemSeparatorComponent={FlatListItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    
                         <Card >       
                            <Card.Content style={{ paddingLeft: 10, flexDirection: 'row', color: 'green', alignContent: 'center', fontSize: 10, width: 170, height: 55}} >  
                          {/* <TouchableOpacity 
                            onPress={(onPress)}
                          > */}
                            {item.UserID === UserID ? (
                               <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'green' }} >  {item.UserFrndsMobile} {item.UserFrndsID} </Text>
                            ):(
                              <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'green' }} >  {item.UserMobile} {item.UserID} </Text>   
                            )
                              } 
                          {/* </TouchableOpacity> */}
                          </Card.Content>
                      </Card>
                  )}
                  ListEmptyComponent={ListEmptyView}
                  keyExtractor={(item, index) => index.toString()}
                />
                          </View>
                        {/* </View> */}
                        
                        </Card.Content>
                        </Card>
                        </View>
          </ScrollView>
          </SafeAreaView>
        </PaperProvider> 
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#00000000',
        width: 300,
        height: 150,  
      },
    h1: {
        color: '#008F68',
        fontSize: 40,
        marginTop: 0,
    },
    h2: {
        color: '#008F68',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 0,
    },
    h3: {
        justifyContent: 'center',
        paddingTop: 8,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    button: {
        width: 200,
        marginTop: 20,
        backgroundColor: "green",
        padding: 15,
        borderRadius: 50,
    },
    image: {
         width: 350,
         height: 250,
         padding: 70
      },
      subimage: {
        width: 150,
        height: 150, 
     },
    innerText: {
        color: 'lightgreen',
        fontWeight: 'bold',
        fontSize: 15,
    },
    paragraph: {
        fontSize: 24,
        textAlign: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    middleContainer: {
        flex: 3,
        backgroundColor: '#ecf0f1',

    },
    bottomContainer: {
        justifyContent: 'flex-end',
        width: '90%',
        alignItems: 'center',
    },
    buttonContainer: {
        borderRadius: 1,
        padding: 8,
        margin: 8,
    },
    appInnerText: {
      fontSize: 13,
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "none"
    },
});
export default HomeScreen;
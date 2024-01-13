import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Title, Paragraph, TextInput, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Base_Url } from '@env';
import HomeScreen from './HomeScreen';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const SendGiftScreen = ({ navigation }) => {

    const [showDropDown, setShowDropDown] = useState(false);
    const { UserName, UserID, UserMobile } = useContext(AuthContext);
    const [ TouserID, setToUserID ] = useState(false);
    const [SelectFlag, setSelectFlag ] = useState(false); 
    // const SelectFlag = useRef('false');
    const [CategoryList, setCategoryList] = useState([]);
    // const [SubCategoryList, setSubCategoryList] = useState([]);
    const [occlist, setOccList] = useState([]);
    const [catpicpathlist, setCatPicPathList] = useState([]);
    const [occname, setOccName] = useState('');
    const [ToMob, setToMob] = useState('');
    const [mobilenum, setMobileNum] = useState(null);
    const [allmoblist, setAllMobList] = useState([]);
    const [allitems, setAllItems] = useState([]);
    const [agree, setAgree] = useState(false);
    const uToMob = useRef('');

    const { width } = Dimensions.get('window');
    const previewCount = 3;
    const itemWidth = width / (previewCount + .5);
    const startScroll = (itemWidth * 3 / 4);

    useEffect(() => {

        // Get all IMLI mobiles
        console.log('The UserID is: ', UserID);
        if (UserID) {
            axios.get(Base_Url + '/friends/getifriendsbyid/' + UserID)
                .then(res => {
                    console.log('from fetch getallimlimob:', res.data);
                    setAllMobList(res.data);
                    // return;
                }).catch(error => {
                    console.error(error);
                });
        } else {
            Alert.alert("You do not have any IMLI frinds, add a friend and try again.")
            navigation.navigate(HomeScreen);
        }

        axios.get( Base_Url + '/category/getallitems')
        .then(res => {
            console.log('from fetch getallitems:', res.data);
            setAllItems(res.data);
            // return;
        }).catch(error => {
            console.error(error);
        });


    }, []);

    const [count, setCount] = useState(null);
    const onPress = () => setCount(prevCount => prevCount + 1);

    const SendForPayment = (item, occname) => {
        if (occname === '' || occname === null) {
            Alert.alert('Please select any occassion from the list of occassions')
            return
        } else {
            navigation.navigate('PaymentScreen', { ItemPic: item.ItemPic, UnitPrice: item.UnitPrice, ToMob: ToMob, ItemName: item.ItemName, ItemID: item.ItemID, OccName: occname });
        }

    }
    // const ShowCatPics = (CatID, SubCatID) => {

    //     axios.get(Base_Url + '/users/getalldtlcat/' + CatID + "/" + SubCatID)
    //         .then(res => {
    //             console.log('from fetch get getalldtlcat list:', res.data);
    //             setCatPicPathList(res.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    isChecked = (itemId) => {
        const isThere = this.state.ids.includes(itemId);
        return isThere;
    };

    toggleChecked = (itemId) => {
        const ids = [...this.state.ids, itemId];

        if (this.isChecked(itemId)) {
            this.setState({
                ...this.state,
                ids: this.state.ids.filter((id) => id !== itemId),
            });
        } else {
            this.setState({
                ...this.state,
                ids,
            });
        }
    };
    const UserCatOccList = (ToMob) => {
        console.log('In UserCatOccList:  ', ToMob);
        setSelectFlag(true);
        setToMob(ToMob);
        GetUsrbyMob(ToMob);
        // UserCatList(ToMob);
        // UserOccList(ToMob);
    }
    const GetUsrbyMob = (ToMob) => {
        console.log('from fetch GetUsrbyMob :', ToMob);
        axios.get(Base_Url + '/users/getusrbymob/' + ToMob)
            .then(res => {
                console.log('from fetch User ID :', res.data[0].UserID);
                setToUserID(res.data[0].UserID);

                UserCatList(res.data[0].UserID);
            })
            .catch(error => {
                console.error(error);
            });

    }
    const UserCatList = (UserID) => {
        //  get user Name from selected Mobile no
        console.log('from fetch UserCatList:', UserID);
        const itemdetail = [];
        axios.get(Base_Url + '/users/getuseritemsbyid/' + UserID)
        .then(res => {
  
            // setCatPicPathList(res.data);
            //  i = i + 1;
            for ( i = 0; i < res.data.length; i++) {
            console.log('from fetch get UserCatList list:', res.data[i].itemdtl);
         
            // setCatPicPathList(res.data[i].itemdtl.ItemPic);
            // i = i + 1;
            itemdetail[i] =  res.data[i].itemdtl;
            console.log('the length is :', itemdetail.length);
            // setCatPicPathList((itemdetail) => [
            //     ...itemdetail,
            // ]);

            }
            setCatPicPathList(itemdetail);
            UserOccList(UserID);
        })
        .catch(error => {
            console.error(error);
        });

        // setToMob('');
        // setSubCategoryList([]);
        // setCategoryList([]);
        // setCatPicPathList([]);
        // // setToMob(item.ToMob);
        // // Get Categories for the user
        // axios.get(Base_Url + '/users/getuseritemsbyid/' + ToUid)
        //     .then(res => {
        //         console.log('from fetch get Cat list:', res.data);
        //         setCategoryList(res.data);
        //     })
        //     .then(res => {
        //         UserOccList(ToUid);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

    }

    const UserOccList = (UserID) => {
        //  get user Name from selected Mobile no
        // setToMob(item.ToMob);
        // Get Categories for the user IMLI friend
      
        axios.get(Base_Url + '/occasion/getusroccdtlbydate/' + UserID)
            .then(res => {
                console.log('from fetch get Occ list:', res.data);
                setOccList(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    const ListEmptyView = () => {
        return (
            <View >
                <Text style={{ textAlign: 'center', fontSize: 15 }}> No Item List Available</Text>
            </View>
        );
    }
   
    const FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };
    const snapToOffsets = CategoryList.map((x, i) => {
        return ((i * (itemWidth) * previewCount) + startScroll)
    });

    return (
        <PaperProvider>
            <SafeAreaView  >
                <ScrollView>

                    <View style={{ flex: 1 }}  >
                        {/* <View>
                            <Text style={{ fontWeight: 'bold' }}> Total: {allmoblist.length} </Text>
                        </View> */}
                        <Card style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Text style={{ fontWeight: 'bold' }}> Select Any </Text> */}
                            <Card.Content>
                                <FlatList
                                    horizontal
                                    // snapToOffsets={snapToOffsets}
                                    snapToAlignment={"center"}
                                    data={allmoblist}
                                    renderItem={({ item }) => (

                                        <View>
                                            <Card style={[styles.appButtonContainer]}>

                                    {item.UserFrndsMobile === UserMobile ? (
                                    <>
                                     
                                     {/* {uToMob.current =  item.UserMobile}    */}
                                     <TouchableOpacity
                                    style={item.UserMobile === item.UserMobile ? styles.itemContainerSelected : styles.itemContainer}
                                       
                                                    onPress={() => UserCatOccList(item.UserMobile)}
                                    //  onPress={() => UserCatOccList({item.UserFrndsMobile === UserMobile ? item.UserMobile : item.UserFrndsMobile })}
                                    >
                                        <Text style={styles.appItemText}>{item.UserMobile}  </Text>
                                                    {/* </View> */}
                                                </TouchableOpacity>        
                                    </>
                                    ) : (
                                        <>
                                        
                                        {/* {uToMob.current = item.UserFrndsMobile} */}
                                        <TouchableOpacity
                                    // style={item.UserFrndsMobile === item.UserFrndsMobile ? styles.itemContainer : styles.itemContainerSelected }
                                                    onPress={() => UserCatOccList(item.UserFrndsMobile)}
                                    //  onPress={() => UserCatOccList({item.UserFrndsMobile === UserMobile ? item.UserMobile : item.UserFrndsMobile })}
                                    >
                                        <Text style={styles.appItemText}>{item.UserFrndsMobile}  </Text>
                                                    {/* </View> */}
                                                </TouchableOpacity>
                                        </>
                                        )
                                    }
                                            </Card>
                                        </View>
                                    )}
                                    // ListEmptyComponent={ListEmptyView}
                                    FlatListItemSeparator
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                     
                    {SelectFlag === true ? (
                        <>
                  
                    <View> 

                    </View>
                    {occlist.length === 0 ? (
                        <>
                            <View>
                                <Text> Your IMLI friend does not have any occassion, His choices gift categories will be listed
                                    Once your friend has an occassion
                                </Text>
                            </View>
                        </>
                    ) : (
                         <>
                    <View>
                        <Card style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <Text style={{ fontWeight: 'bold' }}> Select Any </Text> */}
                            <Card.Content>
                                <FlatList
                                    horizontal
                                    // snapToOffsets={snapToOffsets}
                                    snapToAlignment={"center"}
                                    data={occlist}
                                    renderItem={({ item }) => (

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {/* <Card style={[styles.appButtonContainer, backgroundColor= '#DAA520']} > */}
                                            <Card >
                                                <TouchableOpacity
                                                    style={{ height: 70, backgroundColor: '#DAA520' }}
                                                    // style={item.ToMob === ToMob ? styles.itemContainerSelected : styles.itemContainer}
                                                    onPress={() => setOccName(item.OccasionDesc)}
                                                >
                                                    <Text style={styles.appItemText} > {item.OccasionDesc} </Text>
                                                    <Text style={styles.appItemText} >
                                                        {item.OccasionStartDate} <Text> To </Text>
                                                        {item.OccasionEndDate}
                                                    </Text>
                                                    {/* <View style={item.CatName === catName ? styles.itemContainerSelected: styles.itemContainer}> */}
                                                    {/* <Text style={styles.appItemText}>{item.SubName}  </Text> */}
                                                    {/* </View> */}
                                                </TouchableOpacity>
                                                {/* </Card.Content> */}
                                            </Card>
                                        </View>
                                    )}
                                    // ListEmptyComponent={ListEmptyView}
                                    FlatListItemSeparator
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                    </>
                    )
                    }
                    {catpicpathlist.length === 0 ? (
                     <>
                      <View>
                        <Text> No WishList for your Friend {ToMob}. Please check the availble Other gifts below </Text>
                      </View>
                      <View>
                        <Card style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}> Click any available list </Text>
                            <Card.Content>
                                <FlatList
                                    horizontal
                                    // snapToOffsets={snapToOffsets}
                                    snapToAlignment={"center"}
                                    data={allitems}
                                    renderItem={({ item }) => (

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {/* <Card style={[styles.appButtonContainer, backgroundColor= '#DAA520']} > */}
                                            <Card >
                                                <TouchableOpacity
                                                    style={{ height: 300, backgroundColor: '#DAA520' }}
                                                    // style={item.ToMob === ToMob ? styles.itemContainerSelected : styles.itemContainer}
                                                    onPress={() => SendForPayment(item, occname)}
                                                >
                                                    <Image
                                                        style={{
                                                        width: 350,
                                                        height: 250
                                                        }}
                                                    // blurRadius = {10}
                                                    source={{ uri: item.ItemPic }}                         
                                                    />
                                                    
                                                    <Text> Price: {item.UnitPrice}</Text>
                                                    {/* <Text> Color: {item.ItemColor}</Text> */}
                                                    {/* <Text> Vendor:  </Text> */}
                                                   
                                                </TouchableOpacity>
                                                {/* </Card.Content> */}
                                            </Card>
                                        </View>
                                    )}
                                    // ListEmptyComponent={ListEmptyView}
                                    FlatListItemSeparator
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                      </>
                    ): (
                        <>
                        <View>
                        <Card style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold' }}> Click any available IMLI list from {ToMob} </Text>
                            <Card.Content>
                                <FlatList
                                    horizontal
                                    // snapToOffsets={snapToOffsets}
                                    snapToAlignment={"center"}
                                    data={catpicpathlist}
                                    renderItem={({ item }) => (

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {/* <Card style={[styles.appButtonContainer, backgroundColor= '#DAA520']} > */}
                                            <Card >
                                                <TouchableOpacity
                                                    style={{ height: 300, backgroundColor: '#DAA520' }}
                                                    // style={item.ToMob === ToMob ? styles.itemContainerSelected : styles.itemContainer}
                                                    onPress={() => SendForPayment(item, occname)}
                                                >
                                                    <Image
                                                        style={{
                                                        width: 350,
                                                        height: 250
                                                        }}
                                                    // blurRadius = {10}
                                                    source={{ uri: item.ItemPic }}                         
                                                    />
                                                    
                                                    <Text> Price: {item.UnitPrice}</Text>
                                                    {/* <Text> Color: {item.ItemColor}</Text> */}
                                                    {/* <Text> Vendor:  </Text> */}
                                                   
                                                </TouchableOpacity>
                                                {/* </Card.Content> */}
                                            </Card>
                                        </View>
                                    )}
                                    // ListEmptyComponent={ListEmptyView}
                                    FlatListItemSeparator
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </Card.Content>
                        </Card>
                    </View>
                     </>
                    )
                 }
                       </>
                     ):
                      (
                       <>
                        <View> 
                            <Text> Please click any of the mobile number </Text>
                        </View>
                       </>
                      )
                  }
                </ScrollView>
            </SafeAreaView >
        </PaperProvider >
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 5,
    },

    item: {
        padding: 5,
        fontSize: 15,

    },
    input: {
        height: 20,
        margin: 5,
        borderWidth: 1,
        padding: 5,
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
    appButtonContainer: {
        elevation: 8,
        textAlign: "center",
        borderRadius: 20,
       borderwidth: 10,
       borderColor: 'gold',
    },
    appInnerText: {
        fontSize: 13,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "none"
    },
    itemContainerSelected: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    appButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appInnerText: {
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appItemText: {
        fontSize: 17,
        fontWeight: "bold",
        alignSelf: "center",
        borderRadius: 15,
        // justifyContent: 'center',
        textTransform: "none",
        padding: 5,
    },
    itemContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    //   input: {
    //     width: '80%',
    //     height: 44,
    //     padding: 10,
    //     marginBottom: 10,
    //     backgroundColor: 'lightblue',
    //   },

});
export default SendGiftScreen;


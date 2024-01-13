import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image, ImageBackground } from "react-native";
import { Card, Title, Paragraph, TextInput, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Base_Url } from '@env';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const UserWishListScreen = ({ navigation }) => {

    const { UserName, UserID, UserMobile } = useContext(AuthContext);
    const [catpicpathlist, setCatPicPathList] = useState([]);

    const { width } = Dimensions.get('window');
    const previewCount = 3;
    const itemWidth = width / (previewCount + .5);
    const startScroll = (itemWidth * 3 / 4);

    useEffect(() => {

        // Get all User WishList
        //  let i= 0;
        const itemdetail = [];
        axios.get(Base_Url + '/users/getuseritemsbyid/' + UserID)
        .then(res => {
  
            // setCatPicPathList(res.data);
            //  i = i + 1;
            for ( i = 0; i < res.data.length; i++) {
            console.log('from fetch get getalldtlcat list:', res.data[i].itemdtl);
         
            // setCatPicPathList(res.data[i].itemdtl.ItemPic);
            // i = i + 1;
            itemdetail[i] =  res.data[i].itemdtl;
            console.log('the length is :', itemdetail.length);
            // setCatPicPathList((itemdetail) => [
            //     ...itemdetail,
            // ]);

            }
            setCatPicPathList(itemdetail);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    const [count, setCount] = useState(null);
    const onPress = () => setCount(prevCount => prevCount + 1);

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
      };
    const ListEmptyView = () => {
        return (
          <View >
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}> Nothing in your Wishlist</Text>
            {/* <Text style={{ textAlign: 'center', fontSize: 10 }}> Click on the Category to list the Sub Categories</Text> */}
          </View>
    
        );
      }
    // console.log( 'The length is : ', catpicpathlist);
    return (
        <PaperProvider>
            <SafeAreaView>
                <ScrollView>  
                </ScrollView>

                    <View style={{backgroundColor: '#00000000'}}>
                            <FlatList
                            data={catpicpathlist}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={({ item}) => (
                              <View>
                                 <Card >
                                 <Card.Content >
                                <TouchableOpacity
                                onPress={() => onPress()}
                                >
                                {/* <Icon name="delete" style={{ color: 'red', fontSize: 20 }} /> */}
                                </TouchableOpacity>
                                    {/* <Card.Content > */}
                                    <ImageBackground
                                    style={{
                                    width: 200,
                                    height: 190,
                                    borderWidth:1,
                                    borderColor:'gold',
                                    paddingEnd:5,
                                    backgroundColor: '#00000000'}}
                                    source={{ uri: item.ItemPic }}
                                    >
                                        <Icon name="delete" style={{ color: 'red', fontSize: 20 }} />
                                        </ImageBackground>
                                    </Card.Content>
                                    <Text style={[styles.appInnerText]}>{item.ItemName}  </Text> 
                                </Card>
                                                                
                                {/* </Card.Content>  */}
                                {/* </Card> */}
                                </View>
                                )}
                                ListEmptyComponent={ListEmptyView}
                                keyExtractor={(item, index) => index.toString()}
                                />
                                </View>
                            {/* // </Card.Content> */}
                                {/* </Card> */}
                            {/* </View> */}
                {/* </ScrollView> */}
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
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
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
    appButtonContainer: {
        elevation: 8,

        borderRadius: 5,
        borderColor: 'green',
        borderwidth: 15,
        paddingVertical: 0,
        paddingHorizontal: 10
    },
    appButtonText: {
        fontSize: 15,
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
        fontSize: 13,
        fontWeight: "bold",
        alignSelf: "center",
        justifyContent: 'center',
        textTransform: "none",
        padding: 15,
    },
    itemContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    //   input: {
    //     width: '80%',
    //     height: 44,
    //     padding: 10,
    //     marginBottom: 10,
    //     backgroundColor: 'lightblue',
    //   },

});
export default UserWishListScreen;


import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Alert, Image } from "react-native";
import { Card, Avatar, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';
// import { RazorpayApiKey } from '../.env';
import { Key_Id, Key_Secret, Base_Url, RazorpayApiKey } from '@env';

// ext {
//     buildToolsVersion = "29.0.2"
//     minSdkVersion = 19
//     compileSdkVersion = 29
//     targetSdkVersion = 29
// }

// https://www.section.io/engineering-education/react-native-razorpay/


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const PaymentScreen = ({ navigation, route }) => {

    let raiserpaykeyid = Key_Id;
    let raiserpaykeysecret = Key_Secret;

    const amount = 100;
    const currency = 'INR';

    const { UserName, UserID, UserMobile, UserEmailId } = useContext(AuthContext);
    console.log('in payment:', ItemName, Price, UserEmailId, UserMobile, UserName )

    const [usrAddress, setUsrAddress] = useState([]);
    const [IUsrAddress, setIUsrAddress] = useState([]);
    const [agree, setAgree] = useState(false);
    const [ToUserName, setToUserName] = useState('');
    const [ToUserID, setToUserID] = useState('');
    const [CatSrcPath, setCatSrcPath] = useState(null);
    const [Price, setPrice] = useState(null);
    // const [orderid, setOrderID] = useState(null);
    const [ItemName, setItemName] = useState(null);
    const [ItemID, setItemID] = useState(null);
    const [occname, setOccName] = useState('');
    const [ToMob, setToMob] = useState(null);
    const [PaymentProcessing, setPaymentProcessing] = useState(null);

    const username = useRef('');
    const userid = useRef('');
    const orderId = useRef('');
     


    useEffect(() => {
        setCatSrcPath (route.params.ItemPic);
        setPrice (route.params.UnitPrice);
        setToMob (route.params.ToMob);
        setItemName (route.params.ItemName);
        setItemID(route.params.ItemID);
        setOccName(route.params.OccName);
        console.log( ' Tomob: ' + route.params.ToMob);

        // Get user Address
 

            axios.get(Base_Url + '/users/getusrbymob/' + route.params.ToMob)
            .then(res => {
                console.log('from fetch getImli User Name:', res.data);
                username.current = res.data[0].UserName;
                userid.current = res.data[0].UserID;
                console.log('from fetch username.current:', username.current);
                console.log('from fetch userid.current:', userid.current);
                setToUserName(res.data[0].UserName);
                setToUserID(res.data[0].UserID);
                axios.get(Base_Url + '/users/getuseraddress/' + userid.current)
                .then(res1 => {
                console.log('from fetch getImli friend Address:', res1.data);
                setIUsrAddress(res1.data);
                return;
                }).catch(error => {
                console.error(error);
                 })
                return;
            }).catch(error => {
                console.error(error);
            })

            axios.get(Base_Url + '/users/getuseraddress/' + UserID)
            .then(res => {
                console.log('from fetch getuser Address:', res.data);
                setUsrAddress(res.data);
                return;
            }).catch(error => {
                console.error(error);
            })
    }, []);

    const UpdtWishList = (UserID, ItemID) => { 
        console.log ('In Friends update :', UserID, ItemID);
        axios.put(Base_Url + '/users/updtusrwishlist/' + UserID + '/'  + ItemID, {
          Status: 'R'
        }).then(function (response) {
          Alert.alert("Record Updated successfully ,\n Status: " + UserID);
    
          return response;
        })
          .catch(function (error) {
            console.log('There has been a problem with your update operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
          });
    
      }
    
      const handlePayment = async () => {
            console.log('in handle payment:', ItemName, Price, UserEmailId, UserMobile, UserName );
            
            axios.post(Base_Url + '/payment/createorder', { 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  "amount": Price, "currency": "INR"
            })
            .then(function (response) {
                console.log("Record Inserted successfully", response.data.id);
                orderId.current = response.data.id;
                var options = {
                    description: 'Payment For',
                    image: 'https://i.imgur.com/3g7nmJC.jpg',
                    currency: 'INR',
                    key: raiserpaykeyid,
                    amount: Price * 100,
                    name: 'INR',
                    order_id: orderId.current, //Replace this with an order_id created using Orders API.
                    prefill: {
                      email: UserEmailId,
                      contact: UserMobile,
                      name: UserName
                    },
                    payment_capture: 1,
                    theme: {color: '#53a20e'}
                }
                RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(`Success: ${data.razorpay_payment_id}`);
            console.log(' the userid.current', ToUserID, ItemID );
            // Update status of wishlist to 'R' -- received so, next listing would blur it
            UpdtWishList(ToUserID, ItemID);
          }).catch((error) => {
            // handle failure
            console.log(`Error: ${error.code} | ${error.description}`);
          });
                return response.data;
            })
            .catch(function (error) {
                console.log('There has been a problem with your insert operation: ' + error.message);
                throw error;

            });
                // if (!result) {
                //     Alert.alert("Server error. Are you online?");
                //     return;
                // }
        
                // console.log("Order at client side:", result);
                // Getting the order details back
                // const { amount, order_id: id , currency } = result.data;
                console.log("Record Inserted before successfully", orderId, Price);  
            //    if ({data.razorpay_payment_id}) {
                //    UpdtWishList(ToUserID, ItemID);
            //    } else
            //    {
            //     console.log (' Could not update User WishList')
            //    }

//         var options = {
//             description: 'Payment For',
//             image: 'https://i.imgur.com/3g7nmJC.jpg',
//             currency: 'INR',
//             key: raiserpaykeyid,
//             amount: Price * 100,
//             name: 'INR',
//             order_id: orderId.current, //Replace this with an order_id created using Orders API.
//             prefill: {
//               email: userEmailId,
//               contact: userMobile,
//               name: userName
//             },
//             payment_capture: 1,
//             theme: {color: '#53a20e'}
//         }
//         RazorpayCheckout.open(options).then((data) => {
//     // handle success
//     console.log(`Success: ${data.razorpay_payment_id}`);
//   }).catch((error) => {
//     // handle failure
//     console.log(`Error: ${error.code} | ${error.description}`);
//   });
             
            
    //         // axios.get('http://192.168.0.107:3000/api/payment/verifypayment' + order.id + '/' + transaction)
    //         // .then(res => {
                
    //         //     Alert.alert('Is Valid Payment: ' + validSignature)
    //         // }).catch(error => {
    //         //     console.error(error);
    //         // })
    //     //  })
    //     //  .catch(console.log);
    //     //   Alert.alert(`Success: ${data.razorpay_payment_id}`);
    //     // })
        
    //     .catch((error) => {
    //       // handle failure
    //       Alert.alert(`Error: ${error.code} | ${error.description}`);
    //     });
      
      }
    //   const onPay = async () => {
    //     setPaymentProcessing(true);
    //     // Step 1: Create Order
    //     const order = await createOrder();
          
       
    //     setPaymentProcessing(false);
    //   };
return(

    <PaperProvider>
    <SafeAreaView>
    <ScrollView>
        <View>
        <Card>
            <Card.Content>
                
                
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Card>
            <Card.Content style={{ width: 150, height: 200 }}>
            <View>
                
                <Text> From </Text>
            <Text> {UserName}</Text>
            <Text>{usrAddress.UserHome}</Text>
            <Text>{usrAddress.UserStreet}</Text>
            <Text>{usrAddress.UserDistrict}</Text>
            <Text>{usrAddress.UserState}</Text>
            <Text>{usrAddress.UserPin}</Text>
            <Text>{usrAddress.UserCountry}</Text>
            </View>
            </Card.Content>
            </Card>
            <Card>
            <Card.Content style={{ width: 150, height: 150 }}>
            <View>
                
                <Text> To </Text>
                {agree === false ? (
                    <>
            <Text> {ToUserName}</Text>
            <Text>{IUsrAddress.UserHome}</Text>
            <Text>{IUsrAddress.UserStreet}</Text>
            <Text>{IUsrAddress.UserDistrict}</Text>
            <Text>{IUsrAddress.UserState}</Text>
            <Text>{IUsrAddress.UserPin}</Text>
            <Text>{IUsrAddress.UserCountry}</Text>
            </>
            ) :
            (
                <>
                <Text> {UserName}</Text>
            <Text>{usrAddress.UserHome}</Text>
            <Text>{usrAddress.UserStreet}</Text>
            <Text>{usrAddress.UserDistrict}</Text>
            <Text>{usrAddress.UserState}</Text>
            <Text>{usrAddress.UserPin}</Text>
            <Text>{usrAddress.UserCountry}</Text>
            </>
            )}
            </View>
            </Card.Content>
            </Card>
            </View>
            <View style={styles.wrapper}>
                    {Platform.OS === 'ios' ? (
                        <CheckBox
                        boxType="square"
                        value={agree}
                        onChange={() => setAgree(!agree)}
                        />
                        ) : (
                        <CheckBox value={agree} onChange={() => setAgree(!agree)} />
                        )}
                        <Text> Please Send the gift to Me</Text>
                        </View>
                        <View>
                        <Text> 
                            Message: Congratulation for your occassion {occname} </Text>
                            <Text> </Text>
                        </View>        
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>  
            <Card>
            <Card.Content style={{ width: 150, height: 150 }}>       
            <Image
                style={{
                width: 70 ,
                height: 70
                }}
                source={{ uri: CatSrcPath }}
                />
        </Card.Content>
        </Card>
        <Card>
            <Card.Content style={{ width: 150, height: 150 }}>       
           <Text>Price: {Price} </Text>
            <Text>GST:  </Text>
             <Text>Ship Charge: </Text>
        </Card.Content>
        </Card>
                </View>
        <Text> </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#FFBF00', fontWeight: 'bold', padding: 2, fontSize: 15 }} >
                    <Icon name="cancel" style={{ color: 'red', fontSize: 25 }} /> Cancel  </Text>
        </TouchableOpacity>
        
        <Text>  </Text>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}
          onPress={() => handlePayment()}
        >
          <Text style={{ color: '#FFBF00', fontWeight: 'bold', padding: 2, fontSize: 15 }} >
                    <Icon name="payment" style={{ color: 'green', fontSize: 25 }} /> PayNow {Price} </Text>
        </TouchableOpacity>
         </View>   
            </Card.Content>
        </Card>
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
        padding: 0,
        marginTop: 0,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 15,
    },
    FloatingActionButtonStyle: {
        position: 'absolute',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        borderTopEndRadius: 0,
        // backgroundColor: '#0B66D3',
        borderColor: '#000000',
        borderRadius: 100 / 2
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
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

});
export default PaymentScreen;
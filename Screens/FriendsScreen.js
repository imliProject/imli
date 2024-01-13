import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Title, Paragraph, TextInput, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import {Base_Url} from '@env';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const FriendsScreen = ({ navigation }) => {

  const { UserName, UserID, UserMobile } = useContext(AuthContext);
  const [FriendsRcv, setFriendsRcv] = useState([]);
  const [frndsMob, setFrndsMob] = useState(null);
  const [friendsrqs, setFriendsRqs] = useState(null);
  const [imlifrnds, setImliFrnds] = useState(null);

  const userMob = useRef('');
  const status = useRef('');
  const usrfrndmob = useRef('');
  const frndid = useRef('');
  const touid = useRef('');


  useEffect(() => {

    // console.log('User Mobile :', userMobile);
    // Get Sent Requests 
     
    axios.get(Base_Url + '/friends/getmobilesbyuid/' + UserID) 
      .then(res => {
        
        console.log('from fetch get Friends list:', res.data);
        setFriendsRqs(res.data);
      })
      .catch(error => {
        console.error(error);
      });
    // Get received Requests 
    axios.get(Base_Url + '/friends/getrqstrcvd/' + UserMobile)
      .then(res => {
        console.log('from fetch get requesting Friends list:', res.data);
        setFriendsRcv(res.data);
      })
      .catch(error => {
        console.error(error);
      });
    // Get IMLI friends
    axios.get(Base_Url + '/friends/getifriendsbyid/' + UserID)
      .then(res => {
        console.log('from fetch get Friends list:', res.data);
        setImliFrnds(res.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const CheckImliId = () => {

    console.log('from fetch get Friends Mobile:', frndsMob);

    axios.get(Base_Url + '/users/getusrbymob/' + frndsMob)
      .then(response => {
        console.log('Response :', response.data)
        if (response.data.length > 0) {
          userMob.current = UserMobile
          status.current = 'S'
          usrfrndmob.current = frndsMob
          frndid.current = UserID
          // touid.current = response.data[0].UserID
          touid.current = ' '
          friendsdtlSave()
        } else {

          Alert.alert("Mobile is not with IMLI");
          // userMob.current = UserMobile
          // status.current = 'D'
          // usrfrndmob.current = frndsMob
          // frndid.current = UserID
          // touid.current = ''
          // friendsdtlSave()
          return;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const showAlert = (item) => {

    Alert.alert(item);
  }
  const delRcvRqst = (UserMobile, UserFrndsMobile) => {
    console.log('the delRcvRqst  UserMobile value:', UserMobile , UserFrndsMobile );

    // let tomob = item.usrfrndmob;
    // let frommob = item.userMob;

    axios.delete(Base_Url + '/friends/delrcvrqst/' + UserMobile + '/' + UserFrndsMobile, {
      UserMobile: userMob, UserFrndsMobile: usrfrndmob, RequestStatus: 'S'
    }).then(function (response) {
      Alert.alert("Record Deleted successfully");

      return response; 
    })
  }

  const friendsStatUpdt = (item) => { 
    console.log ('In Friends update :', UserID,  item.UserMobile , item.UserFrndsMobile)
    axios.put(Base_Url + '/friends/friendsstatupdt/' + UserID + "/"  + item.UserMobile + "/" + item.UserFrndsMobile, {
      UserFrndsID: UserID, RequestStatus: 'A'
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

  const friendsdtlSave = () => {

    console.log('The valuse to be inserted:', frndid.current, userMob.current, usrfrndmob.current, status.current, touid.current);
 
    axios.post(Base_Url + '/friends/friendsdtlsave', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      // UserID: userName, FrndMob: frndsMob, Status: status
      UserID: frndid.current, UserMobile: userMob.current, UserFrndsMobile: usrfrndmob.current, RequestStatus: status.current, UserFrndsID: touid.current
    })
      .then(function (data) {
        Alert.alert("Record Inserted successfully");
        return data;
      })
      .catch(function (error) {
        Alert.alert("This request already sent, thanks")
        // console.log('There has been a problem with your friends insert operation: ' + error.message);
        // throw error;
        throw error.response.data;

      });
  }
  const [count, setCount] = useState(null);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  const ListEmptyView = () => {
    return (
      <View >
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}> No friends Request Sent</Text>
      </View>

    );
  }
  const ListEmptyView1 = () => {
    return (
      <View >
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}> No Request received</Text>
      </View>

    );
  }
  const ListEmptyView2 = () => {
    return (
      <View >
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}> No IMLI friends</Text>
      </View>

    );
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
          <View>
            {/* If user's friend mobile number exists then add to Userfrind mapping table else send a message to the friend to register in IMLI */}
            <Card>
              <Card.Content style={{ flex: 1, width: 350, height: 70, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={{ marginTop: 1, width: 200, height: 30 }}
                  label='Mobile No'
                  mode='outlined'
                  onChangeText={(text) => setFrndsMob(text)}
                />
                <TouchableOpacity style={[styles.appButtonContainer]}
                  // style={{ backgroundColor: "lightgreen", borderRadius: 15, height: 30, marginTop: 10 }}
                  onPress={() => CheckImliId()}
                >
                  <Text style={[styles.appInnerText]}> Request</Text>
                  {/* <Text style={styles.btnText}> Get All Category List</Text> */}
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
        <View>
          <Card>
            <Card.Content style={{ width: 350, height: 200 }}>
              <View>
                <Text style={{ backgroundColor: 'powderblue', marginTop: 5, fontWeight: 'bold' }}> Requested Friends</Text>
              </View>
              <View >
                <FlatList
                  data={friendsrqs}
                  //data defined in constructor
                  ItemSeparatorComponent={FlatListItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    <View>
                      <Card >
                        <Card.Content style={[styles.container]}>
                          <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}
                            onPress={() => showAlert(item)}
                          // onPress={() => navigation.navigate('Login')}
                          >
                            <Text style={styles.item} >  {item.UserFrndsMobile}  </Text>
                          </TouchableOpacity>
                          <Text>  </Text>
                          {/* <TouchableOpacity
                        style={{ backgroundColor: "lightgreen", justifyContent: 'space-between', borderRadius: 20 }}
                        onPress={(onPress)} */}
                          {/* > */}
                          {/* <Text style={styles.text}>" "</Text> */}
                          {/* </TouchableOpacity> */}
                          <TouchableOpacity
                            style={{ backgroundColor: "lightgreen", justifyContent: 'space-between', borderRadius: 20 }}
                            // onPress={() => delRcvRqst(item.UserMobile, item.UserFrndsMobile)}
                          >
                            {/* <Icon name="Check" style={{  color: 'green', fontSize: 20 }} /> */}
                            <Icon name="close" style={{ color: 'red', fontSize: 20 }} />
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}></Text> */}
                          </TouchableOpacity>

                        </Card.Content>
                      </Card>

                    </View>
                  )}
                  ListEmptyComponent={ListEmptyView}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content style={{ width: 350, height: 200 }}>
              <View>
                <Text style={{ backgroundColor: 'powderblue', marginTop: 5, fontWeight: 'bold' }}> Received Requests</Text>
              </View>
              <View >
                <FlatList
                  data={FriendsRcv}
                  //data defined in constructor
                  ItemSeparatorComponent={FlatListItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    <View>
                      <Card >
                        <Card.Content style={[styles.container]}>
                          <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}
                            onPress={() => showAlert(item.UserID)}
                          // onPress={() => navigation.navigate('Login')}
                          >
                            <Text style={styles.item} >  {item.UserMobile}  </Text>
                          </TouchableOpacity>
                          <Text>  </Text>
                          <TouchableOpacity
                            style={{ backgroundColor: "lightgreen", justifyContent: 'space-between', borderRadius: 20 }}
                            onPress={() => friendsStatUpdt(item)}
                          >
                            <Icon name="check" style={{  color: 'green', fontSize: 20 }} /> 
                            
                            {/* <Text style={{ fontWeight: 'bold' }}>Accept</Text> */}
                          </TouchableOpacity>
                          <Text>  </Text>
                          <TouchableOpacity
                            style={{ backgroundColor: "lightgreen", justifyContent: 'space-between', borderRadius: 20 }}
                            // onPress={(onPress)}
                            onPress={() => delRcvRqst(item.UserMobile, item.UserFrndsMobile)}
                          >
                             <Icon name="close" style={{ color: 'red', fontSize: 20 }} />
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>X</Text> */}
                          </TouchableOpacity>

                        </Card.Content>
                      </Card>

                    </View>
                  )}
                  ListEmptyComponent={ListEmptyView1}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content style={{ width: 350, height: 200 }}>
              <View>
                <Text style={{ backgroundColor: 'powderblue', marginTop: 5, fontWeight: 'bold' }}> IMLI Friends</Text>
              </View>
              <View >
                <FlatList
                  data={imlifrnds}
                  //data defined in constructor
                  ItemSeparatorComponent={FlatListItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    <View>
                      <Card >
                        <Card.Content style={[styles.container]}>
                          <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }}
                            onPress={(onPress)}
                          // onPress={() => navigation.navigate('Login')}
                          >
                            {item.UserID === UserID ? (
                               <Text style={styles.item} >  {item.UserFrndsMobile}  </Text>
                            ):(
                              <Text style={styles.item} >  {item.UserMobile}  </Text>
                                
                            )
                              }
                            
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ backgroundColor: "lightgreen", justifyContent: 'space-between', borderRadius: 20 }}
                            onPress={(onPress)}
                          >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>X</Text>
                          </TouchableOpacity>

                        </Card.Content>
                      </Card>

                    </View>
                  )}
                  ListEmptyComponent={ListEmptyView2}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

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
    padding: 10,
  },

  item: {
    padding: 0,
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
    paddingHorizontal: 12
  },
  appInnerText: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "none"
  },
  //   input: {
  //     width: '80%',
  //     height: 44,
  //     padding: 10,
  //     marginBottom: 10,
  //     backgroundColor: 'lightblue',
  //   },

});
export default FriendsScreen;


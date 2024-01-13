import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import {Base_Url} from '@env';
import { AuthContext } from '../Context/AuthContext';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import SendSMS from 'react-native-sms';
import { CardContent } from '@mui/material';


const SendInviteScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [bodySMS, setBodySMS] = useState('');

  const [occnamelist, setOccNameList] = useState('');
  const [OccName, setOccName] = useState('');
  const [mobnumlist, setMobNumList] = useState('');
  const [moblist, setMobList] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { UserName, UserID, UserMobile } = useContext(AuthContext);
  const [data, setData] = React.useState([]);
  //     const mobnumlist = [
  //         {key: 8197665295, value: '8197665295'},
  //         {key: 8197665435, value: '8197665435'},
  //   {key: 4736342332, value: '4736342332'},
  //   {key: 7870889800, value: '7870889800'},
  //   {key: 2343244988, value: '2343244988'},
  //   {key: 6897800234, value: '6897800234'},
  //   {key: 3448898434, value: '3448898434'},
  //   {key: 5675685688, value: '5675685688'},
  //   {key: 3769769800, value: '3769769800'},
  //   {key: 1243575886, value: '0124357588'},

  // ];

  const SetSMSvars = (item) => {
    setBodySMS(
      " Inviting you for my " + item.OccasionDesc + "\n"
      + "From:" + " " + item.OccasionStartDate + "\n"
      + "To:" + " " + item.OccasionEndDate);
    setModalVisible(true)
  }
  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };
  useEffect(() => {

    axios.get(Base_Url + '/occasion/getusroccdtlbydate/' + UserID)
      .then(res => {
        console.log('from fetch user Occ list:', res.data);
        setOccNameList(res.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(Base_Url + '/friends/getifriendsbyid/' + UserID)
      .then(res => {
        // var id = 0;
        console.log('from fetch getallimlimob:', res.data);
        let newArray = res.data.map((item) => {
          //   id = id + 1;
          if (item.UserFrndsID === UserID)
             return { key: item.UserMobile, value: item.UserMobile}
          else
             return { key: item.UserFrndsMobile, value: item.UserFrndsMobile }
          console.log('from fetch getallimlimob:', res.data);
        })
        setMobNumList(newArray);
      }).catch(error => {
        console.error(error);
      })


  }, []);

  const SMStoSend = () => {
    SendSMS.send(
      {
        // Message body
        body: bodySMS,
        // Recipients Number
        recipients: selected,
        // An array of types 
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }
  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };
  const ListEmptyView = () => {
    return (
        <View >
            <Text style={{ textAlign: 'center', fontSize: 15 }}> No Occassions listed</Text>
        </View>

    );
}

  return (
    <PaperProvider>
      <SafeAreaView>
        {/* <ScrollView> */}
        <ScrollView>


          <View style={[styles.container]} >
            {/* <Card>
            <Card.Content > */}
            <View>
              <FlatList
                data={occnamelist}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) => (
                  <View>
                    <Card >
                      <Card.Content style={[styles.container]}>
                        <View>
                          <TouchableOpacity
                            // style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}
                            onPress={() => SetSMSvars(item)}
                          >
                            <Text style={styles.item} > {item.OccasionDesc} {item.OccasionStartDate} {item.OccasionEndDate}</Text>
                          </TouchableOpacity>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={ListEmptyView}
              />
            </View>

            {/* </Card.Content>
           </Card> */}
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ width: 175, height: 100 }}>

                    <MultipleSelectList
                      setSelected={(val) => setSelected(val)}
                      data={mobnumlist}
                      onSelect={() => console.log(selected)}
                      Save="value"
                    />
                  </View>

                </View>
                <View >
                  <Card>
                    <Card.Content >
                      {/* <View> */}
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonStyle}
                        onPress={SMStoSend}>
                        <Text style={styles.buttonTextStyle}>
                          Send Message
                        </Text>
                      </TouchableOpacity>
                      {/* </View> */}
                    </Card.Content>
                  </Card>
                </View>
              </View>
            </Modal>
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
    justifyContent: 'space-between',
    backgroundColor: 'powderblue',
  },
  dropdown1DropdownStyle: {
    backgroundColor: 'lightgreen'
  },
  dropdown2BtnStyle: {
    flex: 1,
    height: 30,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  item: {
    padding: 10,
    fontSize: 15,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    color: 'lightgreen',

  },
  modalView: {
    alignItems: 'center',
    height: 350,
    margin: 0,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: 250,
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  textStyle: {
    color: 'lightgreen',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default SendInviteScreen;
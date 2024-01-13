import {Base_Url} from '@env';
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Card, Title, TextInput, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';


const UserOccScreen = ({ navigation }) => {
    const { UserName, UserID, UserMobile } = useContext(AuthContext);
    const [showDropDown, setShowDropDown] = useState(false);
    // const [OccID, setOccID] = useState(null);
    const [OccList, setOccList] = useState([]);
    const [userOcc, setUserOcc] = useState('');
    const [status, setStatus] = useState('');
    const [OccasionDesc, setOccasionDesc] = useState('');
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [isPickerShows, setIsPickerShows] = useState(false);
    const [sdate, setSDate] = useState(new Date(Date.now()));
    const [edate, setEDate] = useState(new Date(Date.now()));

    const [showadd, setShowAdd] = useState(['false']);

    const [count, setCount] = useState(null);
    const onPress = () => setCount(prevCount => prevCount + 1);

    const FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };

    const TypeList = ["Daughter Marriage",
        "Dewali Celebrations",
        "Marrige Anniverssary",
        "Promotion Party",
        "House Warming Party",
        "Birthday Celebration",
        "Others"
    ]
    useEffect(() => {

        // const [OccList, setOccList] = useState([]);
        axios.get(Base_Url + '/occasion/getusroccdtlbydate/' + UserID)
            .then(res => {
                console.log('from fetch user Occ list:', res.data);
                setOccList(res.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const showPickers = () => {
        setIsPickerShows(true);

    };
    const showPicker = () => {
        setIsPickerShow(true);
    };
    const AddTheSelect = (selectedItem) => {
        setOccasionDesc(selectedItem);
        setStatus('A');
    };
    const onStartChange = (event, value) => {
        setSDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShows(false);
        }
    };
    const onEndChange = (event, value) => {
        setEDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };
    // const onChangeText = () => {
    //     setOccName(OccName)
    // }
    // const onOccNameChange = (value) => {
    //     setOccName(value);
    //     // setOccID(1);
    //     setStatus('A');

    //     if (Platform.OS === 'android') {
    //         setIsPickerShow(false);
    //     }
    // };
    const ShowAddScreen = () => {
        setShowAdd('true');

    }
    // const getUserOcc = () => {
    //     axios.get(Base_Url + '/users/useroccasionsdtl/' + UserID)
    //         .then(res => {
    //             console.log('from fetch user Occ list:', res.data);
    //             setOccList(res.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    const addOccasion = () => {
        console.log("TEST", OccasionDesc, sdate.toISOString().substring(0,10) , edate.toISOString().substring(0,10), UserID, status);
        // setOccID(1); 
        // status = 'A';
        axios.post(Base_Url + '/occasion/addoccasion', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            OccasionDesc: OccasionDesc,
            OccasionStartDate: sdate.toISOString().substring(0,10),
            OccasionEndDate: edate.toISOString().substring(0,10),
            UpdatedBy: UserID,
            OccasionStatus: status
            // userID: userID, OccasionID: OccID, OccName: OccName, Status: status, OccSdate: sdate, OccEdate: edate
        })
            .then(function (response) {
                Alert.alert("Record Inserted successfully");
                return response.data;
            })
            .catch(function (error) {
                console.log('There has been a problem with your insert operation: ' + error.message);
                throw error;

            });
    }
    return (
        <PaperProvider>
            <SafeAreaView>
                <ScrollView>
                    <View style={[styles.container]}>
                        <TouchableOpacity style={styles.container} 
                            onPress={() => navigation.navigate('SendInviteScreen')}
                        >
                            <Text style={[styles.appInnerText]}>Send Invite</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Card>
                            <Card.Content style={[styles.container1]}>
                                <View >
                                    <SelectDropdown
                                        defaultButtonText='Select Occassion'
                                        data={TypeList}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                            AddTheSelect(selectedItem);
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
                    </View>
                    <Text> Not in the list ? Add your Occasion below as well.</Text>
                    <View>
                        <Card>
                            <Card.Content style={[styles.container]}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setOccasionDesc(text)}
                                    value={OccasionDesc}
                                />

                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content style={[styles.container1]}>
                                <View style={styles.pickedDateContainer}>
                                    {!isPickerShow && (
                                        <View >
                                            <TouchableOpacity
                                                style={{ width: 100, marginTop: 0, padding: 0, borderRadius: 5, alignItems: 'center' }}
                                                onPress={showPickers}
                                            >
                                                <Text style={styles.btnText}>Pick Start Date</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.pickedDate}>{sdate.toLocaleDateString()}</Text>
                                            {/* <Text style={styles.btnText}  onPress={showPicker} > Pick EOD </Text> */}
                                        </View>
                                    )}
                                    {/* The date picker */}
                                    {isPickerShows && (
                                        <DateTimePicker
                                            value={sdate}
                                            mode={'date'}
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            // is24Hour={true}
                                            onChange={onStartChange}
                                            style={styles.datePicker}
                                        />
                                    )}
                                </View>
                                <View>
                                    <View style={styles.pickedDateContainer}>
                                        {!isPickerShow && (
                                            <View >

                                                <TouchableOpacity
                                                    style={{ width: 100, marginTop: 0, padding: 0, borderRadius: 5, alignItems: 'center' }}
                                                    onPress={showPicker}
                                                >
                                                    <Text style={styles.btnText}>Pick End Date</Text>
                                                </TouchableOpacity>

                                                <Text style={styles.pickedDate}>{edate.toLocaleDateString()}</Text>
                                                {/* <Text style={styles.btnText}  onPress={showPicker} > Pick EOD </Text> */}
                                            </View>
                                        )}

                                        {/* The date picker */}
                                        {isPickerShow && (
                                            <DateTimePicker
                                                value={edate}
                                                mode={'date'}
                                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                // is24Hour={true}
                                                onChange={onEndChange}
                                                style={styles.datePicker}
                                            />
                                        )}
                                    </View>
                                </View>
                                {/* <View> */}

                                {/* <Card>
                                            <Card.Content> */}
                                {/* <TouchableOpacity
                                                    style={{ width: 40, marginTop: 10, padding: 0, borderRadius: 10, alignItems: 'center' }}
                                                    onPress={(UserOccSave)}
                                                >
                                                    <Text> <Icon name="save" style={{ color: '#0000FF', fontSize: 20 }} /> Save</Text>
                                                </TouchableOpacity> */}
                                {/* </Card.Content>
                                        </Card> */}
                                {/* </View> */}

                            </Card.Content>
                        </Card>
                        <TouchableOpacity
                            style={[styles.container1]}
                            // style={{ width: 40, marginTop: 10, padding: 0, borderRadius: 10, alignItems: 'center' }}
                            onPress={() => addOccasion()}
                        >
                            <Text style={{ fontSize: 20 }}> <Icon name="save" style={{ color: '#0000FF', fontSize: 25 }} /> Save</Text>
                        </TouchableOpacity>
                    </View> 

                </ScrollView>
                {/* <> if (showadd === "true")  */}
                <View>
                <Text style={[styles.appButtonText]}>My Occssions</Text>
                    {/* <TouchableOpacity style={styles.appButtonContainer}
                        onPress={() => userOccasionsDtl()}
                    >
                        <Text style={[styles.appButtonText]}>My Occssions ( <Text style={[styles.appInnerText]}>Click to See</Text>)</Text>
                    </TouchableOpacity> */}
                    {/* <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: 10 }}>  The List of Your Occassions </Text> */}
                    <View>
                        <FlatList
                            data={OccList}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={({ item }) => (
                                <View>
                                    {/* <Text> {OccList} </Text> */}
                                    <Card >
                                        <Card.Content style={[styles.container]}>
                                            <View >
                                            
                                                <Text style={styles.item} > {item.OccasionDesc} {item.OccasionStartDate} TO {item.OccasionEndDate}</Text>
                                           
                                            </View>
                                        
                                            <View>
                                            <TouchableOpacity style={styles.appInnerText}
                                              onPress={() => navigation.navigate('SendInviteScreen')}
                                            >
                                                <Icon name="delete" style={{ color: 'red', fontSize: 20 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

                {/* </View> */}

                {/* </> */}
            </SafeAreaView >
        </PaperProvider >
    );
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        padding: 10,
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        padding: 10,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightgreen',
        borderColor: 'gold',
        padding: 40,
    },
    item: {
        padding: 0,
        fontSize: 15,

    },
    input: {
        flex: 1,
        height: 20,
        margin: 5,
        borderWidth: 1,
        padding: 5,
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
export default UserOccScreen;

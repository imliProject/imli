import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, Title, TextInput, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import { AuthContext } from '../Context/AuthContext';
import Header from '../Component/Header';
import MessageCardList from '../Component/MessageCardList';
import PhoneList from '../Component/PhoneList';

import {Base_Url} from '@env';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    return (
    <>
    <Header />
    <MessageCardList />
    <PhoneList />
    
    </>
    );
};
export default HomeScreen;
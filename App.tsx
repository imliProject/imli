import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from "react-native";
import AppNav from '../imli/Navigation/AppNav';
import { AuthProvider } from './Context/AuthContext';


const App = () => {

  return ( 
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
})

export default App;
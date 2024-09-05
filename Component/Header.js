   // Header.js
   import React from 'react';
   import { View, Text, Image, StyleSheet } from 'react-native';
   import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons

   const Header = () => {
     return (
       <View style={styles.headerContainer}>
         {/* Logo on the left */}
         <Image
           source={{ uri: 'https://example.com/logo.png' }} // Replace with your logo URL
           style={styles.logo}
         />

         {/* Welcome message in the center */}
         <Text style={styles.welcomeText}>Welcome to MyApp!</Text>

         {/* Profile icon on the right */}
         <Icon name="person-circle" size={30} color="#000" />
       </View>
     );
   };

   const styles = StyleSheet.create({
     headerContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       padding: 10,
       backgroundColor: '#f8f8f8',
       elevation: 2, // For Android shadow
       shadowColor: '#000', // For iOS shadow
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.2,
       shadowRadius: 2,
     },
     logo: {
       width: 40,
       height: 40,
     },
     welcomeText: {
       fontSize: 18,
       fontWeight: 'bold',
       textAlign: 'center',
       flex: 1, // This allows the text to take up space in the center
     },
   });

   export default Header;
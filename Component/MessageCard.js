// MessageCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageCard = ({ message }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 200, // Set a fixed width for the card
  },
  messageText: {
    fontSize: 16,
  },
});

export default MessageCard;
// MessageCardList.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MessageCard from './MessageCard';

const MessageCardList = () => {
  const messages = [
    "Hello! This is the first message.",
    "Here's the second message.",
    "This is another message for you.",
    "Don't miss this one!",
    "Keep scrolling for more messages.",
    "Last message in the list!"
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      contentContainerStyle={styles.scrollContainer}
    >
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20, // Add vertical padding
  },
});

export default MessageCardList;
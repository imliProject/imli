// PhoneList.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const PhoneList = () => {
  const [phones, setPhones] = useState([
    { id: '1', name: 'iPhone 14' },
    { id: '2', name: 'Samsung Galaxy S21' },
    { id: '3', name: 'Google Pixel 6' },
    { id: '4', name: 'OnePlus 9' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [formData, setFormData] = useState({ phoneName: '', additionalInfo: '' });

  const handleDrop = (item) => {
    setSelectedPhone(item);
    setModalVisible(true);
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
    console.log('Form Data:', { ...formData, phoneName: selectedPhone.name });
    setModalVisible(false);
    setFormData({ phoneName: '', additionalInfo: '' });
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={phones}
        renderItem={({ item, drag, isActive }) => (
          <TouchableOpacity
            onLongPress={drag}
            onPressOut={() => handleDrop(item)}
            style={[styles.phoneItem, isActive && styles.activeItem]}
          >
            <Text style={styles.phoneText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setPhones(data)}
      />

      <View style={styles.dropArea}>
        <Text style={styles.dropAreaText}>Drop Here</Text>
      </View>

      {/* Modal for the form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Input Data for {selectedPhone?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Additional Info"
              value={formData.additionalInfo}
              onChangeText={(text) => setFormData({ ...formData, additionalInfo: text })}
            />
            <Button title="Submit" onPress={handleFormSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  phoneItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
  phoneText: {
    fontSize: 16,
  },
  dropArea: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007BFF',
    marginTop: 20,
    borderRadius: 10,
  },
  dropAreaText: {
    fontSize: 20,
    color: '#007BFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default PhoneList;
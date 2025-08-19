import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useStore } from '../store';

export default function SettingsScreen() {
  const resetToMockData = useStore(state => state.resetToMockData);

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'This will reset all data to the initial mock data. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetToMockData();
            Alert.alert('Success', 'Data has been reset to initial mock data.');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      
      <Pressable 
        style={styles.button}
        onPress={handleResetData}
      >
        <Text style={styles.buttonText}>Reset to Mock Data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 16,
    marginTop: 35,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
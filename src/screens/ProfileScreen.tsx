import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { useStore } from '../store';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const currentUser = useStore(state => state.currentUser);
  const books = useStore(state => state.books);

  const booksRead = books.filter(book => 
    currentUser?.booksRead?.includes(book.id)
  ).length;

  const currentlyReading = books.filter(book => 
    currentUser?.currentlyReading?.includes(book.id)
  ).length;

  return (
    <Screen>
      <View style={styles.header}>
        <Image 
          source={{ uri: currentUser?.avatar }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{currentUser?.name}</Text>
        <Text style={styles.username}>@{currentUser?.username}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{booksRead}</Text>
          <Text style={styles.statLabel}>Books Read</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{currentlyReading}</Text>
          <Text style={styles.statLabel}>Currently Reading</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{currentUser?.joinedClubs.length}</Text>
          <Text style={styles.statLabel}>Book Clubs</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingsButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
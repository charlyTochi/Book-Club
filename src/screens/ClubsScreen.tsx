import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { useStore } from '../store';
import { RootStackParamList } from '../types/navigation';
import { BookClub } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ClubsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const bookClubs = useStore(state => state.bookClubs);
  const currentUser = useStore(state => state.currentUser);

  const myClubs = bookClubs.filter(club => 
    currentUser?.joinedClubs.includes(club.id)
  );

  const otherClubs = bookClubs.filter(club => 
    !currentUser?.joinedClubs.includes(club.id)
  );

  const renderClubItem = ({ item }: { item: BookClub }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => navigation.navigate('ClubDetails', { clubId: item.id })}
    >
      <Text style={styles.clubName}>{item.name}</Text>
      <Text style={styles.clubDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.memberCount}>{item.members.length} members</Text>
    </TouchableOpacity>
  );

  return (
    <Screen>
      <FlatList
        data={[
          { title: 'My Book Clubs', data: myClubs },
          { title: 'Available Clubs', data: otherClubs }
        ]}
        renderItem={({ item: section }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              renderItem={renderClubItem}
              keyExtractor={item => item.id}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        keyExtractor={item => item.title}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  clubCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  clubDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 12,
    color: '#999',
  },
}); 
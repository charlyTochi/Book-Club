import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { Screen } from '../components/Screen';
import { useStore } from '../store';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const books = useStore(state => state.books);

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    
    const query = searchQuery.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genres.some(genre => genre.toLowerCase().includes(query))
    );
  }, [books, searchQuery]);

  const renderBook = ({ item }: { item: Book }) => (
    <BookCard book={item} />
  );

  return (
    <Screen>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books by title, author, or genre"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderBook}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    padding: 16,
  },
}); 
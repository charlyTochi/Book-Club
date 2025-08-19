import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Screen } from '../components/Screen';
import { BookList } from '../components/BookList';
import { useStore } from '../store';

const HomeScreen = () => {
  const { books, currentUser } = useStore();

  // Get currently reading books
  const currentlyReading = books.filter(
    book => currentUser?.currentlyReading?.includes(book.id)
  );

  // Get recommended books (excluding currently reading)
  const recommended = books.filter(
    book => !currentUser?.currentlyReading?.includes(book.id)
  );

  if (!books.length) {
    return (
      <Screen>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Loading books...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentlyReading.length > 0 ? (
          <BookList
            title="Currently Reading"
            books={currentlyReading}
            horizontal={true}
          />
        ) : null}
        
        {recommended.length > 0 ? (
          <BookList
            title="Recommended for You"
            books={recommended}
            horizontal={true}
          />
        ) : null}

        {!currentlyReading.length && !recommended.length && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No books available.</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen; 
import React, { useMemo, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { ReadingProgressCard } from '../components/ReadingProgressCard';
import { useStore } from '../store';
import { ReadingProgress } from '../types';

const MyBooksScreen = () => {
  const { books, currentUser, updateReadingProgress, initialize } = useStore();

  useEffect(() => {
    if (!books.length || !currentUser) {
      initialize();
    }
  }, []);

  // Get user's books with reading progress
  const userBooks = useMemo(() => {
    if (!currentUser) return [];

    // Use myBooks array to show all books, including 'not-started' ones
    const myBooks = currentUser.myBooks || [];
    return myBooks.map(bookId => {
      const book = books.find(b => b.id === bookId);
      if (!book) return null;

      let status: 'not-started' | 'in-progress' | 'completed';
      if (currentUser.booksRead?.includes(bookId)) {
        status = 'completed';
      } else if (currentUser.currentlyReading?.includes(bookId)) {
        status = 'in-progress';
      } else {
        status = 'not-started';
      }

      // Mock reading progress
      const progress: ReadingProgress = {
        userId: currentUser.id,
        bookId: book.id,
        pagesRead: status === 'completed' ? 300 : status === 'in-progress' ? 150 : 0,
        totalPages: 300,
        status,
        lastUpdated: new Date().toISOString(),
      };

      return { book, progress };
    }).filter(Boolean);
  }, [books, currentUser, currentUser?.booksRead, currentUser?.currentlyReading, currentUser?.myBooks]);

  const handleStatusChange = (bookId: string, status: 'not-started' | 'in-progress' | 'completed') => {
    if (currentUser) {
      updateReadingProgress(currentUser.id, bookId, status);
    }
  };

  if (!currentUser || !books.length) {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading your books...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {userBooks.length === 0 ? (
          <Text style={styles.emptyText}>No books in your library yet.</Text>
        ) : (
          userBooks.map(item => (
            item && (
              <ReadingProgressCard
                key={item.book.id}
                book={item.book}
                progress={item.progress}
                onStatusChange={(status) => handleStatusChange(item.book.id, status)}
              />
            )
          ))
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default MyBooksScreen; 
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Book } from '../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  horizontal?: boolean;
  title?: string;
}

export const BookList: React.FC<BookListProps> = ({ books, horizontal, title }) => {
  const renderItem = ({ item, index }: { item: Book; index: number }) => (
    <View style={[
      horizontal && index > 0 && styles.horizontalSpacing
    ]}>
      <BookCard book={item} horizontal={horizontal} />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={books}
        horizontal={horizontal}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          horizontal ? styles.horizontalContainer : styles.verticalContainer
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  container: {
    padding: 8,
  },
  horizontalContainer: {
    paddingRight: 16,
  },
  verticalContainer: {
    paddingHorizontal: 16,
  },
  horizontalSpacing: {
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 16,
  },
}); 
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Book } from '../types';
import { RootStackParamList } from '../types/navigation';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
  style?: object;
  horizontal?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress, style, horizontal = false }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('BookDetails', { bookId: book.id });
    }
  };

  // Ensure valid rating value
  const rating = typeof book.averageRating === 'number' && !isNaN(book.averageRating)
    ? book.averageRating.toFixed(1)
    : '0.0';

  // Ensure valid review count
  const reviewCount = typeof book.totalReviews === 'number' && !isNaN(book.totalReviews)
    ? book.totalReviews
    : 0;

  return (
    <Pressable 
      onPress={handlePress} 
      style={[
        styles.container,
        horizontal ? styles.containerHorizontal : styles.containerVertical,
        style
      ]}
    >
      <View style={[
        styles.coverContainer,
        horizontal ? styles.coverContainerHorizontal : styles.coverContainerVertical
      ]}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6200ee" />
          </View>
        )}
        {hasError && (
          <View style={[styles.cover, styles.errorContainer]}>
            <Text style={styles.errorText}>No Cover</Text>
          </View>
        )}
        <Image
          source={{ uri: book.coverImage }}
          style={[styles.cover, isLoading && styles.hiddenImage]}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          resizeMode="cover"
        />
      </View>
      <View style={[
        styles.info,
        horizontal ? styles.infoHorizontal : styles.infoVertical
      ]}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {rating}</Text>
          <Text style={styles.reviews}>({reviewCount})</Text>
        </View>
        {!horizontal && book.genres && book.genres.length > 0 && (
          <View style={styles.genreContainer}>
            {book.genres.slice(0, 2).map((genre, index) => (
              <Text key={index} style={styles.genre}>
                {genre}
              </Text>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerHorizontal: {
    width: 160,
  },
  containerVertical: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  coverContainer: {
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  coverContainerHorizontal: {
    width: '100%',
    height: 200,
  },
  coverContainerVertical: {
    width: 100,
    height: 150,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: '#666',
    fontSize: 14,
  },
  info: {
    padding: 12,
  },
  infoHorizontal: {
    width: '100%',
  },
  infoVertical: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f6b100',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  genre: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
}); 
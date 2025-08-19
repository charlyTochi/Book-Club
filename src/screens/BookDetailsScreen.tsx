import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store';
import { Screen } from '../components/Screen';
import { ReviewList } from '../components/ReviewList';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;

export default function BookDetailsScreen({ route, navigation }: Props) {
  const { bookId } = route.params;
  const { books, reviews, users, currentUser } = useStore();

  const book = books.find(b => b.id === bookId);
  if (!book) return null;

  const bookReviews = reviews.filter(review => review.bookId === bookId);

  const handleWriteReview = () => {
    navigation.navigate('CreateReview', { bookId });
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {/* Book Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: book.coverImage }}
            style={styles.cover}
            resizeMode="cover"
          />
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {book.averageRating.toFixed(1)}</Text>
              <Text style={styles.reviews}>({book.totalReviews} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Book Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Book</Text>
          <Text style={styles.description}>{book.description}</Text>
          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Published</Text>
              <Text style={styles.metadataValue}>{book.publishedDate}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>ISBN</Text>
              <Text style={styles.metadataValue}>{book.isbn}</Text>
            </View>
          </View>
          <View style={styles.genres}>
            {book.genres.map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Pressable
              style={styles.writeReviewButton}
              onPress={handleWriteReview}
            >
              <Ionicons name="create-outline" size={20} color="#6200ee" />
              <Text style={styles.writeReviewText}>Write a Review</Text>
            </Pressable>
          </View>
          {bookReviews.length > 0 ? (
            <ReviewList
              reviews={bookReviews}
              users={users}
            />
          ) : (
            <Text style={styles.noReviews}>
              No reviews yet. Be the first to review this book!
            </Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 8,
  },
  cover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f6b100',
    marginRight: 4,
  },
  reviews: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  metadata: {
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metadataLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  metadataValue: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#f0e6ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 14,
    color: '#6200ee',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0e6ff',
  },
  writeReviewText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#6200ee',
  },
  noReviews: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 
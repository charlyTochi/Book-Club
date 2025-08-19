import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store';
import { Screen } from '../components/Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateReview'>;

const MAX_RATING = 5;

export default function CreateReviewScreen({ route, navigation }: Props) {
  const { bookId } = route.params;
  const { books, currentUser, addReview } = useStore();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const book = books.find(b => b.id === bookId);
  if (!book || !currentUser) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    if (review.trim().length < 10) {
      Alert.alert('Error', 'Please write a review (minimum 10 characters)');
      return;
    }

    const newReview = {
      id: `review${Date.now()}`,
      bookId,
      userId: currentUser.id,
      rating,
      text: review.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    addReview(newReview);
    Alert.alert('Success', 'Your review has been posted!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {/* Book Info */}
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>by {book.author}</Text>
        </View>

        {/* Rating Selection */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>
            {[...Array(MAX_RATING)].map((_, index) => (
              <Pressable
                key={index}
                onPress={() => setRating(index + 1)}
                style={styles.starButton}
              >
                <Ionicons
                  name={index < rating ? 'star' : 'star-outline'}
                  size={32}
                  color="#f6b100"
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            multiline
            numberOfLines={8}
            placeholder="Share your thoughts about this book..."
            value={review}
            onChangeText={setReview}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post Review</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookInfo: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
  },
  ratingSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  reviewSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 160,
    backgroundColor: '#f8f8f8',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
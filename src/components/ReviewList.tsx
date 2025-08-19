import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Review, User } from '../types';

interface ReviewListProps {
  reviews: Review[];
  users: User[];
  onLikePress?: (reviewId: string) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  users,
  onLikePress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {reviews.map(review => {
        const user = users.find(u => u.id === review.userId);
        if (!user) return null;

        return (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < review.rating ? 'star' : 'star-outline'}
                  size={16}
                  color="#f6b100"
                  style={styles.star}
                />
              ))}
            </View>

            <Text style={styles.reviewText}>{review.text}</Text>

            <View style={styles.footer}>
              <Pressable
                style={styles.likeButton}
                onPress={() => onLikePress?.(review.id)}
              >
                <Ionicons name="heart-outline" size={20} color="#666" />
                <Text style={styles.likeCount}>{review.likes}</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    marginRight: 4,
  },
  reviewText: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
}); 
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Book } from '../types';

interface ReadingProgressCardProps {
  book: Book;
  progress: {
    pagesRead: number;
    totalPages: number;
    status: 'not-started' | 'in-progress' | 'completed';
  };
  onPress?: () => void;
  onStatusChange?: (status: 'not-started' | 'in-progress' | 'completed') => void;
}

export const ReadingProgressCard: React.FC<ReadingProgressCardProps> = ({
  book,
  progress,
  onPress,
  onStatusChange,
}) => {
  // Ensure valid numbers and prevent NaN
  const pagesRead = Math.max(0, progress.pagesRead || 0);
  const totalPages = Math.max(1, progress.totalPages || 1); // Prevent division by zero
  const progressPercentage = Math.min(100, Math.max(0, Math.round((pagesRead / totalPages) * 100)));

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {pagesRead} / {totalPages} pages ({progressPercentage}%)
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <Pressable
          style={[
            styles.statusButton,
            progress.status === 'not-started' && styles.statusButtonActive,
          ]}
          onPress={() => onStatusChange?.('not-started')}
        >
          <Text style={[
            styles.statusText,
            progress.status === 'not-started' && styles.statusTextActive
          ]}>Not Started</Text>
        </Pressable>
        <Pressable
          style={[
            styles.statusButton,
            progress.status === 'in-progress' && styles.statusButtonActive,
          ]}
          onPress={() => onStatusChange?.('in-progress')}
        >
          <Text style={[
            styles.statusText,
            progress.status === 'in-progress' && styles.statusTextActive
          ]}>Reading</Text>
        </Pressable>
        <Pressable
          style={[
            styles.statusButton,
            progress.status === 'completed' && styles.statusButtonActive,
          ]}
          onPress={() => onStatusChange?.('completed')}
        >
          <Text style={[
            styles.statusText,
            progress.status === 'completed' && styles.statusTextActive
          ]}>Completed</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#6200ee',
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statusTextActive: {
    color: '#fff',
  },
}); 
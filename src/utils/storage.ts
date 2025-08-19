import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, User, BookClub, Review } from '../types';

const STORAGE_KEYS = {
  BOOKS: '@BookClub:books',
  USERS: '@BookClub:users',
  BOOK_CLUBS: '@BookClub:bookClubs',
  REVIEWS: '@BookClub:reviews',
  CURRENT_USER: '@BookClub:currentUser',
};

export const storage = {
  async loadBooks(): Promise<Book[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async loadUsers(): Promise<User[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async loadBookClubs(): Promise<BookClub[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOK_CLUBS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async loadReviews(): Promise<Review[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.REVIEWS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async loadCurrentUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async saveBooks(books: Book[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    } catch {
      // Handle error
    }
  },

  async saveUsers(users: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch {
      // Handle error
    }
  },

  async saveBookClubs(clubs: BookClub[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BOOK_CLUBS, JSON.stringify(clubs));
    } catch {
      // Handle error
    }
  },

  async saveReviews(reviews: Review[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch {
      // Handle error
    }
  },

  async saveCurrentUser(user: User | null): Promise<void> {
    try {
      if (user) {
        await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch {
      // Handle error
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.BOOKS,
        STORAGE_KEYS.USERS,
        STORAGE_KEYS.BOOK_CLUBS,
        STORAGE_KEYS.REVIEWS,
        STORAGE_KEYS.CURRENT_USER,
      ]);
    } catch {
      // Handle error
    }
  },
}; 
import { create } from 'zustand';
import { Book, User, BookClub, Review } from '../types';
import { mockBooks, mockUsers, mockBookClubs, mockReviews } from '../data/mockData';
import { storage } from '../utils/storage';

interface AppState {
  // Data
  books: Book[];
  users: User[];
  bookClubs: BookClub[];
  reviews: Review[];
  currentUser: User | null;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  resetToMockData: () => Promise<void>;
  setBooks: (books: Book[]) => void;
  setUsers: (users: User[]) => void;
  setBookClubs: (clubs: BookClub[]) => void;
  setReviews: (reviews: Review[]) => void;
  setCurrentUser: (user: User | null) => void;
  addReview: (review: Review) => void;
  joinBookClub: (userId: string, clubId: string) => void;
  leaveBookClub: (userId: string, clubId: string) => void;
  updateReadingProgress: (userId: string, bookId: string, status: 'not-started' | 'in-progress' | 'completed') => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  books: [],
  users: [],
  bookClubs: [],
  reviews: [],
  currentUser: null,
  isInitialized: false,

  // Initialize the store with data from storage or mock data
  initialize: async () => {
    const [books, users, bookClubs, reviews, currentUser] = await Promise.all([
      storage.loadBooks(),
      storage.loadUsers(),
      storage.loadBookClubs(),
      storage.loadReviews(),
      storage.loadCurrentUser(),
    ]);

    // If no data in storage, use mock data
    const initialBooks = books.length ? books : mockBooks;
    const initialUsers = users.length ? users : mockUsers;
    const initialBookClubs = bookClubs.length ? bookClubs : mockBookClubs;
    const initialReviews = reviews.length ? reviews : mockReviews;
    const initialCurrentUser = currentUser || mockUsers[0];

    set({
      books: initialBooks,
      users: initialUsers,
      bookClubs: initialBookClubs,
      reviews: initialReviews,
      currentUser: initialCurrentUser,
      isInitialized: true,
    });

    // Save initial mock data to storage if needed
    if (!books.length) await storage.saveBooks(initialBooks);
    if (!users.length) await storage.saveUsers(initialUsers);
    if (!bookClubs.length) await storage.saveBookClubs(initialBookClubs);
    if (!reviews.length) await storage.saveReviews(initialReviews);
    if (!currentUser) await storage.saveCurrentUser(initialCurrentUser);
  },

  // Reset to mock data
  resetToMockData: async () => {
    await storage.clearAll();
    
    set({
      books: mockBooks,
      users: mockUsers,
      bookClubs: mockBookClubs,
      reviews: mockReviews,
      currentUser: mockUsers[0],
      isInitialized: true,
    });

    // Save mock data to storage
    await Promise.all([
      storage.saveBooks(mockBooks),
      storage.saveUsers(mockUsers),
      storage.saveBookClubs(mockBookClubs),
      storage.saveReviews(mockReviews),
      storage.saveCurrentUser(mockUsers[0]),
    ]);
  },

  // Actions
  setBooks: (books) => {
    set({ books });
    storage.saveBooks(books);
  },

  setUsers: (users) => {
    set({ users });
    storage.saveUsers(users);
  },

  setBookClubs: (clubs) => {
    set({ bookClubs: clubs });
    storage.saveBookClubs(clubs);
  },

  setReviews: (reviews) => {
    set({ reviews });
    storage.saveReviews(reviews);
  },

  setCurrentUser: (user) => {
    set({ currentUser: user });
    storage.saveCurrentUser(user);
  },

  addReview: (review) => {
    const newReviews = [...get().reviews, review];
    set({ reviews: newReviews });
    storage.saveReviews(newReviews);
  },

  joinBookClub: (userId, clubId) => {
    const { bookClubs, users } = get();
    
    const newBookClubs = bookClubs.map(club =>
      club.id === clubId
        ? { ...club, members: [...club.members, userId] }
        : club
    );

    const newUsers = users.map(user =>
      user.id === userId
        ? { ...user, joinedClubs: [...user.joinedClubs, clubId] }
        : user
    );

    set({ bookClubs: newBookClubs, users: newUsers });
    storage.saveBookClubs(newBookClubs);
    storage.saveUsers(newUsers);
  },

  leaveBookClub: (userId, clubId) => {
    const { bookClubs, users } = get();
    
    const newBookClubs = bookClubs.map(club =>
      club.id === clubId
        ? { ...club, members: club.members.filter(id => id !== userId) }
        : club
    );

    const newUsers = users.map(user =>
      user.id === userId
        ? { ...user, joinedClubs: user.joinedClubs.filter(id => id !== clubId) }
        : user
    );

    set({ bookClubs: newBookClubs, users: newUsers });
    storage.saveBookClubs(newBookClubs);
    storage.saveUsers(newUsers);
  },

  updateReadingProgress: (userId, bookId, status) => {
    const { users, currentUser } = get();
    
    const newUsers = users.map(user => {
      if (user.id !== userId) return user;

      // Initialize arrays if they don't exist
      const booksRead = user.booksRead || [];
      const currentlyReading = user.currentlyReading || [];
      const myBooks = user.myBooks || [];

      // Remove the book from both arrays first
      const filteredBooksRead = booksRead.filter(id => id !== bookId);
      const filteredCurrentlyReading = currentlyReading.filter(id => id !== bookId);

      // Ensure book is in myBooks array
      const updatedMyBooks = myBooks.includes(bookId) ? myBooks : [...myBooks, bookId];

      // Add the book to the appropriate array based on status
      switch (status) {
        case 'completed':
          return {
            ...user,
            myBooks: updatedMyBooks,
            booksRead: [...filteredBooksRead, bookId],
            currentlyReading: filteredCurrentlyReading,
          };
        case 'in-progress':
          return {
            ...user,
            myBooks: updatedMyBooks,
            booksRead: filteredBooksRead,
            currentlyReading: [...filteredCurrentlyReading, bookId],
          };
        case 'not-started':
          return {
            ...user,
            myBooks: updatedMyBooks,
            booksRead: filteredBooksRead,
            currentlyReading: filteredCurrentlyReading,
          };
        default:
          return user;
      }
    });

    // Update both the users array and the currentUser
    const newCurrentUser = newUsers.find(user => user.id === currentUser?.id) || currentUser;
    
    set({ 
      users: newUsers,
      currentUser: newCurrentUser
    });

    // Save to storage
    storage.saveUsers(newUsers);
    if (newCurrentUser) {
      storage.saveCurrentUser(newCurrentUser);
    }
  },
})); 
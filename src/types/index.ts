export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  joinedClubs: string[];
  booksRead?: string[];
  currentlyReading?: string[];
  myBooks?: string[]; // Array of all books user has interacted with
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  isbn: string;
  publishedDate: string;
  genres: string[];
  averageRating: number;
  totalReviews: number;
}

export interface BookClub {
  id: string;
  name: string;
  description: string;
  currentBook: string;
  members: string[];
  adminId: string;
  createdAt: string;
  meetingSchedule?: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
  likes: number;
}

export interface ReadingProgress {
  userId: string;
  bookId: string;
  pagesRead: number;
  totalPages: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lastUpdated: string;
} 
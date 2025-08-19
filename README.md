# Book Club App

A social reading app that helps users discover books, track their reading progress, write reviews, and participate in book clubs.

## Features

- 📚 Browse and search books
- 👥 Join and manage book clubs
- ✍️ Write and read book reviews
- 📖 Track reading progress
- 👤 User profiles
- ⭐ Rating system
- ⚙️ Settings with data management

## Key Features Explained

### Book Management
- Browse and search through the book catalog
- View detailed book information
- Track reading progress
- Write and read reviews

### Social Features
- Join and create book clubs
- View member profiles
- Track club reading progress
- Participate in discussions

### User Features
- Personal reading list
- Reading progress tracking
- Review management
- Profile customization

### Settings & Data
- Reset app data to initial state
- Clear stored information
- Restore mock data
- Manage app preferences

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand (State Management)
- React Navigation
- AsyncStorage
- Expo Vector Icons

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Expo Go app (for testing on physical devices)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/charlyTochi/Book-Club.git
   cd BookClubApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical devices

## Project Structure

```
BookClubApp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── store/          # State management
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   ├── constants/      # App constants
│   └── data/          # Mock data
├── assets/            # Images, fonts, etc.
├── App.tsx           # App entry point
└── app.json         # Expo configuration
```

## Key Components

- `BookCard`: Displays book information in a card format
- `ClubCard`: Shows book club details
- `ReviewList`: Renders book reviews
- `Screen`: Base screen component with common styling
- `ReadingProgressCard`: Displays reading progress

## Screens

- `HomeScreen`: Main feed and book discovery
- `DiscoverScreen`: Search and explore books
- `MyBooksScreen`: Personal reading list and progress
- `ClubsScreen`: Book club management
- `ProfileScreen`: User profile
- `SettingsScreen`: App settings and data management

## State Management

Using Zustand for state management with the following stores:
- Books
- Users
- Book Clubs
- Reviews
- Reading Progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

See [EXPLANATION.md](./EXPLANATION.md) for detailed plans on:
- Backend integration
- Enhanced social features
- Performance optimization
- Scaling considerations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

## Acknowledgments

- Design inspiration from Goodreads and other reading apps
- Mock data based on popular books
- Icons from Expo Vector Icons

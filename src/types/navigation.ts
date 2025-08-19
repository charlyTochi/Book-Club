import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Main: undefined;
  BookDetails: { bookId: string };
  ClubDetails: { clubId: string };
  CreateReview: { bookId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  MyBooks: undefined;
  Clubs: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = BottomTabScreenProps<
  MainTabParamList,
  T
>; 
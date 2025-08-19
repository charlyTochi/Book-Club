import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import MyBooksScreen from '../screens/MyBooksScreen';
import ClubsScreen from '../screens/ClubsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import ClubDetailsScreen from '../screens/ClubDetailsScreen';
import CreateReviewScreen from '../screens/CreateReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Discover':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'MyBooks':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Clubs':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{ title: 'Discover' }}
      />
      <Tab.Screen 
        name="MyBooks" 
        component={MyBooksScreen}
        options={{ title: 'My Books' }}
      />
      <Tab.Screen 
        name="Clubs" 
        component={ClubsScreen}
        options={{ title: 'Clubs' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
      <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} />
      <Stack.Screen name="CreateReview" component={CreateReviewScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation; 
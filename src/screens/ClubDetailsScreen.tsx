import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store';
import { Screen } from '../components/Screen';
import { BookCard } from '../components/BookCard';

type Props = NativeStackScreenProps<RootStackParamList, 'ClubDetails'>;

const ClubDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { clubId } = route.params;
  const { bookClubs, books, users, currentUser } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const club = bookClubs.find(c => c.id === clubId);
  if (!club || !currentUser) return null;

  const currentBook = books.find(b => b.id === club.currentBook);
  const clubMembers = users.filter(user => club.members.includes(user.id));
  const isAdmin = club.adminId === currentUser.id;
  const isMember = club.members.includes(currentUser.id);

  const nextMeeting = club.meetingSchedule ? new Date() : null;
  const formattedNextMeeting = nextMeeting?.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Club Header */}
        <View style={styles.header}>
          <View style={styles.clubInfo}>
            <Text style={styles.clubName}>{club.name}</Text>
            <View style={styles.memberCount}>
              <Ionicons name="people" size={20} color="#666" />
              <Text style={styles.memberCountText}>{club.members.length} members</Text>
            </View>
            {isAdmin && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>Admin</Text>
              </View>
            )}
          </View>
          <Text style={styles.description}>{club.description}</Text>
        </View>

        {/* Current Book Section */}
        {currentBook && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Currently Reading</Text>
            <BookCard book={currentBook} />
          </View>
        )}

        {/* Meeting Schedule */}
        {club.meetingSchedule && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meeting Schedule</Text>
            <View style={styles.meetingInfo}>
              <Ionicons name="calendar" size={24} color="#6200ee" />
              <View style={styles.meetingDetails}>
                <Text style={styles.meetingSchedule}>{club.meetingSchedule}</Text>
                {formattedNextMeeting && (
                  <Text style={styles.nextMeeting}>Next meeting: {formattedNextMeeting}</Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Members Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Members</Text>
          <View style={styles.membersList}>
            {clubMembers.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <Image
                  source={{ uri: member.avatar }}
                  style={styles.memberAvatar}
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoadEnd={() => setIsImageLoading(false)}
                />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberUsername}>@{member.username}</Text>
                </View>
                {member.id === club.adminId && (
                  <View style={styles.adminTag}>
                    <Text style={styles.adminTagText}>Admin</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Club Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Club Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{club.members.length}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Date(club.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </Text>
              <Text style={styles.statLabel}>Created</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Weekly</Text>
              <Text style={styles.statLabel}>Meetings</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          {!isMember ? (
            <Pressable style={styles.joinButton}>
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={styles.joinButtonText}>Join Club</Text>
            </Pressable>
          ) : (
            <>
              <Pressable style={styles.actionButton}>
                <Ionicons name="chatbubbles" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Club Discussion</Text>
              </Pressable>
              {isAdmin && (
                <Pressable style={[styles.actionButton, styles.manageButton]}>
                  <Ionicons name="settings" size={20} color="#6200ee" />
                  <Text style={[styles.actionButtonText, styles.manageButtonText]}>
                    Manage Club
                  </Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  clubName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 12,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  memberCountText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  adminBadge: {
    backgroundColor: '#6200ee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  adminBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
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
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingDetails: {
    marginLeft: 12,
  },
  meetingSchedule: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nextMeeting: {
    fontSize: 14,
    color: '#666',
  },
  membersList: {
    gap: 12,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  memberUsername: {
    fontSize: 14,
    color: '#666',
  },
  adminTag: {
    backgroundColor: '#f0e6ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  adminTagText: {
    color: '#6200ee',
    fontSize: 12,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionsSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 24,
    gap: 12,
  },
  joinButton: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  actionButton: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  manageButton: {
    backgroundColor: '#f0e6ff',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  manageButtonText: {
    color: '#6200ee',
  },
});

export default ClubDetailsScreen; 
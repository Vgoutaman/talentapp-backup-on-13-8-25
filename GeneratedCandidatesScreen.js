import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const GeneratedCandidatesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { candidates, job_id } = route.params || {};

  const handleProfileClick = (candidate) => {
    const userId = candidate.user_id;
    navigation.navigate('CandidateDetailsScreen', {
      userId: userId,
    });
  };

  const handleChatClick = (candidate) => {
    Alert.alert(
      'Chat',
      `Do you want to start a chat with ${candidate.Name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            navigation.navigate('ChatScreen', { candidate }),
        },
      ],
      { cancelable: true }
    );
  };

  const renderCandidate = ({ item }) => (
    <LinearGradient
      colors={['#FFFFFF', '#F3F4F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <TouchableOpacity onPress={() => handleProfileClick(item)} style={styles.profileContainer}>
        <Text style={styles.name}>{item['Name']}</Text>
        <Text style={styles.details}>{item['Job Title']}</Text>
        <Text style={styles.location}>{item['Location']}</Text>
        <Text style={styles.subHeader}>Tap to view more details</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chatButton} onPress={() => handleChatClick(item)}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {job_id && <Text style={styles.jobIdText}>Job ID: {job_id}</Text>}
      {candidates && candidates.length > 0 ? (
        <FlatList
          data={candidates}
          renderItem={renderCandidate}
          keyExtractor={(item) => item.user_id.toString()}
        />
      ) : (
        <Text style={styles.noCandidatesText}>No candidates found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 14,
    backgroundColor: '#FFFFFF',
  },
  jobIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  profileContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#4A5568',
  },
  location: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  subHeader: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#2B6CB0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  noCandidatesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default GeneratedCandidatesScreen;
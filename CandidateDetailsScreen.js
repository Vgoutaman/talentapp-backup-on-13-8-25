import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { API_URL } from './config';

const CandidateDetailsScreen = ({ route }) => {
  const { userId } = route.params;
  const [profileData, setProfileData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getProfile.php?user_id=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setProfileData(data);
        setIsSaved(data.isSaved || false);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  const handleToggleSaveProfile = async () => {
    if (!profileData) {
      Alert.alert('Error', 'No profile data to modify');
      return;
    }

    const profilePayload = {
      action: isSaved ? 'unsave' : 'save', // Determine action based on current state
      name: profileData.Name,
      location: profileData.Location,
      job_title: profileData['Job Title'],
      portfolio: profileData.Portfolio,
      skills: profileData.Skills,
      experience: profileData.Experience,
      job_history: profileData['Job History'],
      social_media: profileData['Social Media'],
      user_id: userId,
      mobile: profileData.Mobile, // Add Mobile field
      industry: profileData.Industry, // Add Industry field
    };

    try {
      const response = await fetch(`${API_URL}/saveCandidate.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profilePayload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSaved(!isSaved); // Toggle save state
        Alert.alert('Success', result.success);
      } else {
        Alert.alert('Error', result.error || 'Failed to modify the profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while modifying the profile');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{profileData.Name || 'N/A'}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.text}>{profileData.Location || 'N/A'}</Text>

        <Text style={styles.label}>Job Title</Text>
        <Text style={styles.text}>{profileData['Job Title'] || 'N/A'}</Text>

        <Text style={styles.label}>Portfolio</Text>
        <Text style={styles.text}>{profileData.Portfolio || 'N/A'}</Text>

        <Text style={styles.label}>Skills</Text>
        <Text style={styles.text}>{profileData.Skills || 'N/A'}</Text>

        <Text style={styles.label}>Experience</Text>
        <Text style={styles.text}>{profileData.Experience || 'N/A'}</Text>

        <Text style={styles.label}>Job History</Text>
        <Text style={styles.text}>{profileData['Job History'] || 'N/A'}</Text>

        <Text style={styles.label}>Social Media</Text>
        {profileData['Social Media'] ? (
          <TouchableOpacity onPress={() => Linking.openURL(profileData['Social Media'])}>
            <Text style={styles.linkText}>{profileData['Social Media']}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>N/A</Text>
        )}

        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.text}>{profileData.Mobile || 'N/A'}</Text>

        <Text style={styles.label}>Industry</Text>
        <Text style={styles.text}>{profileData.Industry || 'N/A'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSaved && styles.dimButton]}
        onPress={handleToggleSaveProfile}
      >
        <Text style={styles.saveButtonText}>{isSaved ? 'Unsave Profile' : 'Save Profile'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 15,
  },
  linkText: {
    color: '#0073e6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 4,
  },
  dimButton: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default CandidateDetailsScreen;

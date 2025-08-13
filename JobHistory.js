import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { API_URL } from './config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JobHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/getJobs.php`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setJobs(data.data);
        } else {
          setErrorMessage(data.message || 'Failed to fetch jobs.');
        }
      } else {
        setErrorMessage('Failed to fetch jobs. Server returned an error.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching jobs.');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const formData = new FormData();
      formData.append('jobId', jobId); // Pass jobId as form data
  
      const response = await fetch(`${API_URL}/deleteJob.php`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Success', 'Job deleted successfully.');
        setJobs(jobs.filter((job) => job.id !== jobId)); // Remove the job from state
      } else {
        Alert.alert('Error', data.message || 'Failed to delete job.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while deleting the job.');
      console.error('Delete Error:', error);
    }
  };

  const confirmDelete = (jobId) => {
    Alert.alert(
      'Delete Job',
      'Are you sure you want to delete this job?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteJob(jobId) },
      ]
    );
  };

  const renderJob = ({ item }) => (
    <View style={styles.jobContainer}>
      <View style={styles.jobHeader}>
        <Icon name="work" size={20} color="#fff" />
        <Text style={styles.jobTitle}>{item.title}</Text>
      </View>
      <Text style={styles.companyName}>{item.company_name}</Text>
      <Text style={styles.location}>{`Location: ${item.job_location}`}</Text>
      <Text style={styles.requiredSkills}>{`Skills: ${item.skills}`}</Text>
      <Text style={styles.experienceLevel}>{`Experience: ${item.level}`}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/homepagebackground2.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJob}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.errorText}>No jobs posted yet.</Text>}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  jobContainer: {
    backgroundColor: '#f5f5f5', // Light grey background
    margin: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bdce31', // Light grey for header
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text for readability
    marginLeft: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  requiredSkills: {
    fontSize: 14,
    color: '#777',
  },
  experienceLevel: {
    fontSize: 14,
    color: '#777',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default JobHistory;

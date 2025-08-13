import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './config'; // Make sure API_URL is updated correctly

const PostJobDetailsScreen = () => {
  const [jobDetails, setJobDetails] = useState({
    'Company Name': '',
    Location: '',
    'Job Title': '',
    'Required Skills': '',
    'Experience Level': '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation(); // Initialize navigation

  const indianCities = [
    'New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Patna', 'Indore', 'Vadodara',
    'Chandigarh', 'Bhopal', 'Coimbatore', 'Kanpur', 'Nagpur', 'Visakhapatnam',
    'Madurai', 'Vijayawada', 'Ludhiana', 'Agra', 'Jammu', 'Noida', 'Faridabad',
    'Gurgaon', 'Rajkot', 'Mysore', 'Howrah', 'Meerut', 'Ranchi', 'Nashik', 'Dhanbad',
  ];

  const handleInputChange = (field, value) => {
    // Validate integer input for the Experience Level field
    if (field === 'Experience Level') {
      if (/^\d*$/.test(value)) { // Allow only numeric input
        setJobDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
      }
    } else {
      setJobDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
    }
  };

  const handlePostJob = async () => {
    const { 'Company Name': companyName, Location: location, 'Job Title': jobTitle, 'Required Skills': requiredSkills, 'Experience Level': experienceLevel } = jobDetails;
    const username = 'currentLoggedInUser'; // Replace this with the actual username from context or state

    if (!companyName || !location || !jobTitle || !requiredSkills || !experienceLevel) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      // Post the job details to the backend (postJob.php)
      const response = await fetch(`${API_URL}/postJob.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Company Name': companyName,
          Location: location,
          'Job Title': jobTitle,
          'Required Skills': requiredSkills,
          'Experience Level': experienceLevel,
          username: username, // Send the username
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setErrorMessage('');

        // Now, search for matching candidates in the candidateprofile table (searchCandidates.php)
        const searchResponse = await fetch(`${API_URL}/searchCandidates.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Location: location,
            'Experience Level': experienceLevel,
            'Required Skills': requiredSkills,
            'Job Title': jobTitle,
            username: username, // Send the username to filter out the poster's profile
          }),
        });

        const searchResult = await searchResponse.json();

        if (searchResult.status === 'success' && searchResult.candidates && searchResult.candidates.length > 0) {
          navigation.navigate('GeneratedCandidatesScreen', { candidates: searchResult.candidates });
        } else {
          setErrorMessage('No matching candidates found.');
        }
      } else {
        setErrorMessage(result.message || 'Failed to post job');
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing your request');
      console.error('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subHeader}>Provide information about the job to post:</Text>

          <View style={styles.formContainer}>
            {[
              { label: 'Company Name', field: 'Company Name', icon: 'business' },
              { label: 'Job Title', field: 'Job Title', icon: 'title' },
              { label: 'Required Skills', field: 'Required Skills', icon: 'build' },
              { label: 'Experience Level (years)', field: 'Experience Level', icon: 'accessibility' },
            ].map(({ label, field, icon }, index) => (
              <View key={index} style={styles.inputWrapper}>
                <Text style={styles.label}>
                  <MaterialIcons name={icon} size={20} color="#000000" /> {label}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={jobDetails[field]}
                  onChangeText={(text) => {
                    if (field === 'Experience Level') {
                      // Only allow numeric values for Experience Level
                      if (/^\d*$/.test(text)) {
                        handleInputChange(field, text);
                      }
                    } else {
                      handleInputChange(field, text);
                    }
                  }}
                  placeholderTextColor="#aaa"
                  keyboardType={field === 'Experience Level' ? 'numeric' : 'default'} // Numeric keyboard for Experience Level
                />
              </View>
            ))}

            {/* Add location bubble buttons */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>
                <MaterialIcons name="location-on" size={20} color="#000000" /> Location
              </Text>
              <View style={styles.locationButtons}>
                {indianCities.map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.locationButton,
                      jobDetails.Location === city && styles.selectedLocationButton,
                    ]}
                    onPress={() => handleInputChange('Location', city)}
                  >
                    <Text style={styles.locationButtonText}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          {/* Transparent Post Job Button */}
          <TouchableOpacity style={styles.button} onPress={handlePostJob}>
            <Text style={styles.buttonText}>Generate Candidates</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, paddingBottom: 10 },
  subHeader: { fontSize: 16, color: '#000000', marginBottom: 24, textAlign: 'center' },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 12,
  },
  inputWrapper: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  locationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  locationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#F0F0F0',
  },
  selectedLocationButton: {
    backgroundColor: '#4CAF50',
  },
  locationButtonText: {
    color: '#333',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: { color: '#000000', fontSize: 18, fontWeight: '600' },
  errorMessage: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PostJobDetailsScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './config';

const CandidateProfileScreen = ({ route }) => {
  const { candidateId, readOnly = false } = route.params || {};
  const [formData, setFormData] = useState({
    mobile: '',
    country_code: '+1', // Default country code
    name: '',
    location: '',
    job_title: '',
    portfolio: '',
    skills: '',
    experience: '',
    job_history: '',
    social_media: '',
    industry: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const countryCodes = [
    { label: 'United States (+1)', value: '+1' },
    { label: 'United Kingdom (+44)', value: '+44' },
    { label: 'India (+91)', value: '+91' },
    { label: 'Canada (+1)', value: '+1' },
    { label: 'Australia (+61)', value: '+61' },
    // Add more country codes as needed
  ];

  const industryOptions = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Transportation',
    'Construction',
    'Government',
  ];

  const locationOptions = [
    'Ahmedabad',
'Bangalore',
'Chennai',
'Delhi',
'Hyderabad',
'Kolkata',
'Mumbai',
'Pune',
'Jaipur',
'Lucknow',
'Surat',
'Kanpur',
'Nagpur',
'Visakhapatnam',
'Thiruvananthapuram',
'Bhopal',
'Patna',
'Indore',
'Vadodara',
'Coimbatore',
'Kochi',
'Madurai',
'Varanasi',
'Amritsar',
'Agra',
'Meerut',
'Nashik',
'Rajkot',
'Jabalpur',
'Jodhpur',
'Ranchi',
'Raipur',
'Guwahati',
'Chandigarh',
'Kota',
'Gwalior',
'Aurangabad',
'Dhanbad',
'Hubli-Dharwad',
'Mysore',
'Salem',
'Tiruchirappalli',
'Jammu',
'Dehradun',
'Bhubaneswar',
'Vijayawada',
'Warangal',
'Pondicherry',
'Noida',
'Faridabad',
'Ghaziabad',
'Gurgaon',
'Shimla',
'Panaji',
'Srinagar',
'Shillong',
'Gangtok',
'Imphal',
'Aizawl',
'Kohima',
'Itanagar',
'Dispur',
'Port Blair',
'Darjeeling',
'Margao',
'Thrissur',
'Anantapur',
'Kurnool',
'Nellore',
'Guntur',
'Karimnagar',
'Warangal',
'Nanded',
'Latur',
'Kolhapur',
'Solapur',
'Amravati',
'Ajmer',
'Aligarh',
'Bareilly',
'Moradabad',
'Rohtak',
'Hisar',
'Bikaner',
'Bhavnagar',
'Junagadh',
'Surendranagar',
'Jamnagar',
'Diu',
'Daman',
'Silvassa',
'Pune',
'Satara',
'Palghar',
'Ahmednagar',
'Nandurbar',
'Bhusawal',
'Ratnagiri',
'Sangli',
'Baramati',
'Ichalkaranji',
'Malegaon',
    // Add more locations as needed
  ];

  // Fetch candidate data from backend
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getCandidateProfile.php?candidateId=${candidateId}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          mobile: data.Mobile || '',
          country_code: data.CountryCode || '+1',
          name: data.Name || '',
          location: data.Location || '',
          job_title: data['Job Title'] || '',
          portfolio: data.Portfolio || '',
          skills: data.Skills || '',
          experience: data.Experience || '',
          job_history: data['Job History'] || '',
          social_media: data['Social Media'] || '',
          industry: data.Industry || '',
          lookingForJob: data.LookingForJob === 'Yes' ? 'Yes' : 'No',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [candidateId]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/storeCandidateProfile.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, candidateId }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile saved successfully!');
        setIsEditing(false); 
        fetchProfileData(); 
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Mobile</Text>
      <View style={styles.row}>
        <Picker
          selectedValue={formData.country_code}
          onValueChange={(value) => handleInputChange('country_code', value)}
          enabled={isEditing && !readOnly}
          style={styles.pickerSmall}
        >
          {countryCodes.map((code) => (
            <Picker.Item key={code.value} label={code.label} value={code.value} />
          ))}
        </Picker>
        <TextInput
          style={[styles.input, { flex: 1 }]} 
          placeholder="Enter mobile number"
          value={formData.mobile}
          onChangeText={(value) => handleInputChange('mobile', value)}
          editable={isEditing && !readOnly}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#e0e0e0' }]} 
        placeholder="Name"
        value={formData.name}
        editable={false} 
      />

      <Text style={styles.label}>Location</Text>
      <Picker
        selectedValue={formData.location}
        onValueChange={(value) => handleInputChange('location', value)}
        enabled={isEditing && !readOnly}
        style={styles.picker}
      >
        <Picker.Item label="Select Location" value="" />
        {locationOptions.map((location) => (
          <Picker.Item key={location} label={location} value={location} />
        ))}
      </Picker>

      <Text style={styles.label}>
  Industry
  <Text style={styles.subLabel}> (Current or Previous Working Industry)</Text>
</Text>
<Picker
  selectedValue={formData.industry}
  onValueChange={(value) => handleInputChange('industry', value)}
  enabled={isEditing && !readOnly}
  style={styles.picker}
>
  <Picker.Item label="Select Industry" value="" />
  {industryOptions.map((industry) => (
    <Picker.Item key={industry} label={industry} value={industry} />
  ))}
</Picker>

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job title"
        value={formData.job_title}
        onChangeText={(value) => handleInputChange('job_title', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Portfolio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter portfolio URL"
        value={formData.portfolio}
        onChangeText={(value) => handleInputChange('portfolio', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter skills (comma-separated)"
        value={formData.skills}
        onChangeText={(value) => handleInputChange('skills', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter years of experience (numeric only)"
        value={formData.experience}
        onChangeText={(value) => {
          if (/^\d*$/.test(value)) {
            handleInputChange('experience', value);
          } else {
            Alert.alert('Invalid Input', 'Please enter a numeric value for years of experience.');
          }
        }}
        editable={isEditing && !readOnly}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Job History</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe job history"
        value={formData.job_history}
        onChangeText={(value) => handleInputChange('job_history', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Social Media</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter social media links"
        value={formData.social_media}
        onChangeText={(value) => handleInputChange('social_media', value)}
        editable={isEditing && !readOnly}
      />
      {/* Looking for a job option */}
      <Text style={styles.label}>Looking for a Job</Text>
      <TouchableOpacity
        onPress={() => handleInputChange('lookingForJob', formData.lookingForJob === 'Yes' ? 'No' : 'Yes')}
        disabled={!isEditing || readOnly}
        style={[
          styles.toggleContainer,
          formData.lookingForJob === 'Yes' ? styles.activeToggle : styles.inactiveToggle,
        ]}
      >
        <Text style={styles.toggleButtonText}>{formData.lookingForJob}</Text>
      </TouchableOpacity>
      {!readOnly && (
        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSubmit : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2d2d44',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#2d2d44',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  toggleButton: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  inactiveToggle: {
    backgroundColor: '#dc3545', // Red color for 'No'
    borderColor: '#dc3545',
  },
  activeToggle: {
    backgroundColor: '#0073e6',
    borderColor: '#0073e6',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#2d2d44',
    fontWeight: '600',
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  pickerSmall: {
    width: 100,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0073e6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CandidateProfileScreen;
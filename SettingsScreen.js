import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from './config';

const SettingsScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/getUserData.php`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setUsername(data.user.username || '');
          setEmail(data.user.email || '');
          setPassword(data.user.password || '');
          setProfilePic(data.user.profile_pic || null);
        } else {
          setErrorMessage(data.message || 'Failed to load user data.');
        }
      } else {
        setErrorMessage('Failed to fetch user data. Server returned an error.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching user data.');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
        Alert.alert('Error', 'Something went wrong while picking the image.');
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic(response.assets[0].uri); // You may need to upload the image and get a URL for the backend.
      }
    });
  };

  const handleSaveChanges = async () => {
    if (!newUsername && !newEmail && !profilePic && !password) {
      Alert.alert('No Changes', 'No changes were made to save.');
      return;
    }

    try {
      const formData = {
        username: newUsername || username,
        email: newEmail || email,
        password: password,
        profile_pic: profilePic || '',
      };

      setLoading(true);

      const response = await fetch(`${API_URL}/updateUserData.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        Alert.alert('Success', 'Your changes have been saved successfully.');
        setUsername(formData.username);
        setEmail(formData.email);
        setPassword(formData.password);
        setProfilePic(formData.profile_pic);
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to save changes.');
      }
    } catch (error) {
      console.error('Save Changes Error:', error);
      Alert.alert('Error', 'An error occurred while saving changes.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Picture */}
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage} disabled={!isEditing}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.profileImage} />
              ) : (
                <View style={styles.emptyProfileImage}></View>
              )}
            </TouchableOpacity>
            {isEditing && (
              <Text style={styles.editText}>Tap to change profile picture</Text>
            )}
          </View>

          {/* Username */}
          <View style={styles.card}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={newUsername || username}
              onChangeText={setNewUsername}
              editable={isEditing}
            />
          </View>

          {/* Email */}
          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={newEmail || email}
              onChangeText={setNewEmail}
              editable={isEditing}
            />
          </View>

          {/* Change Password */}
          <View style={styles.card}>
            <Text style={styles.label}>Change Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, !isEditing && styles.disabledInput]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={isEditing}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#444"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Edit Button */}
          {!isEditing ? (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveChanges}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          )}

          {/* Logout Button */}
          
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20, alignItems: 'center' },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  emptyProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
  },
  editText: {
    marginTop: 10,
    fontSize: 14,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  editButton: { backgroundColor: '#007BFF' },
  saveButton: { backgroundColor: '#4CAF50' },
  logoutButton: { backgroundColor: '#FF6347' },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#FFF' },
  errorText: { fontSize: 16, color: '#FF6347', marginBottom: 20 },
});

export default SettingsScreen;

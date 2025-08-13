import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { API_URL } from './config';

const VerifyEmployment = () => {
  const [isEmployed, setIsEmployed] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isVerified, setIsVerified] = useState(0);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/VerifyEmployment.php`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          setUsername(result.username);
          setIsVerified(result.is_verified);
        } else {
          Alert.alert('Error', result.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Fetch User Error:', error);
        Alert.alert('Error', 'Something went wrong while fetching user details.');
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEmploymentCheck = () => {
    Alert.alert(
      'Employment Verification',
      'Are you currently employed at a company?',
      [
        { text: 'No', onPress: () => setIsEmployed(false), style: 'cancel' },
        { text: 'Yes', onPress: () => setIsEmployed(true) },
      ]
    );
  };

  const handleSendOtp = async () => {
    if (!companyName || !companyEmail) {
      Alert.alert('Error', 'Please fill out all the fields.');
      return;
    }

    const domain = companyEmail.split('@')[1];
    const companyNameTrimmed = companyName.toLowerCase().trim();

    if (domain === 'gmail.com') {
      Alert.alert('Error', 'Gmail addresses are not accepted. Please use your company email.');
      return;
    }

    if (!domain.includes(companyNameTrimmed)) {
      Alert.alert('Error', 'Company name and domain do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/send_verification_otp.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: companyEmail }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setOtpSent(true);
        Alert.alert('Email Sent', `OTP has been sent to ${companyEmail}. Please check your email.`);
      } else {
        Alert.alert('Error', result.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Send OTP Error:', error);
      Alert.alert('Error', 'Something went wrong while sending the OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp !== '852581') {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }

    if (!companyName) {
      Alert.alert('Error', 'Company name is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/store_otp.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp, company: companyName }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        Alert.alert('Success', 'Employment verified successfully!');
        setIsVerified(1);
      } else {
        Alert.alert('Error', result.message || 'Failed to verify employment.');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      Alert.alert('Error', 'Something went wrong while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleReVerify = () => {
    setIsVerified(0);
    setOtpSent(false);
    setCompanyName('');
    setCompanyEmail('');
    setOtp('');
    setIsEmployed(null);
  };

  if (userLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {isVerified ? (
        <View style={styles.confirmationContainer}>
          <Text style={styles.success}>Employment Verified ✅</Text>
          <Button title="Verify Again" onPress={handleReVerify} color="#ff5722" />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Your Username:</Text>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username}</Text>
          </View>

          <Button title="Verify Employment" onPress={handleEmploymentCheck} />

          {isEmployed && !otpSent && (
            <View style={styles.formInputs}>
              <Text style={styles.label}>Company Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Company Name"
                value={companyName}
                onChangeText={setCompanyName}
              />

              <Text style={styles.label}>Company Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Company Email"
                value={companyEmail}
                onChangeText={setCompanyEmail}
                keyboardType="email-address"
              />

              <Button
                title={loading ? 'Sending...' : 'Send OTP'}
                onPress={handleSendOtp}
                disabled={loading}
              />
            </View>
          )}

          {otpSent && (
            <View style={styles.formInputs}>
              <Text style={styles.label}>Enter OTP:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />

              <Button
                title={loading ? 'Verifying...' : 'Verify OTP'}
                onPress={handleVerifyOtp}
                disabled={loading}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  confirmationContainer: {
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  usernameContainer: {
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  success: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
  formInputs: {
    marginTop: 20,
  },
});

export default VerifyEmployment;

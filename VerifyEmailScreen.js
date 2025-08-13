import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from './config';

const VerifyEmailScreen = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { token } = route.params; // Get the token from navigation params
        const response = await fetch(`${API_URL}/verify_email.php?token=${token}`, {
          method: 'GET',
        });

        const result = await response.json();

        if (result.status === 'success') {
          setStatus('success');
        } else {
          setStatus('error');
          Alert.alert('Error', result.message || 'Verification failed.');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        setStatus('error');
        Alert.alert('Error', 'Something went wrong during email verification.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>Verifying email...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {status === 'success' ? (
        <Text style={[styles.message, styles.success]}>Email verified successfully!</Text>
      ) : (
        <Text style={[styles.message, styles.error]}>Failed to verify email.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});

export default VerifyEmailScreen;

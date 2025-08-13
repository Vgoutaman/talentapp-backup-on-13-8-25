import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen1'); // Navigate to the first welcome screen
    }, 3000); // 3-second delay for the splash screen

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#202A44', '#202A44']} // Navy Blue background
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* App Name */}
      <Text style={styles.appName}>TalentApp</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>Find Talent Instantly</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default SplashScreen;

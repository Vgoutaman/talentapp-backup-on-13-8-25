import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginDone = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // For fade-in effect

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate away after 2 seconds
    const timeout = setTimeout(() => {
      navigation.replace('HomePage'); // Replace with your target screen
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>Login Successful</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08A045',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginDone;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PrivacyPolicyScreen = () => {
  return (
    <LinearGradient colors={['#0D3B66', '#1D5789']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        

        {/* Policy Content */}
        <View style={styles.policyContent}>
          <Text style={styles.subtitle}>Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Talent App! This Privacy Policy outlines the types of personal information that is collected,
            used, and shared by our application.
          </Text>

          <Text style={styles.subtitle}>Information Collection</Text>
          <Text style={styles.paragraph}>
            We collect information from you when you use our services, including personal details such as name, email,
            phone number, etc.
          </Text>

          <Text style={styles.subtitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            The information we collect is used to improve our services, provide customer support, and send you
            important updates.
          </Text>

          <Text style={styles.subtitle}>Information Sharing</Text>
          <Text style={styles.paragraph}>
            We do not share your personal information with third parties without your consent, except where required
            by law.
          </Text>

          <Text style={styles.subtitle}>Security</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your personal information and ensure it is
            securely stored.
          </Text>

          <Text style={styles.subtitle}>Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, modify, or delete your personal data at any time. Please contact us for
            assistance.
          </Text>

          <Text style={styles.subtitle}>Changes to the Policy</Text>
          <Text style={styles.paragraph}>
            We may update this privacy policy from time to time. We will notify you of any significant changes.
          </Text>

          <Text style={styles.subtitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about this Privacy Policy, please reach out to us at{' '}
            <Text style={styles.contactInfo}>contact@talentapp.com</Text>.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  policyContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D3B66',
    marginTop: 15,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    lineHeight: 24,
  },
  contactInfo: {
    color: '#1D5789',
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;

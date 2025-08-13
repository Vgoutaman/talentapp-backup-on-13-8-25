import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Howto = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        

        {/* Terms Content */}
        <View style={styles.termsContent}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Talent App. By using our application, you agree to comply with and be bound by the following
            terms and conditions. Please read them carefully.
          </Text>

          <Text style={styles.sectionTitle}>2. User Accounts</Text>
          <Text style={styles.paragraph}>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. Please notify us immediately of any unauthorized use.
          </Text>

          <Text style={styles.sectionTitle}>3. Use of Services</Text>
          <Text style={styles.paragraph}>
            You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of,
            restrict, or inhibit anyone else's use of the platform.
          </Text>

          <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, trademarks, logos, and intellectual property displayed on Talent App belong to their respective
            owners. You may not copy, modify, or distribute any content without prior consent.
          </Text>

          <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            Talent App is not liable for any damages resulting from the use or inability to use our services. We do not
            guarantee the accuracy or completeness of the content provided on the platform.
          </Text>

          <Text style={styles.sectionTitle}>6. Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend or terminate your access to the platform at any time without prior notice if
            you breach these terms.
          </Text>

          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We may update these terms and conditions from time to time. It is your responsibility to review the latest
            version periodically.
          </Text>

          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about these terms, please contact us at{' '}
            <Text style={styles.contactInfo}>terms@talentapp.com</Text>.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D3B66',
    textAlign: 'center',
    marginVertical: 20,
  },
  termsContent: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D3B66',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 10,
  },
  contactInfo: {
    color: '#1D5789',
    fontWeight: 'bold',
  },
});

export default Howto;

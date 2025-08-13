import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpSupportScreen = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: ' How do I post a job on the app?',
      answer: ' To post a job, simply create an employer account, log in, and fill out the job description, requirements, and location. Once submitted, our app will instantly match you with suitable candidates.',
    },
    {
      id: 2,
      question: 'How quickly can I expect to find candidates for my job post?',
      answer: 'Our app shows suitable candidates immediately after you post the job, helping you connect with potential hires right away.',
    },
    {
      id: 3,
      question: 'Can I filter candidates based on specific criteria?',
      answer: 'Yes! Our app allows you to filter candidates based on skills, experience, location, and other relevant criteria to ensure you find the best match.',
    },
    {
        id: 4,
        question: 'How do I contact candidates after they match with my job post?',
        answer: 'Once candidates are matched with your job post, you can directly message them through the app to discuss the position further.',
      },
  ];

  const handleFAQToggle = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* FAQs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity
                onPress={() => handleFAQToggle(faq.id)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Icon
                  name={
                    expandedFAQ === faq.id ? 'expand-less' : 'expand-more'
                  }
                  size={24}
                  color="#051367"
                />
              </TouchableOpacity>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Contact Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:gautambusiness123@gmail.com')}
          >
            <Icon name="email" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Email Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('tel:8525814877')}
          >
            <Icon name="call" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Call Support</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Support Section */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => alert('Chat Support Coming Soon!')}
        >
          <Icon name="chat" size={24} color="#FFF" />
          <Text style={styles.chatButtonText}>Chat with Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051367',
    padding: 20,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#051367',
    marginBottom: 10,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    color: '#333',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#051367',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  contactButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
  },
  chatButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HelpSupportScreen;

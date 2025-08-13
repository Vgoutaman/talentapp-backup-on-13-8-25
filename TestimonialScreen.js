import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from './config'; // Update with the API URL

const TestimonialScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${API_URL}/VerifyEmployment.php`);
        const result = await response.json();
        if (response.ok && result.status === 'success') {
          setName(result.username || ''); // Assuming 'username' is the key in the response
        } else {
          console.error('Error fetching username:', result.message);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/get_testimonials.php`);
        const result = await response.json();
        if (response.ok && result.status === 'success') {
          setTestimonials(result.testimonials);
        } else {
          Alert.alert('Error', result.message || 'Failed to load testimonials.');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        Alert.alert('Error', 'Something went wrong while fetching testimonials.');
      }
    };

    fetchUsername();
    fetchTestimonials();
  }, []);

  const handleSubmit = async () => {
    if (!name || !feedback) {
      Alert.alert('Error', 'Please provide your name and feedback.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/submit_testimonial.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          feedback,
        }),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setFeedback('');
        Alert.alert('Success', 'Thank you for your feedback!');
      } else {
        Alert.alert('Error', result.message || 'Failed to submit your feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Something went wrong while submitting your feedback.');
    }
  };

  return (
    <LinearGradient colors={['#F5F7FA', '#E4E7EB']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        

        {/* Testimonials */}
        {testimonials.map((testimonial) => (
          <View key={testimonial.id} style={styles.testimonialCard}>
            <Image source={{ uri: testimonial.image }} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <Text style={styles.authorText}>— {testimonial.name}</Text>
            </View>
          </View>
        ))}

        {/* Feedback Form */}
        <Text style={styles.formTitle}>Share Your Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          editable={false} // Prevent editing fetched username
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Feedback"
          placeholderTextColor="#888"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient colors={['#1E88E5', '#1565C0']} style={styles.submitButtonGradient}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E88E5',
    textAlign: 'center',
    marginBottom: 20,
  },
  testimonialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderColor: '#E4E7EB',
    borderWidth: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#E4E7EB',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 8,
  },
  submitButtonGradient: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestimonialScreen;

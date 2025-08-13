import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DocumentPicker } from 'react-native-document-picker'; // React Native Document Picker

// Custom Button Component for Progression
const ProgressionButton = ({ title, onPress, isActive }) => (
  <TouchableOpacity 
    style={[styles.progressButton, isActive && styles.activeButton]} 
    onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const CandidateDetailsScreen1 = () => {
  const [resume, setResume] = useState(null); // To store resume file
  const [reason, setReason] = useState(''); // To store the reason for hiring

  // Function to pick a resume file
  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Any type of file
      });

      setResume(result.uri); // Set the picked file URI
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the document picker');
      } else {
        console.error('Error picking the file', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Curve */}
      <View style={styles.header}>
        <View style={styles.curveHeader}>
          <Text style={styles.headerText}>Upload Resume</Text>
        </View>

        {/* Progression Buttons */}
        <View style={styles.progressionButtonsContainer}>
          {['Step 1'].map((step, index) => (
            <ProgressionButton 
              key={index} 
              title={step} 
              onPress={() => console.log(`${step} pressed`)} 
              isActive={index === 0} // Example, activate first button
            />
          ))}
        </View>
      </View>

      {/* Candidate Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Upload Resume</Text>
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleResumeUpload}
        >
          <Text style={styles.uploadButtonText}>
            {resume ? 'Resume Uploaded' : 'Choose Resume'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Why should we hire you?</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Explain why you are a good fit for the role"
          value={reason}
          onChangeText={setReason}
          multiline
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  curveHeader: {
    backgroundColor: '#6200EE',
    paddingTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  progressionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  progressButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#3700B3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

export default CandidateDetailsScreen1;

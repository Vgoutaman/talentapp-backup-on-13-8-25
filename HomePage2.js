import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const suggestions = [
  { text: 'Discover top candidates in marketing', icon: 'work' },
  { text: 'Discover developers', icon: 'code' },
  { text: 'Discover designers', icon: 'brush' },
  { text: 'Find your next top hire', icon: 'star' },
];

const HomePage2 = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);  // Track button state
  const fadeAnim = new Animated.Value(1);

  const handleLoginClick = () => {
    console.log("Login button clicked!");  // Debugging line to check click event
    setIsButtonClicked(true);  // Set button clicked state
    setTimeout(() => {
      navigation.navigate('Login');  // Navigate to LoginPage after a delay
    }, 500);  // Optional delay for visual effect
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
  
    return () => clearInterval(interval);
  }, []); // Empty dependency array, don't include fadeAnim here

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Static Header with Login Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.loginButton,
            isButtonClicked && styles.loginButtonClicked,  // Apply style change on click
          ]}
          onPress={handleLoginClick}
          disabled={isButtonClicked}  // Disable the button while it's clicked
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../assets/homepagebackground2.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Dynamic Auto-Switching Container */}
          <View style={styles.dynamicContainer}>
            <Icon
              name={suggestions[currentIndex].icon}
              size={36}
              color="#000000"
              style={styles.dynamicIcon}
            />
            <Text style={styles.dynamicText}>
              {suggestions[currentIndex].text}
            </Text>
          </View>

          {/* Upcoming Events Section */}
          <View style={styles.eventsContainer}>
            <Text style={styles.sectionHeader}>Get started</Text>
            <View style={styles.imageRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Image
                  source={require('../assets/postjob.png')}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Image
                  source={require('../assets/jobhistory.png')}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Who's Using TalentApp Section */}
          <View style={styles.whoIsUsingContainer}>
            <Text style={styles.sectionHeader}>Who's Using TalentApp?</Text>
            <View style={styles.glassCardContainer}>
              <View style={styles.glassCard}>
                <Text style={styles.glassCardTitle}>Students & Professionals</Text>
                <Text style={styles.glassCardDescription}>
                  Unlock your potential: compete, build profile, grow and get hired!
                </Text>
              </View>
              <View style={styles.glassCard}>
                <Text style={styles.glassCardTitle}>Companies & Recruiters</Text>
                <Text style={styles.glassCardDescription}>
                  Discover right talent: Hire, engage, and brand like never before.
                </Text>
              </View>
              <View style={styles.glassCard}>
                <Text style={styles.glassCardTitle}>Colleges</Text>
                <Text style={styles.glassCardDescription}>
                  Bridge academic and industry: Empower students with real world industries.
                </Text>
              </View>
            </View>
          </View>

          {/* For You Section */}
          <View style={styles.forYouContainer}>
            <Text style={styles.sectionHeader}>For You</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Image
                  source={require('../assets/savedcandidatebutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Image
                  source={require('../assets/openchatbutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: width * 0.05 },
  dynamicContainer: {
    alignItems: 'center',
    marginVertical: height * 0.02,  // Reduced the margin to close the gap
    padding: height * 0.03,
    backgroundColor: '#ecff54',
    opacity: 0.85,
  },
  dynamicIcon: { marginBottom: height * 0.01 },
  dynamicText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: height * 0.01,
    backgroundColor: '#FFFFFF',
    zIndex: 1,  // Ensure header stays on top
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    opacity: 1,  // Normal state opacity
    transition: 'all 0.3s',  // Smooth transition on hover/click
  },
  loginButtonClicked: {
    backgroundColor: '#4CAF50', // Change to green when clicked
    opacity: 0.7, // Make the button slightly transparent on click
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsContainer: { marginTop: height * 0.03 },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  eventImage: {
    width: width * 0.43,
    height: height * 0.2,
    borderRadius: 10,
  },
  whoIsUsingContainer: { marginTop: height * 0.03 },
  glassCardContainer: { marginTop: height * 0.02 },
  glassCard: {
    marginBottom: height * 0.02,
    padding: height * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#808080',
  },
  glassCardTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#000000',
  },
  glassCardDescription: {
    fontSize: width * 0.035,
    color: '#808080',
    marginTop: height * 0.01,
  },
  forYouContainer: { marginTop: height * 0.03 },
  sectionHeader: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: height * 0.02,
  },
  forYouButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: width * 0.04,
    width: width * 0.6,
  },
  buttonImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
  },
});

export default HomePage2;

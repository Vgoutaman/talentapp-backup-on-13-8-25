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
import { API_URL } from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const suggestions = [
  { text: 'Discover top candidates in marketing', icon: 'work' },
  { text: 'Discover developers', icon: 'code' },
  { text: 'Discover designers', icon: 'brush' },
  { text: 'Find your next top hire', icon: 'star' },
];

const HomePage = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${API_URL}/VerifyEmployment.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          setUsername(result.username || 'User');
        } else {
          Alert.alert('Error', result.message || 'Failed to fetch username.');
        }
      } catch (error) {
        console.error('Fetch Username Error:', error);
        Alert.alert('Error', 'Something went wrong while fetching the username.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

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
  }, [fadeAnim]);

 


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Static Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={() => navigation.navigate('HamburgerMenu')}
        >
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{`Hii, ${username}`}</Text>
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Icon name="person" size={30} color="#000" />
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
              color="#000000" // Darker icon color for contrast
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
                onPress={() => navigation.navigate('PostJobDetailsScreen')}
              >
                <Image
                  source={require('../assets/postjob.png')}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CandidateProfileScreen')}
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
                onPress={() => navigation.navigate('SavedCandidatesScreen')}
              >
                <Image
                  source={require('../assets/savedcandidatebutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('ChatBoxScreen')}
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
    marginVertical: height * 0.03,
    padding: height * 0.03,
    borderRadius: 0,
    backgroundColor: '#ecff54', // Keeps the vibrant color
    opacity: 0.85,
  },
  dynamicIcon: { marginBottom: height * 0.01 },
  dynamicText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000000', // Darker text color for contrast
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10, // Ensure header stays above other content
    elevation: 5, // Adds shadow for Android
  },
  menuIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1, // Pushes the title to take remaining space
  },
  eventsContainer: { marginTop: height * 0.03 },
  buttonImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  eventImage: {
    width: width * 0.43,  // Adjust width as necessary
    height: height * 0.2,  // Adjust height as necessary
    borderRadius: 10,
  },
  whoIsUsingContainer: { marginTop: height * 0.03 },
  glassCardContainer: {
    marginTop: height * 0.02,
  },
  glassCard: {
    marginBottom: height * 0.02,
    padding: height * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#808080',
    paddingLeft: width * 0.05, // Added padding to the left
    alignItems: 'flex-start', // Align text to the left
  },
  glassCardTitle: {
    fontSize: width * 0.04,
    color: '#000000', // Changed to black for better visibility on white background
    fontWeight: 'bold',
    textAlign: 'left', // Align the title to the left
    width: '100%',
  },
  glassCardDescription: {
    fontSize: width * 0.035,
    color: '#808080', // Changed to black for better visibility on white background
    textAlign: 'left', // Align the description to the left
    marginTop: height * 0.01,
    width: '100%',
  },
  forYouContainer: { marginTop: height * 0.03 },
  sectionHeader: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333333', // Dark text for headers
    marginBottom: height * 0.02,
  },
  forYouButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: width * 0.04,
    width: width * 0.6,
  },
});

export default HomePage;

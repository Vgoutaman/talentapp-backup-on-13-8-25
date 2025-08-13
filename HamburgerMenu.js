import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HamburgerMenu = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const toggleDropdown = (section) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const images = [
    require('../assets/1233.png'),
    require('../assets/123.png'),
    require('../assets/12333.png'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        {/* Header */}
        

        {/* Dynamic Images */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={images[currentImageIndex]}
            style={[styles.image, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuItems}>
          {/* Testimonial */}
          <TouchableOpacity
            onPress={() => handleNavigate('TestimonialScreen')}
            style={styles.menuItem}
          >
            <Icon name="star" size={20} color="#051367" />
            <Text style={styles.menuText}>Testimonials</Text>
          </TouchableOpacity>

          {/* Contact Us */}
          <TouchableOpacity
            onPress={() => toggleDropdown('ContactUs')}
            style={styles.menuItem}
          >
            <Icon name="mail" size={20} color="#051367" />
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>

          {dropdownVisible['ContactUs'] && (
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>Email: contact@talentapp.com</Text>
              <Text style={styles.dropdownText}>Phone: +1 (123) 456-7890</Text>
              <Text style={styles.dropdownText}>Address: 123 Talent St, City, Country</Text>
            </View>
          )}

          {/* Verify Employment */}
          <TouchableOpacity
            onPress={() => handleNavigate('VerifyEmployment')}
            style={styles.menuItem}
          >
            <Icon name="verified" size={20} color="#051367" />
            <Text style={styles.menuText}>Verify Employment</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Talent App | Designed with ❤️</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerContainer: {
    backgroundColor: '#051367',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  menuItems: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
    color: '#051367',
    marginLeft: 15,
  },
  dropdownContent: {
    backgroundColor: '#F7F7F7',
    paddingLeft: 40,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#F7F7F7',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default HamburgerMenu;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsPage = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const toggleSwitch = (setter) => {
    setter((previousState) => !previousState);
  };

  const settingsOptions = [
    {
      title: 'Notifications',
      icon: 'notifications',
      type: 'toggle',
      value: notificationsEnabled,
      onValueChange: () => toggleSwitch(setNotificationsEnabled),
    },
    {
      title: 'Dark Mode',
      icon: 'brightness-6',
      type: 'toggle',
      value: darkModeEnabled,
      onValueChange: () => toggleSwitch(setDarkModeEnabled),
    },
    {
      title: 'Language',
      icon: 'language',
      action: () => navigation.navigate('LanguageSettings'),
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      action: () => navigation.navigate('PrivacyPolicyScreen'),
    },
    {
      title: 'Terms & Conditions',
      icon: 'gavel',
      action: () => navigation.navigate('howto'),
    },
    {
      title: 'Help & Support',
      icon: 'help',
      action: () => navigation.navigate('HelpSupportScreen'),
    },
    {
      title: 'About Us',
      icon: 'info',
      action: () => navigation.navigate('AboutUsScreen'),
    },
    {
      title: 'Logout',
      icon: 'logout',
      action: () => navigation.navigate('Login'),
      style: styles.logoutButton, // Add custom style for logout
      textStyle: styles.logoutText, // Custom text style
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {settingsOptions.map((item, index) => (
          <View
            key={index}
            style={[
              styles.optionContainer,
              item.style ? item.style : {}, // Apply custom styles if provided
            ]}
          >
            <TouchableOpacity
              onPress={item.action}
              disabled={item.type === 'toggle'}
              style={styles.optionButton}
            >
              <Icon name={item.icon} size={24} color="#051367" style={styles.icon} />
              <Text
                style={[
                  styles.optionText,
                  item.textStyle ? item.textStyle : {}, // Apply custom text styles if provided
                ]}
              >
                {item.title}
              </Text>
              {item.type === 'toggle' ? (
                <Switch
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                  thumbColor={item.value ? '#FFF' : '#FFF'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={item.onValueChange}
                  value={item.value}
                />
              ) : (
                <Icon name="chevron-right" size={24} color="#888" />
              )}
            </TouchableOpacity>
          </View>
        ))}
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
  scrollContainer: {
    padding: 10,
  },
  optionContainer: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#051367',
  },
  logoutButton: {
    backgroundColor: '#FBE9E7', // Light red background
    borderWidth: 1,
    borderColor: '#D32F2F', // Red border
  },
  logoutText: {
    color: '#D32F2F', // Red text for Logout
    fontWeight: 'bold',
  },
});

export default SettingsPage;

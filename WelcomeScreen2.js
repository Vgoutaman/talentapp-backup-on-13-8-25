import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const WelcomeScreen2 = ({ navigation }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(1.5, { duration: 600 });
  }, [scale]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    width: scale.value === 1.5 ? 24 : 12,
    borderRadius: scale.value === 1.5 ? 12 : 6,
  }));

  return (
    <ImageBackground
      source={require('../assets/welcomescreenbackground.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('HomePage2')}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.headline}>How We Help You</Text>
        <Text style={styles.description}>
          TalentMatch simplifies your hiring with quick tools and a user-friendly experience tailored for SMBs.
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotInactive]} />
          <Animated.View
            style={[styles.progressDot, styles.progressDotActive, animatedDotStyle]}
          />
          <View style={[styles.progressDot, styles.progressDotInactive]} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('WelcomeScreen3')}
          style={styles.nextButtonContainer}
        >
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF']}
            style={[styles.nextButton, { borderWidth: 1, borderColor: '#08A045' }]}
          >
            <Text style={[styles.nextButtonText, { color: '#08A045' }]}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10, // Increase touchable area
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Adds a subtle background for better visibility
    borderRadius: 20, // Optional: Rounded corners for the touchable area
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F6FB',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F6FB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  headline: {
    fontSize: 36,
    fontWeight: '700',
    color: '#F3F6FB',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    color: '#F3F6FB',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    height: 4,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  progressDotActive: {
    backgroundColor: '#08A045',
  },
  progressDotInactive: {
    backgroundColor: '#B0C4DE',
    width: 12,
  },
  nextButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#08A045',
    textAlign: 'center',
  },
});

export default WelcomeScreen2;

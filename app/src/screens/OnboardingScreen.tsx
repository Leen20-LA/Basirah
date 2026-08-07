import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Wind, Sparkles, ChevronLeft } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const OnboardingScreen = () => {
  const { onboardingStep, setOnboardingStep, setView } = useApp();

  return (
    <View style={styles.onboardingContainer}>
      <View style={styles.onboardingHeader}>
        {onboardingStep > 0 ? (
          <TouchableOpacity onPress={() => setOnboardingStep(p => p - 1)}>
            <Text style={styles.skipText}>رجوع</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 40 }} />}
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((step) => (
            <View key={step} style={[styles.dot, onboardingStep === step ? styles.activeDot : null]} />
          ))}
        </View>
        {onboardingStep < 2 ? (
          <TouchableOpacity onPress={() => setView('login')}>
            <Text style={styles.skipText}>تخطي</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 40 }} />}
      </View>

      <View style={styles.onboardingCenter}>
        <View style={styles.onboardingIconCircle}>
          {onboardingStep === 0 && <View style={styles.pulseInnerDot} />}
          {onboardingStep === 1 && <Wind color="#557A69" size={32} />}
          {onboardingStep === 2 && <Sparkles color="#D29B52" size={32} />}
        </View>
        <Text style={styles.onboardingTitle}>
          {onboardingStep === 0 ? 'كل شيء يبدأ بفكرة...' : onboardingStep === 1 ? 'اكتب كما تفكر... فقط.' : 'دع بصيرة يساعدك على الوضوح.'}
        </Text>
      </View>

      <View style={styles.onboardingFooter}>
        <TouchableOpacity 
          style={styles.primaryBtnFull}
          onPress={() => onboardingStep < 2 ? setOnboardingStep(p => p + 1) : setView('login')}
        >
          {onboardingStep < 2 ? <ChevronLeft color="#FFF" size={20} /> : <Sparkles color="#D8D2C2" size={20} />}
          <Text style={styles.primaryBtnFullText}>{onboardingStep < 2 ? 'المتابعة' : 'ابدأ'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
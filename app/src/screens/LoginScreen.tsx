import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const LoginScreen = () => {
  const { loginEmail, setLoginEmail, setView } = useApp();
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCenter}>
        <View style={styles.loginIconCircle}>
          <View style={styles.pulseInnerDotSmall} />
        </View>
        <Text style={styles.loginTitle}>مرحباً بك في بصيرة</Text>
        <Text style={styles.loginSubTitle}>مساحتك الهادئة للسكينة والوضوح</Text>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.input}
            value={loginEmail}
            onChangeText={setLoginEmail}
            placeholder="أدخل بريدك الإلكتروني"
            placeholderTextColor="#A29C91"
            keyboardType="email-address"
            textAlign="right"
          />
          <TouchableOpacity style={styles.primaryBtnFull} onPress={() => setView('editor')}>
            <Text style={styles.primaryBtnFullText}>تسجيل الدخول</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtnFull} onPress={() => setView('editor')}>
            <Text style={styles.secondaryBtnFullText}>المتابعة كزائر</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tertiaryBtnFull} onPress={() => setShowComingSoon(true)}>
            <Text style={styles.tertiaryBtnFullText}>إنشاء حساب جديد</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footerText}>بصيرة • أفكارك آمنة وبخصوصية تامة</Text>

      <Modal transparent animationType="fade" visible={showComingSoon}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowComingSoon(false)}>
              <X color="#7A756C" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>قريباً</Text>
            <Text style={styles.modalSubTitle}>ميزة إنشاء حساب جديد ستتوفر قريباً</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowComingSoon(false)}>
              <Text style={styles.primaryBtnText}>حسناً</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

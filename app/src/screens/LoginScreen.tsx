import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const LoginScreen = () => {
  const { loginEmail, setLoginEmail, setView } = useApp();

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
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            textAlign="right"
          />
          <TouchableOpacity style={styles.primaryBtnFull} onPress={() => setView('editor')}>
            <Text style={styles.primaryBtnFullText}>تسجيل الدخول</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtnFull} onPress={() => setView('editor')}>
            <Text style={styles.secondaryBtnFullText}>المتابعة كزائر</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tertiaryBtnFull} onPress={() => setView('signup')}>
            <Text style={styles.tertiaryBtnFullText}>إنشاء حساب جديد</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footerText}>بصيرة • أفكارك آمنة وبخصوصية تامة</Text>
    </View>
  );
};

export default LoginScreen;

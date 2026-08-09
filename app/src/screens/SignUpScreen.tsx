import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const SignUpScreen = () => {
  const { setView } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <View style={styles.signupHeader}>
        <TouchableOpacity style={styles.signupBackBtn} onPress={() => setView('login')}>
          <ChevronRight color="#3D3A35" size={20} />
          <Text style={styles.signupBackText}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginCenter}>
        <View style={styles.loginIconCircle}>
          <View style={styles.pulseInnerDotSmall} />
        </View>
        <Text style={styles.loginTitle}>إنشاء حساب</Text>
        <Text style={styles.loginSubTitle}>انضم إلى بصيرة وابدأ رحلتك نحو الوضوح</Text>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="الاسم الكامل"
            placeholderTextColor="#A29C91"
            textAlign="right"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="البريد الإلكتروني"
            placeholderTextColor="#A29C91"
            keyboardType="email-address"
            textAlign="right"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="كلمة المرور"
            placeholderTextColor="#A29C91"
            secureTextEntry
            textAlign="right"
          />
          <TouchableOpacity style={styles.primaryBtnFull} onPress={() => setView('editor')}>
            <Text style={styles.primaryBtnFullText}>إنشاء حساب</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtnFull} onPress={() => setView('login')}>
            <Text style={styles.secondaryBtnFullText}>العودة لتسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footerText}>بصيرة • أفكارك آمنة وبخصوصية تامة</Text>
    </View>
  );
};

export default SignUpScreen;
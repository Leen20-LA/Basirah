import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Globe, Shield, HelpCircle, Info, LogOut } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const SettingsScreen = () => {
  const { language, setShowLanguageModal, setPreviousView, setView, setShowLogoutModal } = useApp();

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsLabel}>تفضيلات التطبيق والحساب</Text>
      
      <TouchableOpacity style={styles.settingsCard} onPress={() => setShowLanguageModal(true)}>
        <ChevronLeft color="#A29C91" size={20} />
        <View style={styles.rowCentered}>
          <View style={{alignItems: 'flex-end', marginRight: 12}}>
            <Text style={styles.settingsCardTitle}>اللغة</Text>
            <Text style={styles.settingsCardSub}>{language}</Text>
          </View>
          <View style={styles.settingsIconBox}><Globe color="#5A5A56" size={20} /></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsCard} onPress={() => {setPreviousView('settings'); setView('privacy');}}>
        <ChevronLeft color="#A29C91" size={20} />
        <View style={styles.rowCentered}>
          <View style={{alignItems: 'flex-end', marginRight: 12}}>
            <Text style={styles.settingsCardTitle}>الخصوصية والأمان</Text>
            <Text style={styles.settingsCardSub}>حماية أفكارك وسرية بياناتك</Text>
          </View>
          <View style={styles.settingsIconBox}><Shield color="#5A5A56" size={20} /></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsCard} onPress={() => {setPreviousView('settings'); setView('help');}}>
        <ChevronLeft color="#A29C91" size={20} />
        <View style={styles.rowCentered}>
          <View style={{alignItems: 'flex-end', marginRight: 12}}>
            <Text style={styles.settingsCardTitle}>المساعدة والتوجيه</Text>
            <Text style={styles.settingsCardSub}>طريقة الاستخدام والأسئلة الشائعة</Text>
          </View>
          <View style={styles.settingsIconBox}><HelpCircle color="#5A5A56" size={20} /></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsCard} onPress={() => {setPreviousView('settings'); setView('about');}}>
        <ChevronLeft color="#A29C91" size={20} />
        <View style={styles.rowCentered}>
          <View style={{alignItems: 'flex-end', marginRight: 12}}>
            <Text style={styles.settingsCardTitle}>عن بصيرة</Text>
            <Text style={styles.settingsCardSub}>رسالة التطبيق والإصدار</Text>
          </View>
          <View style={styles.settingsIconBox}><Info color="#5A5A56" size={20} /></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.settingsCard, {marginTop: 16}]} onPress={() => setShowLogoutModal(true)}>
        <ChevronLeft color="#C85A5A" size={20} opacity={0.5} />
        <View style={styles.rowCentered}>
          <View style={{alignItems: 'flex-end', marginRight: 12}}>
            <Text style={[styles.settingsCardTitle, {color: '#C85A5A'}]}>تسجيل الخروج</Text>
            <Text style={[styles.settingsCardSub, {color: '#A88A8A'}]}>إنهاء الجلسة واستعادة الهدوء</Text>
          </View>
          <View style={[styles.settingsIconBox, {backgroundColor: '#FAF0F0'}]}><LogOut color="#C85A5A" size={20} /></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
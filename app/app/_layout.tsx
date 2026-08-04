import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Plus, Sparkles, LogOut } from 'lucide-react-native';
import { AppProvider, useApp } from '../src/context/AppContext';
import { styles } from '../src/constants/theme';
import Header from '../src/components/Header';
import Sidebar from '../src/components/Sidebar';
import BreathingScreen from '../src/screens/BreathingScreen';

const RootLayout = () => {
  const { 
    view, 
    inputText, 
    isAnalyzing, 
    handleAnalyze, 
    showLogoutModal, 
    setShowLogoutModal, 
    setView 
  } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
        {view !== 'onboarding' && view !== 'login' && <Header />}
        
        <Sidebar />

        <Stack 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#FAF9F5' }
          }} 
        />

        {view === 'editor' && inputText.trim().length > 0 && (
          <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fabBtn} onPress={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Text style={styles.fabText}>بصيرة يتأمل أفكارك...</Text>
                  <ActivityIndicator color="#FFF" size="small" style={{ marginLeft: 12 }} />
                </>
              ) : (
                <>
                  <Text style={styles.fabText}>تحويل إلى وضوح</Text>
                  <Sparkles color="#D8D2C2" size={20} style={{ marginLeft: 12 }} />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        <BreathingScreen />

        {showLogoutModal && (
          <Modal transparent animationType="fade" visible={showLogoutModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.logoutIconContainer}>
                  <LogOut color="#C85A5A" size={24} />
                </View>
                <Text style={styles.modalTitle}>تسجيل الخروج</Text>
                <Text style={[styles.modalSubTitle, { textAlign: 'center' }]}>هل ترغب في إنهاء الجلسة الحالية واستعادة الهدوء التام؟</Text>
                <View style={styles.rowCentered}>
                  <TouchableOpacity 
                    style={[styles.primaryBtn, { backgroundColor: '#C85A5A', flex: 1, marginLeft: 8 }]} 
                    onPress={() => { setShowLogoutModal(false); setView('onboarding'); }}
                  >
                    <Text style={styles.primaryBtnText}>تأكيد الخروج</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.secondaryBtn, { flex: 1 }]} 
                    onPress={() => setShowLogoutModal(false)}
                  >
                    <Text style={styles.secondaryBtnText}>إلغاء</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default function Layout() {
  return (
    <AppProvider>
      <RootLayout />
    </AppProvider>
  );
}
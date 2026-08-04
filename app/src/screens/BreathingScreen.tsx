import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const BreathingScreen = () => {
  const { showBreathingModal, setShowBreathingModal, breathPhase, breathTimer } = useApp();

  return (
    <Modal transparent animationType="fade" visible={showBreathingModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowBreathingModal(false)}>
            <X color="#7A756C" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>تمرين التنفس (4-7-8)</Text>
          <Text style={styles.modalSubTitle}>استعد هدوءك واستقرارك الذهني قبل التفريغ</Text>
          
          <View style={[
            styles.breathCircle, 
            breathPhase === 'شهيق' ? styles.breathIn : 
            breathPhase === 'حبس' ? styles.breathHold : styles.breathOut
          ]}>
            <Text style={styles.breathPhaseText}>{breathPhase}</Text>
            <Text style={styles.breathTimerText}>{breathTimer}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowBreathingModal(false)}>
            <Text style={styles.primaryBtnText}>العودة للتفريغ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BreathingScreen;
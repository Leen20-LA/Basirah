import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Animated, StyleSheet } from 'react-native';
import { X, Plus, Wind, Settings, ChevronLeft, Clock, Trash2 } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const Sidebar = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    handleNewSession, 
    setShowBreathingModal, 
    setPreviousView, 
    setView, 
    sessions, 
    loadSession, 
    deleteSession, 
    currentSessionId 
  } = useApp();

  if (!sidebarOpen) return null;

  return (
    <Modal transparent animationType="none" visible={sidebarOpen}>
      <View style={styles.sidebarOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSidebarOpen(false)} />
        <Animated.View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <TouchableOpacity onPress={() => setSidebarOpen(false)} style={styles.iconBtn}>
              <X color="#7A756C" size={24} />
            </TouchableOpacity>
            <View style={styles.rowCentered}>
              <Text style={styles.sidebarTitle}>بصيرة</Text>
              <View style={styles.sidebarDot} />
            </View>
          </View>

          <View style={styles.sidebarActions}>
            <TouchableOpacity style={styles.sidebarBtn} onPress={handleNewSession}>
              <Text style={styles.sidebarBtnText}>مساحة تفريغ جديدة</Text>
              <Plus color="#7A756C" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarBtn} onPress={() => {setShowBreathingModal(true); setSidebarOpen(false);}}>
              <Text style={[styles.sidebarBtnText, {color: '#557A69'}]}>تمرين التنفس للهدوء</Text>
              <Wind color="#557A69" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarBtn} onPress={() => {setPreviousView('editor'); setView('settings'); setSidebarOpen(false);}}>
              <ChevronLeft color="#A29C91" size={18} />
              <View style={styles.rowCentered}>
                <Text style={styles.sidebarBtnText}>الإعدادات</Text>
                <Settings color="#7A756C" size={18} style={{marginLeft: 8}} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.historyContainer}>
            <View style={[styles.rowCentered, {justifyContent: 'flex-end', marginBottom: 12}]}>
              <Text style={styles.historyTitle}>السجل المحفوظ</Text>
              <Clock color="#7A756C" size={16} style={{marginLeft: 6}} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sessions.map((session) => (
                <TouchableOpacity 
                  key={session.id} 
                  style={[styles.historyCard, currentSessionId === session.id && styles.historyCardActive]}
                  onPress={() => loadSession(session)}
                >
                  <View style={styles.historyCardHeader}>
                    <TouchableOpacity onPress={() => deleteSession(session.id)}>
                      <Trash2 color="#9E988D" size={16} />
                    </TouchableOpacity>
                    <Text style={styles.historyDate}>{session.date}</Text>
                  </View>
                  <Text style={styles.historyPreview} numberOfLines={2}>{session.preview}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;
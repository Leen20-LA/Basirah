import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, Plus, ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const Header = () => {
  const { view, goBack, setSidebarOpen, handleNewSession } = useApp();

  const getHeaderTitle = () => {
    if (view === 'settings') return 'الإعدادات';
    if (view === 'help') return 'المساعدة والتوجيه';
    if (view === 'about') return 'عن بصيرة';
    if (view === 'privacy') return 'الخصوصية والأمان';
    return 'بصيرة';
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {(view === 'editor' || view === 'result') ? (
          <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.iconBtn}>
            <Menu color="#5A5A56" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={goBack} style={styles.iconBtn}>
            <ChevronRight color="#5A5A56" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.headerTitleContainer}>
        <View style={styles.pulseDot} />
        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
      </View>

      <View style={styles.headerRight}>
        {view === 'result' ? (
          <TouchableOpacity onPress={handleNewSession} style={styles.iconBtn}>
            <Plus color="#5A5A56" size={24} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );
};

export default Header;
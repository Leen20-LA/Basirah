import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelpRoute() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>شاشة المساعدة والتوجيه (قيد الإنشاء)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F5',
  },
  text: {
    fontSize: 16,
    color: '#5A5A56',
  },
});
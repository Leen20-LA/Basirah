import React from 'react';
import { ScrollView } from 'react-native';
import ResultScreen from '../src/screens/ResultScreen';

export default function ResultRoute() {
  return (
    <ScrollView 
      style={{ flex: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <ResultScreen />
    </ScrollView>
  );
}
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { HeartHandshake, Lightbulb, CheckCircle2, Check, HelpCircle, Bookmark, Copy, Plus } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const ResultScreen = () => {
  const { 
    analysisResult, 
    inputText, 
    completedSteps, 
    setCompletedSteps, 
    isBookmarked, 
    setIsBookmarked, 
    copied, 
    copyToClipboard, 
    handleNewSession 
  } = useApp();

  if (!analysisResult) return null;

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.resultContainer}
    >
      <View style={styles.resultSnippet}>
        <Text style={styles.snippetLabel}>نص تفريغك الذهني:</Text>
        <Text style={styles.snippetText} numberOfLines={4}>"{inputText}"</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>صوت أفكارك وشعورك</Text>
          <HeartHandshake color="#8C7A6B" size={18} style={{ marginLeft: 8 }} />
        </View>
        <View style={styles.empathyBox}>
          <Text style={styles.empathyText}>{analysisResult.empathyMessage}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>اللب والجوهر</Text>
          <Lightbulb color="#D29B52" size={18} style={{ marginLeft: 8 }} />
        </View>
        {analysisResult.coreIdeas?.map((idea: string, idx: number) => (
          <View key={idx} style={styles.ideaCard}>
            <Text style={styles.ideaText}>{idea}</Text>
            <View style={styles.ideaNumberBox}>
              <Text style={styles.ideaNumber}>{idx + 1}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={[styles.sectionHeader, { justifyContent: 'space-between' }]}>
          <Text style={styles.hintText}>اضغط للتعليم عند الإنجاز</Text>
          <View style={styles.rowCentered}>
            <Text style={styles.sectionTitle}>خطوات هادئة للآن</Text>
            <CheckCircle2 color="#557A69" size={18} style={{ marginLeft: 8 }} />
          </View>
        </View>
        {analysisResult.actionSteps?.map((step: string, idx: number) => {
          const isDone = completedSteps[idx];
          return (
            <TouchableOpacity 
              key={idx} 
              onPress={() => setCompletedSteps(p => ({ ...p, [idx]: !p[idx] }))}
              style={[styles.stepCard, isDone && styles.stepCardDone]}
            >
              <Text style={[styles.stepText, isDone && styles.stepTextDone]}>{step}</Text>
              <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
                {isDone && <Check color="#FFF" size={12} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {analysisResult.reflectiveQuestion && (
        <View style={styles.reflectiveBox}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#2D6A4F' }]}>تأمل هادئ</Text>
            <HelpCircle color="#2D6A4F" size={18} style={{ marginLeft: 8 }} />
          </View>
          <Text style={styles.reflectiveText}>{analysisResult.reflectiveQuestion}</Text>
        </View>
      )}

      <View style={styles.resultActions}>
        <View style={styles.rowCentered}>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)} style={styles.actionBtn}>
            <Bookmark color={isBookmarked ? "#D29B52" : "#5A5A56"} size={20} fill={isBookmarked ? "#D29B52" : "transparent"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard} style={[styles.actionBtn, { marginLeft: 5 }]}>
            {copied ? <Check color="#557A69" size={20} /> : <Copy color="#5A5A56" size={20} />}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleNewSession} style={styles.rowCenteredAction}>
          <Text style={styles.newSessionText}>بدء تفريغ جديد</Text>
          <Plus color="#5A5A56" size={16} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResultScreen;
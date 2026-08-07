import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Mic, MicOff, Sparkles } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';
import { KeyboardAvoidingView, Platform } from 'react-native';

const EditorScreen = () => {
  const { inputText, setInputText, isRecording, toggleRecording, handleAnalyze, isAnalyzing } = useApp();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.editorContainer}>
            <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
              <TouchableOpacity
                onPress={toggleRecording}
                style={[styles.voiceBtn, isRecording && styles.voiceBtnActive]}
              >
                <Text
                  style={[
                    styles.voiceBtnText,
                    isRecording && { color: '#FFF' },
                  ]}
                >
                  {isRecording ? 'جاري الاستماع...' : 'تحدث صوتياً'}
                </Text>

                {isRecording ? (
                  <MicOff color="#FFF" size={16} />
                ) : (
                  <Mic color="#5A5A56" size={16} />
                )}
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.editorInput}
              multiline
              value={inputText}
              onChangeText={setInputText}
              placeholder="ما الذي يشغل بالك الآن؟ اكتب كل ما يخطر في ذهنك بحرية..."
              placeholderTextColor="#A29C91"
              textAlign="right"
              textAlignVertical="top"
            />

            {inputText.trim().length > 0 && (
              <View style={styles.editorFooter}>
                <Text style={styles.charCountText}>
                  {inputText.trim().length} حرف
                </Text>

                <View style={styles.rowCentered}>
                  <Text style={styles.listeningText}>
                    بصيرة يستمع إليك بإصغاء تام...
                  </Text>

                  <View style={styles.listeningDot} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {isKeyboardVisible && inputText.trim().length > 0 && (
          <TouchableOpacity
            style={styles.fabCircleBtn}
            onPress={() => handleAnalyze()}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Sparkles color="#D8D2C2" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
};

export default EditorScreen;
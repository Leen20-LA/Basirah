import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Mic, MicOff } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../constants/theme';

const EditorScreen = () => {
  const { inputText, setInputText, isRecording, toggleRecording } = useApp();

  return (
    <View style={styles.editorContainer}>
      <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
        <TouchableOpacity 
          onPress={toggleRecording} 
          style={[styles.voiceBtn, isRecording && styles.voiceBtnActive]}
        >
          <Text style={[styles.voiceBtnText, isRecording && { color: '#FFF' }]}>
            {isRecording ? 'جاري الاستماع...' : 'تحدث صوتياً'}
          </Text>
          {isRecording ? <MicOff color="#FFF" size={16} /> : <Mic color="#5A5A56" size={16} />}
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
          <Text style={styles.charCountText}>{inputText.trim().length} حرف</Text>
          <View style={styles.rowCentered}>
            <Text style={styles.listeningText}>بصيرة يستمع إليك بإصغاء تام...</Text>
            <View style={styles.listeningDot} />
          </View>
        </View>
      )}
    </View>
  );
};

export default EditorScreen;
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function AboutRoute() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.sectionHeader, styles.sectionHeaderFirst]}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>فكرة بصيرة الأساسية</Text>
      </View>

      <Text style={styles.intro}>
        بصيرة مساحة تساعدك على تحويل الضبابية الذهنية إلى وضوح.
      </Text>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionLabel}>كيف تساعد المستخدم</Text>
      </View>

      <View style={styles.insightBox}>
        <Text style={styles.body}>
          اكتب ما يشغل بالك كما هو، حتى لو كانت أفكارك غير مرتبة أو كثيرة. يساعدك بصيرة
          على فهم ما يدور في ذهنك، وترتيبه، وتحويله إلى خطوات واضحة يمكنك التعامل معها.
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.closing}>
        لست بحاجة إلى ترتيب أفكارك قبل أن تبدأ؛ ابدأ فقط بما في ذهنك.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F5',
  },
  content: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  sectionHeaderFirst: {
    marginTop: 8,
  },
  sectionAccent: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8C8275',
    marginLeft: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6152',
  },
  intro: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2A',
    lineHeight: 30,
    textAlign: 'right',
    marginBottom: 32,
  },
  insightBox: {
    backgroundColor: '#F2EFE7',
    borderWidth: 1,
    borderColor: '#E5E1D5',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  body: {
    fontSize: 14,
    color: '#3D3A35',
    lineHeight: 24,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EDEC',
    marginVertical: 36,
  },
  closing: {
    fontSize: 13,
    color: '#8A857B',
    lineHeight: 22,
    textAlign: 'right',
  },
});
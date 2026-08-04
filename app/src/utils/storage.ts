import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '../types';

const SESSIONS_KEY = '@basira_sessions';

export const saveSessions = async (sessions: Session[]) => {
  try {
    const jsonValue = JSON.stringify(sessions);
    await AsyncStorage.setItem(SESSIONS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save sessions', e);
  }
};

export const loadSessions = async (): Promise<Session[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SESSIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load sessions', e);
    return null;
  }
};

export const clearSessions = async () => {
  try {
    await AsyncStorage.removeItem(SESSIONS_KEY);
  } catch (e) {
    console.error('Failed to clear sessions', e);
  }
};
import { callGeminiAPI } from './aiProvider';
import { AnalysisResult } from '../../types';

/**
 * Generic AI Service.
 * The rest of the application will ONLY interact with this service.
 * It acts as an abstraction layer over the specific AI provider.
 */
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    // Currently using Gemini, but can be swapped to any other provider
    // without affecting the rest of the app.
    const result = await callGeminiAPI(text);
    return result;
  } catch (error) {
    console.error("Error in AI Service:", error);
    throw error;
  }
};
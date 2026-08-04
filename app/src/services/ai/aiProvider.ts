import { BASIRA_SYSTEM_PROMPT } from './prompts';
import { AnalysisResult } from '../../types';

/**
 * Gemini-specific implementation.
 * This is the ONLY file that should know about Gemini's API structure.
 */
export const callGeminiAPI = async (text: string): Promise<AnalysisResult> => {
  const apiKey = ""; // Auth handled automatically in runtime
  
  const payload = {
    contents: [
      { 
        parts: [{ 
          text: `هذا هو نص التفريغ الذهني الخاص بي:\n"${text}"\n\nساعدني على فهم أفكاري وتوضيحها.` 
        }] 
      }
    ],
    systemInstruction: { 
      parts: [{ text: BASIRA_SYSTEM_PROMPT }] 
    },
    generationConfig: { 
      responseMimeType: "application/json" 
    }
  };

  let retries = 0;
  const delays = [1000, 2000, 4000, 8000];

  while (retries <= 4) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return JSON.parse(rawText);
    } catch (err) {
      if (retries === 4) throw err;
      await new Promise(res => setTimeout(res, delays[retries]));
      retries++;
    }
  }
  
  throw new Error("Failed to fetch from AI provider after multiple retries.");
};
import { BASIRA_SYSTEM_PROMPT } from './prompts';
import { AnalysisResult } from '../../types';

/**
 * Gemini-specific implementation.
 * This is the ONLY file that should know about Gemini's API structure.
 * To replace Gemini with another provider (e.g. an n8n Agent workflow),
 * only the implementation in this file needs to change.
 */

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = process.env.EXPO_PUBLIC_GEMINI_MODEL || 'gemini-3.5-flash';

const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const isAnalysisResult = (value: unknown): value is AnalysisResult => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.empathyMessage === 'string' &&
    Array.isArray(v.coreIdeas) &&
    v.coreIdeas.every((item) => typeof item === 'string') &&
    Array.isArray(v.actionSteps) &&
    v.actionSteps.every((item) => typeof item === 'string') &&
    typeof v.reflectiveQuestion === 'string'
  );
};

const parseAnalysisResult = (rawText: string): AnalysisResult => {
  // Gemini may wrap JSON in markdown code fences; strip them if present.
  const cleaned = rawText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error('AI response was not valid JSON.');
  }

  if (!isAnalysisResult(parsed)) {
    throw new Error('AI response did not match the expected AnalysisResult structure.');
  }

  return parsed;
};

export const callGeminiAPI = async (text: string): Promise<AnalysisResult> => {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Gemini API key is missing. Set EXPO_PUBLIC_GEMINI_API_KEY in app/.env.local'
    );
  }

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `هذا هو نص التفريغ الذهني الخاص بي:\n"${text}"\n\nساعدني على فهم أفكاري وتوضيحها.`
          }
        ]
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
        `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        const error = new Error(`Gemini API error (${response.status}): ${errorBody}`) as Error & { status?: number };
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Gemini API returned an empty response.');
      }

      return parseAnalysisResult(rawText);
    } catch (err) {
      const status = (err as Error & { status?: number })?.status;
      // Do not retry client errors (4xx except 429). Retrying a 403 will not
      // resolve a permission/authentication problem and may consume quota.
      // Only retry temporary failures: network errors, 429 (rate limit), and 5xx.
      const isRetryable = status === undefined || status === 429 || status >= 500;
      if (!isRetryable || retries === 4) throw err;
      await new Promise(res => setTimeout(res, delays[retries]));
      retries++;
    }
  }

  throw new Error("Failed to fetch from AI provider after multiple retries.");
};
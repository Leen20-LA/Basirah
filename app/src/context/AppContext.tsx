import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter, usePathname, Href } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { analyzeText } from '../services/ai/aiService';
import { Session, AnalysisResult } from '../types';

interface AppContextType {
  view: string;
  setView: (newView: string) => void;
  goBack: () => void;
  previousView: string;
  setPreviousView: React.Dispatch<React.SetStateAction<string>>;
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  loginEmail: string;
  setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: React.Dispatch<React.SetStateAction<AnalysisResult | null>>;
  completedSteps: { [key: number]: boolean };
  setCompletedSteps: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  isRecording: boolean;
  toggleRecording: () => void;
  showVoiceModal: boolean;
  setShowVoiceModal: (show: boolean) => void;
  copied: boolean;
  isBookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
  showBreathingModal: boolean;
  setShowBreathingModal: React.Dispatch<React.SetStateAction<boolean>>;
  breathPhase: string;
  setBreathPhase: (phase: string) => void;
  breathTimer: number;
  setBreathTimer: (timer: number) => void;
  language: string;
  setLanguage: (lang: string) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  contactSubmitted: boolean;
  setContactSubmitted: (submitted: boolean) => void;
  openFaq: number | null;
  setOpenFaq: (faq: number | null) => void;
  sessions: Session[];
  currentSessionId: string | null;
  handleAnalyze: () => Promise<void>;
  handleNewSession: () => void;
  loadSession: (session: Session) => void;
  deleteSession: (id: string) => void;
  copyToClipboard: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Derive view from pathname, defaulting to onboarding for the root
  const currentView = pathname.substring(1) || 'onboarding';
  
  const setView = (newView: string) => {
    router.push(`/${newView}` as Href);
  };

  const goBack = () => {
    router.back();
  };

  // These are kept as no-ops to avoid breaking existing calls in components 
  // that we aren't modifying, as Expo Router handles the back stack automatically.
  const [previousView, setPreviousView] = useState('editor');

  const [onboardingStep, setOnboardingStep] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});
  const [isRecording, setIsRecording] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [breathPhase, setBreathPhase] = useState('شهيق');
  const [breathTimer, setBreathTimer] = useState(4);
  const [language, setLanguage] = useState('العربية');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'demo-1',
      date: 'اليوم، 10:30 صباحاً',
      preview: 'أشعر بضغط كبير بسبب تراكم المهام في العمل ولا أعرف من أين أبدأ...',
      inputText: 'أشعر بضغط كبير بسبب تراكم المهام في العمل ولا أعرف من أين أبدأ. لدي عرض تقديمي يوم الخميس ولم أبدأ بعد، وهناك إيميلات كثيرة معلقة. أشعر أنني تائه بين التخطيط والتنفيذ.',
      result: {
        empathyMessage: 'طبيعي جداً أن تشعر بالحيرة عندما تتزاحم المهام أمامك في وقت واحد. البداية دائماً هي الجزء الأثقل، لكنك الآن خطوت الخطوة الأولى بكتابتها.',
        coreIdeas: [
          'القلق الأساسي ينبع من العرض التقديمي القادم يوم الخميس.',
          'الرسائل المعلقة تسبب تشتتاً ذهنياً مستمراً.',
          'الشعور بالضياع ناتج عن محاولة التفكير في كل شيء معاً.'
        ],
        actionSteps: [
          'حدد 15 دقيقة فقط الآن لوضع الهيكل العام للعرض التقديمي دون الاهتمام بالتفاصيل.',
          'أغلق صندوق البريد لمدة ساعة لتستعيد تركيزك الهادئ.'
        ],
        reflectiveQuestion: 'ما هي النتيجة الوحيدة التي إن تحققت اليوم ستجعلك تشعر بالرضا والاطمئنان؟'
      }
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (showBreathingModal) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'شهيق') {
              setBreathPhase('حبس');
              return 7;
            } else if (breathPhase === 'حبس') {
              setBreathPhase('زفير');
              return 8;
            } else {
              setBreathPhase('شهيق');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('شهيق');
      setBreathTimer(4);
    }
    return () => clearInterval(interval);
  }, [showBreathingModal, breathPhase]);

  const toggleRecording = () => {
    setShowVoiceModal(true);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() || isAnalyzing) return;
    setIsRecording(false);
    setIsAnalyzing(true);
    try {
      const result = await analyzeText(inputText);
      setAnalysisResult(result);
      setCompletedSteps({});
      setIsBookmarked(false);

      const newSession: Session = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ar-SA', { weekday: 'long', hour: '2-digit', minute: '2-digit' }),
        preview: inputText.slice(0, 60) + (inputText.length > 60 ? '...' : ''),
        inputText: inputText,
        result: result
      };

      setSessions([newSession, ...sessions]);
      setCurrentSessionId(newSession.id);
      setView('result');
    } catch (error) {
      // Log the technical error for development/debugging only.
      console.error('AI analysis failed:', error);

      // Show a simple, friendly user-facing error. Do NOT expose raw API/internal details.
      Alert.alert(
        'تعذر إجراء التحليل',
        'حدثت مشكلة أثناء تحليل أفكارك. يرجى المحاولة مرة أخرى بعد قليل.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewSession = () => {
    setInputText('');
    setAnalysisResult(null);
    setCurrentSessionId(null);
    setCompletedSteps({});
    setIsBookmarked(false);
    setView('editor');
    setSidebarOpen(false);
  };

  const loadSession = (session: Session) => {
    setInputText(session.inputText);
    setAnalysisResult(session.result);
    setCurrentSessionId(session.id);
    setCompletedSteps({});
    setIsBookmarked(false);
    setView('result');
    setSidebarOpen(false);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    if (currentSessionId === id) handleNewSession();
  };

  const copyToClipboard = async () => {
    if (!analysisResult) return;
    const formatted = `رؤية بصيرة:\n${analysisResult.empathyMessage}\n\nالنقاط جوهرية:\n${analysisResult.coreIdeas?.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n')}\n\nخطوات عمل مقترحة:\n${analysisResult.actionSteps?.map((item: string, i: number) => `- ${item}`).join('\n')}\n\nتأمل هادئ:\n${analysisResult.reflectiveQuestion}`.trim();
    await Clipboard.setStringAsync(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppContext.Provider
      value={{
        view: currentView,
        setView,
        goBack,
        previousView,
        setPreviousView,
        onboardingStep,
        setOnboardingStep,
        loginEmail,
        setLoginEmail,
        sidebarOpen,
        setSidebarOpen,
        inputText,
        setInputText,
        isAnalyzing,
        analysisResult,
        setAnalysisResult,
        completedSteps,
        setCompletedSteps,
        isRecording,
        toggleRecording,
        showVoiceModal,
        setShowVoiceModal,
        copied,
        isBookmarked,
        setIsBookmarked,
        showBreathingModal,
        setShowBreathingModal,
        breathPhase,
        setBreathPhase,
        breathTimer,
        setBreathTimer,
        language,
        setLanguage,
        showLanguageModal,
        setShowLanguageModal,
        showLogoutModal,
        setShowLogoutModal,
        contactSubmitted,
        setContactSubmitted,
        openFaq,
        setOpenFaq,
        sessions,
        currentSessionId,
        handleAnalyze,
        handleNewSession,
        loadSession,
        deleteSession,
        copyToClipboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
export interface AnalysisResult {
  empathyMessage: string;
  coreIdeas: string[];
  actionSteps: string[];
  reflectiveQuestion: string;
}

export interface Session {
  id: string;
  date: string;
  preview: string;
  inputText: string;
  result: AnalysisResult;
}
export interface AnalysisResult {
  empathyMessage: string;
  understanding: string;
  keyAreas: string[];
  connections: string[];
  priorities: string[];
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
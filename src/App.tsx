import React, { useState } from 'react';
import { UploadView } from './components/UploadView';
import { AnalyzingView } from './components/AnalyzingView';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Sidebar } from './components/Sidebar';
import { sepsisMockData } from './data/mockSepsisData';

type AppState = 'upload' | 'analyzing' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('upload');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {appState === 'results' && (
        <Sidebar activeModel={sepsisMockData.modelName} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Simple Header for Upload/Analyzing, Top bar for Results */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 h-16">
          {appState !== 'results' ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Aequitas</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500">Project: <span className="text-slate-900">Clinical Risk Models</span></span>
              <div className="h-4 w-[1px] bg-slate-200" />
              <span className="text-sm font-medium text-slate-900">{sepsisMockData.modelName} <span className="text-slate-400 font-normal ml-1">{sepsisMockData.currentVersion}</span></span>
            </div>
          )}

          <div className="flex items-center gap-4">
            {appState === 'results' && (
              <button 
                onClick={() => setAppState('upload')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
              >
                + New Audit
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className={appState === 'results' ? "p-8" : "p-6"}>
            {appState === 'upload' && (
              <UploadView onUploadComplete={() => setAppState('analyzing')} />
            )}
            
            {appState === 'analyzing' && (
              <AnalyzingView onAnalysisComplete={() => setAppState('results')} />
            )}
            
            {appState === 'results' && (
              <ResultsDashboard />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

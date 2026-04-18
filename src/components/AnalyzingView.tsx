import React, { useEffect, useState } from 'react';
import { Activity, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AnalyzingViewProps {
  onAnalysisComplete: () => void;
}

export function AnalyzingView({ onAnalysisComplete }: AnalyzingViewProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => onAnalysisComplete(), 5500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onAnalysisComplete]);

  const steps = [
    { icon: Database, text: "Ingesting MIMIC-III clinical dataset..." },
    { icon: Activity, text: "Calculating False Negative Rates by demographic group..." },
    { icon: ShieldAlert, text: "Scanning for proxy variables and correlations..." },
    { icon: CheckCircle2, text: "Generating fairness report..." }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-slate-900 mb-8">Auditing Model Fairness</h2>
      
      <div className="w-full space-y-4">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = index === step;
          const isComplete = index < step;
          
          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 transition-all duration-500 ${
                isActive ? 'opacity-100 translate-x-0' : 
                isComplete ? 'opacity-50 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              <div className={`p-2 rounded-full ${
                isComplete ? 'bg-green-100 text-green-600' : 
                isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {isComplete ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-medium ${
                isActive ? 'text-slate-900' : 'text-slate-500'
              }`}>
                {s.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

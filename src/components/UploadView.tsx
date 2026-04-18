import React, { useState } from 'react';
import { UploadCloud, FileText, Activity, ShieldCheck, Landmark, Code } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { cn } from '../lib/utils';

interface UploadViewProps {
  onUploadComplete: () => void;
}

type Persona = 'compliance' | 'regulator' | 'developer';

export function UploadView({ onUploadComplete }: UploadViewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [persona, setPersona] = useState<Persona>('compliance');
  const [files, setFiles] = useState<{ predictions: File | null; metadata: File | null }>({
    predictions: null,
    metadata: null
  });
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (type: 'predictions' | 'metadata', file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError(`Invalid file type for ${type}. Please upload a CSV file.`);
      return;
    }
    setError(null);
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleDrop = (e: React.DragEvent, type: 'predictions' | 'metadata') => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(type, file);
  };

  const handleStartAudit = () => {
    if (!files.predictions || !files.metadata) {
      setError("Missing required files. Please upload both Model Predictions and Patient Metadata CSVs.");
      return;
    }
    onUploadComplete();
  };

  const personas = [
    { id: 'compliance', icon: ShieldCheck, label: 'Hospital Compliance', desc: 'Audit internal models for safety.' },
    { id: 'regulator', icon: Landmark, label: 'Regulator', desc: 'External audit for certification.' },
    { id: 'developer', icon: Code, label: 'AI Developer', desc: 'Self-certify before deployment.' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
          <Activity className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Aequitas Medical Auditor</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Inspect clinical prediction models for hidden unfairness. Detect proxy variables and measure outcome disparities before they impact patients.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 text-center uppercase tracking-wider">Select Your Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((p) => {
            const Icon = p.icon;
            const isActive = persona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id as Persona)}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border-2 transition-all text-center gap-2",
                  isActive ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive ? "text-blue-600" : "text-slate-400")} />
                <div>
                  <div className="text-sm font-bold text-slate-900">{p.label}</div>
                  <div className="text-[10px] text-slate-500">{p.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className={cn(files.predictions && "border-green-200 bg-green-50/30")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                1. Model Predictions
              </div>
              {files.predictions && <Badge className="bg-green-100 text-green-700 text-[10px]">Ready</Badge>}
            </CardTitle>
            <CardDescription className="text-xs">CSV with risk scores and actual outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors relative",
                isDragging ? 'border-blue-500 bg-blue-50' : files.predictions ? 'border-green-300' : 'border-slate-300 hover:border-slate-400'
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => handleDrop(e, 'predictions')}
            >
              <input 
                type="file" 
                accept=".csv" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => e.target.files?.[0] && handleFileSelect('predictions', e.target.files[0])}
              />
              <UploadCloud className={cn("w-10 h-10 mx-auto mb-4", files.predictions ? "text-green-500" : "text-slate-400")} />
              <p className="text-sm font-medium text-slate-900 mb-1">
                {files.predictions ? files.predictions.name : "Drop CSV here"}
              </p>
              {!files.predictions && <Button variant="outline" size="sm" className="mt-2 pointer-events-none">Browse</Button>}
            </div>
          </CardContent>
        </Card>

        <Card className={cn(files.metadata && "border-green-200 bg-green-50/30")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                2. Patient Metadata
              </div>
              {files.metadata && <Badge className="bg-green-100 text-green-700 text-[10px]">Ready</Badge>}
            </CardTitle>
            <CardDescription className="text-xs">CSV with demographics and SES features.</CardDescription>
          </CardHeader>
          <CardContent>
             <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors relative",
                isDragging ? 'border-blue-500 bg-blue-50' : files.metadata ? 'border-green-300' : 'border-slate-300 hover:border-slate-400'
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => handleDrop(e, 'metadata')}
            >
              <input 
                type="file" 
                accept=".csv" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => e.target.files?.[0] && handleFileSelect('metadata', e.target.files[0])}
              />
              <UploadCloud className={cn("w-10 h-10 mx-auto mb-4", files.metadata ? "text-green-500" : "text-slate-400")} />
              <p className="text-sm font-medium text-slate-900 mb-1">
                {files.metadata ? files.metadata.name : "Drop CSV here"}
              </p>
              {!files.metadata && <Button variant="outline" size="sm" className="mt-2 pointer-events-none">Browse</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={handleStartAudit} 
          className="bg-slate-900 hover:bg-slate-800 text-white px-12 h-12 text-lg font-bold w-full md:w-auto"
        >
          Run Custom Audit
        </Button>
        
        <div className="flex items-center gap-4 w-full">
          <div className="h-[1px] bg-slate-200 flex-1" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
          <div className="h-[1px] bg-slate-200 flex-1" />
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-center relative overflow-hidden w-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h3 className="text-lg font-bold text-white mb-2">Run Sepsis Model Audit Demo</h3>
          <p className="text-sm text-blue-100 mb-6 max-w-md mx-auto">
            Audit the Epic Sepsis Prediction Model using the MIMIC-III clinical dataset. Detect race-based false negative rate disparities.
          </p>
          <Button onClick={onUploadComplete} className="bg-white text-blue-600 hover:bg-blue-50 px-8 font-bold">
            Launch Audit Demo
          </Button>
        </div>
      </div>
    </div>
  );
}

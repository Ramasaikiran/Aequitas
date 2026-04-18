import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LineChart, Line } from 'recharts';
import { AlertTriangle, ShieldAlert, CheckCircle, ArrowRight, Users, Activity, FileWarning, Info, Zap, RefreshCcw, Download, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { sepsisMockData } from '../data/mockSepsisData';
import { cn } from '../lib/utils';

export function ResultsDashboard() {
  const [isSimulating, setIsSimulating] = useState(false);
  const data = sepsisMockData;
  
  const avgFnr = data.fnrDisparity.reduce((acc, curr) => acc + curr.fnr, 0) / data.fnrDisparity.length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Bar: Summary & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Status: <span className="text-red-600">Failed</span></h2>
              <Badge variant="destructive" className="animate-pulse">Action Required</Badge>
            </div>
            <p className="text-sm text-slate-500">
              Critical bias detected in <span className="font-bold text-slate-700">Equalized Odds</span>. Model deployment is not recommended.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Download className="w-4 h-4" /> Export Audit Log
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 gap-2">
            <Award className="w-4 h-4" /> Generate Certificate
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Left Column: Metrics & History */}
        <div className="lg:col-span-1 space-y-8">
          {/* Fairness Scorecard */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Fairness Metrics</h3>
            <div className="space-y-3">
              {data.fairnessMetrics.map((metric) => (
                <div key={metric.name} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{metric.name}</span>
                    <div className={cn("w-2 h-2 rounded-full", 
                      metric.status === 'pass' ? 'bg-green-500' : 
                      metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    )} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900 font-mono">{(metric.value * 100).toFixed(0)}%</span>
                    <span className="text-[10px] text-slate-400">vs 80% target</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Audit History</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {data.auditHistory.map((audit, idx) => (
                <div key={audit.version} className={cn("p-4 flex items-center justify-between border-b border-slate-100 last:border-0", idx === 2 && "bg-slate-50")}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{audit.version}</p>
                      <p className="text-[10px] text-slate-500">{audit.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{audit.score}%</p>
                    <p className={cn("text-[10px] font-medium", audit.status === 'Critical' ? 'text-red-500' : 'text-green-500')}>{audit.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right: Visualizations & Remediation */}
        <div className="lg:col-span-3 space-y-8">
          {/* Main Chart */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">False Negative Rate (FNR) Disparity</CardTitle>
                  <CardDescription className="text-xs">Clinical miss rate across demographic cohorts.</CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
                  <Button 
                    variant={!isSimulating ? "secondary" : "ghost"} 
                    size="sm" 
                    className="text-[10px] h-7 px-3 font-bold uppercase tracking-wider"
                    onClick={() => setIsSimulating(false)}
                  >
                    Baseline
                  </Button>
                  <Button 
                    variant={isSimulating ? "secondary" : "ghost"} 
                    size="sm" 
                    className="text-[10px] h-7 px-3 gap-1 font-bold uppercase tracking-wider"
                    onClick={() => setIsSimulating(true)}
                  >
                    <Zap className="w-3 h-3 text-blue-600" /> Simulation
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={data.fnrDisparity.map(d => ({
                      ...d,
                      fnr: isSimulating ? (d.demographic === 'Black' ? 12.5 : d.demographic === 'Hispanic' ? 13.2 : d.fnr) : d.fnr
                    }))} 
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="demographic" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <ReferenceLine y={avgFnr} stroke="#cbd5e1" strokeDasharray="4 4" label={{ position: 'right', value: 'Avg', fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                    <Bar dataKey="fnr" radius={[4, 4, 0, 0]} maxBarSize={60}>
                      {data.fnrDisparity.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isSimulating ? (entry.demographic === 'Black' || entry.demographic === 'Hispanic' ? '#3b82f6' : '#e2e8f0') : entry.color} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cn("p-4 rounded-xl border transition-all", isSimulating ? "bg-blue-50 border-blue-100" : "bg-red-50 border-red-100")}>
                  <div className="flex items-center gap-2 mb-2">
                    {isSimulating ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <h4 className={cn("text-xs font-bold uppercase tracking-wider", isSimulating ? "text-blue-900" : "text-red-900")}>
                      {isSimulating ? "Simulation Result" : "Critical Finding"}
                    </h4>
                  </div>
                  <p className={cn("text-sm leading-relaxed", isSimulating ? "text-blue-800" : "text-red-800")}>
                    {isSimulating 
                      ? "Adversarial debiasing reduces max disparity from 18.2% to 4.5%. Model is now within FDA-recommended fairness bounds."
                      : "Black patients are 2.6x more likely to be missed for sepsis alerts. This represents a significant liability and safety risk."}
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileWarning className="w-4 h-4 text-slate-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Root Cause Analysis</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bias is driven by <span className="font-bold text-slate-900">Insurance_Type</span> acting as a proxy for race. Historical under-coding in Medicaid populations is being learned as "lower risk."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remediation & Proxy Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Fairness-Accuracy Trade-off
                </CardTitle>
                <CardDescription className="text-[10px]">Pareto frontier for model optimization.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { accuracy: 92, fairness: 30 },
                      { accuracy: 90, fairness: 50 },
                      { accuracy: 88, fairness: 75 },
                      { accuracy: 85, fairness: 90 },
                      { accuracy: 80, fairness: 95 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="fairness" hide />
                      <YAxis hide domain={[70, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }}
                        labelFormatter={(val) => `Fairness: ${val}%`}
                      />
                      <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                      <ReferenceLine x={75} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Current', fill: '#ef4444', fontSize: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Higher Fairness</span>
                  <span>Higher Accuracy</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Mitigation Plan
                </CardTitle>
                <CardDescription className="text-[10px]">AI-generated debiasing strategy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-900">Adversarial Debiasing</span>
                    <Badge className="bg-green-100 text-green-700 text-[8px] h-4">High ROI</Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">Inject fairness constraints into the loss function.</p>
                </div>
                <Button className="w-full bg-slate-900 text-white text-[10px] h-8 font-bold uppercase tracking-wider">
                  Generate Fix Script
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-amber-500" />
                  Proxy Variable Scan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.proxyVariables.map((proxy) => (
                  <div key={proxy.feature} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-900 font-mono">{proxy.feature}</p>
                      <p className="text-[10px] text-slate-500">Proxies for {proxy.protectedAttribute}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">{(proxy.correlation * 100).toFixed(0)}%</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Correlation</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

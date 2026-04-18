import React from 'react';
import { LayoutDashboard, ShieldCheck, History, Settings, Plus, ChevronRight, FolderKanban } from 'lucide-react';
import { cn } from '../lib/utils';
import { sepsisMockData } from '../data/mockSepsisData';

interface SidebarProps {
  activeModel: string;
}

export function Sidebar({ activeModel }: SidebarProps) {
  const models = sepsisMockData.projectModels;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-tight leading-none">Aequitas</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Enterprise</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Main</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 text-blue-400 font-medium text-sm">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm">
            <ShieldCheck className="w-4 h-4" />
            Compliance
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm">
            <History className="w-4 h-4" />
            Audit Logs
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Models</p>
            <button className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          {models.map((model) => (
            <button 
              key={model.name}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                model.name === activeModel ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <FolderKanban className={cn("w-4 h-4", model.name === activeModel ? "text-blue-400" : "text-slate-500")} />
                <span className="truncate max-w-[120px]">{model.name}</span>
              </div>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">John Doe</span>
            <span className="text-[10px] text-slate-500 truncate">Hospital Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

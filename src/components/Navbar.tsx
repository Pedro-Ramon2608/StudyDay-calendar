import React, { useRef } from 'react';
import { ActiveTab, AppStorageState } from '../types';
import {
  CalendarDays,
  Target,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onExport: () => void;
  onImport: (data: AppStorageState) => boolean;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onExport,
  onImport,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const success = onImport(json);
        if (!success) {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao ler arquivo de backup.');
      }
    };
    reader.readAsText(file);
    // Reset file input so user can import again if desired
    e.target.value = '';
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                StudyDay
              </span>
              <span className="hidden sm:inline-block text-xs font-medium text-slate-400">
                · Organização de Estudos
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Tabs (Segmented Control) */}
          <nav className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg" aria-label="Navegação Principal">
            <button
              type="button"
              onClick={() => onTabChange('calendar')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              <span>Calendário Diário</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('future')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'future'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 shrink-0" />
              <span>Metas & Recursos</span>
            </button>
          </nav>

          {/* Zone 3: Ações de Backup e Restauração */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />

            <button
              type="button"
              onClick={onExport}
              title="Exportar backup dos seus estudos (JSON)"
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Exportar</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Importar backup de dados (JSON)"
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden md:inline">Importar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Deseja resetar para os dados de demonstração? Isso substituirá os dados atuais.')) {
                  onReset();
                }
              }}
              title="Restaurar dados de exemplo"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

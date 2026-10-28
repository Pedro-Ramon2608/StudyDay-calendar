import { useState } from 'react';
import { useStudyStorage } from './hooks/useStudyStorage';
import { ActiveTab } from './types';
import { getTodayString } from './utils/dateUtils';
import { Navbar } from './components/Navbar';
import { CalendarGrid } from './components/Calendar/CalendarGrid';
import { DayView } from './components/Calendar/DayView';
import { FutureTasksView } from './components/FutureTasks/FutureTasksView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayString());

  const {
    state,
    getDayPlan,
    setDaySubject,
    setDayNotes,
    addDayTask,
    toggleDayTask,
    deleteDayTask,
    editDayTask,
    addDayLink,
    deleteDayLink,
    addFutureTask,
    toggleFutureTask,
    deleteFutureTask,
    updateFutureTask,
    addFutureTaskLink,
    deleteFutureTaskLink,
    scheduleFutureTaskToCalendar,
    addGlobalLink,
    deleteGlobalLink,
    resetToDefaults,
    exportData,
    importData,
  } = useStudyStorage();

  const currentPlan = getDayPlan(selectedDate);

  const handleJumpToToday = () => {
    setSelectedDate(getTodayString());
  };

  const handleScheduleFutureTask = (
    futureTaskId: string,
    targetDate: string,
    options?: { removeFromFuture?: boolean }
  ) => {
    scheduleFutureTaskToCalendar(futureTaskId, targetDate, options);
    // Seleciona a data agendada e muda para a aba de calendário para o usuário ver o resultado
    setSelectedDate(targetDate);
    setActiveTab('calendar');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExport={exportData}
        onImport={importData}
        onReset={resetToDefaults}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Coluna da Esquerda: Calendário Compacto (4 colunas no desktop) */}
            <div className="lg:col-span-4 space-y-3">
              <CalendarGrid
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                dayPlans={state.dayPlans}
              />

              {/* Card sutil com resumo rápido de hoje */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 text-xs text-slate-600 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800">
                    Produtividade de Hoje
                  </span>
                  <button
                    type="button"
                    onClick={handleJumpToToday}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Ver Hoje
                  </button>
                </div>
                {(() => {
                  const todayPlan = getDayPlan(getTodayString());
                  const total = todayPlan.tasks.length;
                  const done = todayPlan.tasks.filter((t) => t.completed).length;
                  return (
                    <p className="text-slate-500">
                      {total === 0
                        ? 'Nenhuma tarefa cadastrada para hoje ainda.'
                        : `${done} de ${total} tarefas concluídas hoje (${Math.round(
                            (done / total) * 100
                          )}%).`}
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Coluna da Direita: Painel do Dia Selecionado (8 colunas no desktop) */}
            <div className="lg:col-span-8">
              <DayView
                date={selectedDate}
                plan={currentPlan}
                onSetSubject={(subject) => setDaySubject(selectedDate, subject)}
                onSetNotes={(notes) => setDayNotes(selectedDate, notes)}
                onAddTask={(title, description) => addDayTask(selectedDate, title, description)}
                onToggleTask={(taskId) => toggleDayTask(selectedDate, taskId)}
                onDeleteTask={(taskId) => deleteDayTask(selectedDate, taskId)}
                onEditTask={(taskId, title, description) => editDayTask(selectedDate, taskId, title, description)}
                onAddLink={(title, url) => addDayLink(selectedDate, title, url)}
                onDeleteLink={(linkId) => deleteDayLink(selectedDate, linkId)}
                onJumpToToday={handleJumpToToday}
              />
            </div>
          </div>
        ) : (
          /* Aba 2: Tarefas Futuras & Mural de Recursos */
          <FutureTasksView
            futureTasks={state.futureTasks}
            globalLinks={state.globalLinks}
            onAddFutureTask={addFutureTask}
            onToggleFutureTask={toggleFutureTask}
            onDeleteFutureTask={deleteFutureTask}
            onUpdateFutureTask={updateFutureTask}
            onAddFutureTaskLink={addFutureTaskLink}
            onDeleteFutureTaskLink={deleteFutureTaskLink}
            onScheduleFutureTask={handleScheduleFutureTask}
            onAddGlobalLink={addGlobalLink}
            onDeleteGlobalLink={deleteGlobalLink}
          />
        )}
      </main>

      {/* Rodapé Clean e Minimalista */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            StudyDay · Simples, confortável para os olhos e sem atritos.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Dados salvos localmente</span>
            <span aria-hidden="true">·</span>
            <span>Sem necessidade de cadastro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

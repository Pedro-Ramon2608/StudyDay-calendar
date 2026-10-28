import { useState, useEffect, useCallback } from 'react';
import { AppStorageState, DayPlan, FutureTask, UsefulLink, Task } from '../types';
import { getTodayString, formatDateString, normalizeUrl } from '../utils/dateUtils';

const STORAGE_KEY = 'studyday_app_storage_v1';

function getInitialData(): AppStorageState {
  const today = getTodayString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateString(yesterday);

  return {
    dayPlans: {
      [today]: {
        date: today,
        subject: 'Arquitetura Frontend e TypeScript Estrito',
        notes: 'Focar em padrões de UI limpa, zero dependência de backend e persistência eficiente.',
        tasks: [
          {
            id: 'task-1',
            title: 'Estruturar tipos estritos e custom hook no TypeScript',
            completed: true,
            createdAt: Date.now() - 3600000,
          },
          {
            id: 'task-2',
            title: 'Implementar checklist diário com barra de progresso visual',
            completed: true,
            createdAt: Date.now() - 2500000,
          },
          {
            id: 'task-3',
            title: 'Conectar links de apoio e referências para aula de hoje',
            completed: false,
            createdAt: Date.now() - 1200000,
          },
        ],
        links: [
          {
            id: 'link-1',
            title: 'Documentação Oficial do React Hooks',
            url: 'https://react.dev/reference/react',
          },
          {
            id: 'link-2',
            title: 'TypeScript Handbook - Generics & Interfaces',
            url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
          },
        ],
      },
      [yesterdayStr]: {
        date: yesterdayStr,
        subject: 'Estruturas de Dados e Algoritmos Básicos',
        notes: 'Conceitos de tempo de complexidade O(n) e pilhas.',
        tasks: [
          {
            id: 'task-y1',
            title: 'Revisar Pilhas (Stacks) e Filas (Queues)',
            completed: true,
            createdAt: Date.now() - 90000000,
          },
          {
            id: 'task-y2',
            title: 'Implementar fila circular em TypeScript',
            completed: true,
            createdAt: Date.now() - 85000000,
          },
        ],
        links: [
          {
            id: 'link-y1',
            title: 'Visualgo - Animação de Estruturas de Dados',
            url: 'https://visualgo.net/en',
          },
        ],
      },
    },
    futureTasks: [
      {
        id: 'ft-1',
        title: 'Fazer curso de Docker e Containers',
        description: 'Aprender a criar Dockerfile, gerenciar volumes e compor serviços para projetos locais.',
        completed: false,
        links: [
          {
            id: 'link-f1',
            title: 'Guia Inicial Docker Docs',
            url: 'https://docs.docker.com/get-started/',
          },
        ],
        createdAt: Date.now() - 40000000,
      },
      {
        id: 'ft-2',
        title: 'Entender Árvores Binárias de Busca (BST)',
        description: 'Praticar percursos in-order, pre-order e resolver exercícios no LeetCode.',
        completed: false,
        links: [
          {
            id: 'link-f2',
            title: 'LeetCode - Tree Problems',
            url: 'https://leetcode.com/tag/tree/',
          },
        ],
        createdAt: Date.now() - 30000000,
      },
      {
        id: 'ft-3',
        title: 'Aprofundar em Web Performance e Core Web Vitals',
        description: 'Dominar métricas LCP, CLS, INP e técnicas de compressão e carregamento.',
        completed: false,
        links: [
          {
            id: 'link-f3',
            title: 'web.dev - Performance Guide',
            url: 'https://web.dev/learn/performance/',
          },
        ],
        createdAt: Date.now() - 20000000,
      },
    ],
    globalLinks: [
      {
        id: 'gl-1',
        title: 'LeetCode',
        url: 'https://leetcode.com',
      },
      {
        id: 'gl-2',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
      },
      {
        id: 'gl-3',
        title: 'Roadmap.sh - Trilhas de Estudo',
        url: 'https://roadmap.sh',
      },
      {
        id: 'gl-4',
        title: 'GitHub Repositories',
        url: 'https://github.com',
      },
    ],
  };
}

export function useStudyStorage() {
  const [state, setState] = useState<AppStorageState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppStorageState;
        if (parsed && typeof parsed === 'object' && parsed.dayPlans && Array.isArray(parsed.futureTasks)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados do localStorage:', e);
    }
    return getInitialData();
  });

  // Salva no localStorage imediatamente sempre que o estado muda
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Erro ao salvar dados no localStorage:', e);
    }
  }, [state]);

  // Recupera o plano de um dia (ou template vazio)
  const getDayPlan = useCallback(
    (date: string): DayPlan => {
      if (state.dayPlans[date]) {
        return state.dayPlans[date];
      }
      return {
        date,
        subject: '',
        notes: '',
        tasks: [],
        links: [],
      };
    },
    [state.dayPlans]
  );

  // Atualiza campo do plano do dia
  const updateDayPlan = useCallback((date: string, updater: (prev: DayPlan) => DayPlan) => {
    setState((prev) => {
      const currentPlan: DayPlan = prev.dayPlans[date] || {
        date,
        subject: '',
        notes: '',
        tasks: [],
        links: [],
      };
      const updated = updater(currentPlan);
      return {
        ...prev,
        dayPlans: {
          ...prev.dayPlans,
          [date]: updated,
        },
      };
    });
  }, []);

  // Matéria/Tema do dia
  const setDaySubject = useCallback(
    (date: string, subject: string) => {
      updateDayPlan(date, (prev) => ({ ...prev, subject }));
    },
    [updateDayPlan]
  );

  // Notas do dia
  const setDayNotes = useCallback(
    (date: string, notes: string) => {
      updateDayPlan(date, (prev) => ({ ...prev, notes }));
    },
    [updateDayPlan]
  );

  // Adicionar tarefa ao dia
  const addDayTask = useCallback(
    (date: string, title: string, description?: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: trimmed,
        description: description?.trim() || undefined,
        completed: false,
        createdAt: Date.now(),
      };
      updateDayPlan(date, (prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
      }));
    },
    [updateDayPlan]
  );

  // Alternar conclusão de tarefa do dia
  const toggleDayTask = useCallback(
    (date: string, taskId: string) => {
      updateDayPlan(date, (prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
      }));
    },
    [updateDayPlan]
  );

  // Remover tarefa do dia
  const deleteDayTask = useCallback(
    (date: string, taskId: string) => {
      updateDayPlan(date, (prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== taskId),
      }));
    },
    [updateDayPlan]
  );

  // Editar tarefa do dia (título e descrição)
  const editDayTask = useCallback(
    (date: string, taskId: string, newTitle: string, newDescription?: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;
      updateDayPlan(date, (prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === taskId
            ? { ...t, title: trimmed, description: newDescription !== undefined ? newDescription.trim() || undefined : t.description }
            : t
        ),
      }));
    },
    [updateDayPlan]
  );

  // Links do dia
  const addDayLink = useCallback(
    (date: string, title: string, url: string) => {
      const trimmedTitle = title.trim();
      const validUrl = normalizeUrl(url);
      if (!trimmedTitle || !validUrl) return;

      const newLink: UsefulLink = {
        id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: trimmedTitle,
        url: validUrl,
      };

      updateDayPlan(date, (prev) => ({
        ...prev,
        links: [...prev.links, newLink],
      }));
    },
    [updateDayPlan]
  );

  const deleteDayLink = useCallback(
    (date: string, linkId: string) => {
      updateDayPlan(date, (prev) => ({
        ...prev,
        links: prev.links.filter((l) => l.id !== linkId),
      }));
    },
    [updateDayPlan]
  );

  // === TAREFAS FUTURAS ===
  const addFutureTask = useCallback(
    (data: { title: string; description?: string; scheduledDate?: string; links?: UsefulLink[] }) => {
      const trimmed = data.title.trim();
      if (!trimmed) return;

      const newTask: FutureTask = {
        id: `ft-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: trimmed,
        description: data.description?.trim() || '',
        completed: false,
        scheduledDate: data.scheduledDate || undefined,
        links: data.links || [],
        createdAt: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        futureTasks: [newTask, ...prev.futureTasks],
      }));
    },
    []
  );

  const toggleFutureTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      futureTasks: prev.futureTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }));
  }, []);

  const deleteFutureTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      futureTasks: prev.futureTasks.filter((t) => t.id !== id),
    }));
  }, []);

  const updateFutureTask = useCallback((id: string, partial: Partial<FutureTask>) => {
    setState((prev) => ({
      ...prev,
      futureTasks: prev.futureTasks.map((t) => (t.id === id ? { ...t, ...partial } : t)),
    }));
  }, []);

  const addFutureTaskLink = useCallback((taskId: string, title: string, url: string) => {
    const trimmedTitle = title.trim();
    const validUrl = normalizeUrl(url);
    if (!trimmedTitle || !validUrl) return;

    const newLink: UsefulLink = {
      id: `fl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      url: validUrl,
    };

    setState((prev) => ({
      ...prev,
      futureTasks: prev.futureTasks.map((t) =>
        t.id === taskId ? { ...t, links: [...(t.links || []), newLink] } : t
      ),
    }));
  }, []);

  const deleteFutureTaskLink = useCallback((taskId: string, linkId: string) => {
    setState((prev) => ({
      ...prev,
      futureTasks: prev.futureTasks.map((t) =>
        t.id === taskId ? { ...t, links: t.links.filter((l) => l.id !== linkId) } : t
      ),
    }));
  }, []);

  // Agendar tarefa futura no calendário (vincular/transferir para DayPlan)
  const scheduleFutureTaskToCalendar = useCallback(
    (futureTaskId: string, targetDate: string, options?: { removeFromFuture?: boolean }) => {
      const futureTask = state.futureTasks.find((t) => t.id === futureTaskId);
      if (!futureTask) return;

      setState((prev) => {
        // Obter ou criar o plano do dia de destino
        const targetPlan = prev.dayPlans[targetDate];
        const existingPlan: DayPlan = targetPlan
          ? {
              ...targetPlan,
              subject: targetPlan.subject || futureTask.title,
              tasks: [...targetPlan.tasks],
              links: [...targetPlan.links],
            }
          : {
              date: targetDate,
              subject: futureTask.title,
              notes: '',
              tasks: [],
              links: [],
            };

        // Adiciona a tarefa ao dia de destino
        const newDayTask: Task = {
          id: `task-sched-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title: futureTask.title,
          description: futureTask.description || undefined,
          completed: false,
          createdAt: Date.now(),
        };

        // Copia os links de apoio para o dia, evitando duplicatas de URL
        const existingUrls = new Set(existingPlan.links.map((l) => l.url));
        const newLinksToCopy: UsefulLink[] = (futureTask.links || [])
          .filter((l) => !existingUrls.has(l.url))
          .map((l) => ({
            id: `link-copied-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            title: l.title,
            url: l.url,
          }));

        const updatedPlan: DayPlan = {
          ...existingPlan,
          subject: existingPlan.subject || futureTask.title,
          tasks: [...existingPlan.tasks, newDayTask],
          links: [...existingPlan.links, ...newLinksToCopy],
        };

        let updatedFutureTasks = prev.futureTasks;
        if (options?.removeFromFuture) {
          updatedFutureTasks = prev.futureTasks.filter((t) => t.id !== futureTaskId);
        } else {
          // Marca a data agendada na própria tarefa futura
          updatedFutureTasks = prev.futureTasks.map((t) =>
            t.id === futureTaskId ? { ...t, scheduledDate: targetDate } : t
          );
        }

        return {
          ...prev,
          dayPlans: {
            ...prev.dayPlans,
            [targetDate]: updatedPlan,
          },
          futureTasks: updatedFutureTasks,
        };
      });
    },
    [state.futureTasks]
  );

  // === LINKS GLOBAIS ===
  const addGlobalLink = useCallback((title: string, url: string) => {
    const trimmedTitle = title.trim();
    const validUrl = normalizeUrl(url);
    if (!trimmedTitle || !validUrl) return;

    const newLink: UsefulLink = {
      id: `gl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      url: validUrl,
    };

    setState((prev) => ({
      ...prev,
      globalLinks: [newLink, ...prev.globalLinks],
    }));
  }, []);

  const deleteGlobalLink = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      globalLinks: prev.globalLinks.filter((l) => l.id !== id),
    }));
  }, []);

  // Utilitários de backup/restauração
  const resetToDefaults = useCallback(() => {
    const initial = getInitialData();
    setState(initial);
  }, []);

  const exportData = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `studyday_backup_${getTodayString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  const importData = useCallback((imported: AppStorageState) => {
    if (imported && typeof imported === 'object' && imported.dayPlans && Array.isArray(imported.futureTasks)) {
      setState(imported);
      return true;
    }
    return false;
  }, []);

  return {
    state,
    getDayPlan,
    updateDayPlan,
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
  };
}

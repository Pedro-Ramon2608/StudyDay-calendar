/**
 * StudyDay - Data Model & Type Definitions
 */

// Entidade de Links Úteis (reutilizável)
export interface UsefulLink {
  id: string;
  title: string;
  url: string;
}

// Entidade de Tarefa individual
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

// Plano do Dia (vinculado a uma data 'YYYY-MM-DD')
export interface DayPlan {
  date: string;
  subject: string; // Ex: "POO e Polimorfismo"
  notes?: string;
  tasks: Task[];
  links: UsefulLink[]; // Links específicos para o estudo deste dia
}

// Tarefas Futuras (Backlog / Metas que ainda não têm data fixa ou estão no horizonte)
export interface FutureTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  scheduledDate?: string; // Opcional: data prevista caso queira enviar ao calendário
  links: UsefulLink[]; // Links de apoio (ex: link do curso da Udemy/Alura)
  createdAt: number;
}

// Estado global persistido no localStorage
export interface AppStorageState {
  dayPlans: Record<string, DayPlan>; // chave 'YYYY-MM-DD'
  futureTasks: FutureTask[];
  globalLinks: UsefulLink[]; // Repositório geral de cursos/sites úteis
}

// Tipos auxiliares para navegação
export type ActiveTab = 'calendar' | 'future';

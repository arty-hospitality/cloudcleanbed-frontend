export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  assignedToName?: string;
  createdBy: string;
  createdByName?: string;
  createdAt: Date;
  updatedAt: Date;
  priority: TaskPriority;
  dueDate?: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

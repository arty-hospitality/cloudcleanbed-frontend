import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { Task, TaskStatus } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private supabase: SupabaseClient;
  private realtimeChannel?: RealtimeChannel;
  
  // Using Angular 20 signals for reactive state
  tasks = signal<Task[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Initialize real-time subscription
  subscribeToTasks() {
    this.realtimeChannel = this.supabase
      .channel('tasks-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          console.log('Real-time update:', payload);
          this.loadTasks(); // Reload all tasks on any change
        }
      )
      .subscribe();
  }

  unsubscribe() {
    if (this.realtimeChannel) {
      this.supabase.removeChannel(this.realtimeChannel);
    }
  }

  // Load all tasks
  async loadTasks(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      this.tasks.set(data || []);
    } catch (err: any) {
      this.error.set(err.message);
      console.error('Error loading tasks:', err);
    } finally {
      this.loading.set(false);
    }
  }

  // Create new task
  async createTask(task: Partial<Task>): Promise<Task | null> {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .insert([{
          ...task,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      this.error.set(err.message);
      console.error('Error creating task:', err);
      return null;
    }
  }

  // Update task status (main Kanban action)
  async updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<boolean> {
    try {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      // Track when task moves to in_progress
      if (newStatus === TaskStatus.IN_PROGRESS) {
        updateData.started_at = new Date().toISOString();
      }

      // Track when task is completed
      if (newStatus === TaskStatus.CLEAN) {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await this.supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (err: any) {
      this.error.set(err.message);
      console.error('Error updating task:', err);
      return false;
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (err: any) {
      this.error.set(err.message);
      console.error('Error updating task:', err);
      return false;
    }
  }

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (err: any) {
      this.error.set(err.message);
      console.error('Error deleting task:', err);
      return false;
    }
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  getTasksByAssignee(userId: string): Task[] {
    return this.tasks().filter(task => task.assigned_to_id === userId);
  }
}

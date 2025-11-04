import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getTasks() {
    const { data, error } = await this.supabase.from('tasks').select('*');
    if (error) throw error;
    return data;
  }

  async updateTaskStatus(taskId: string, newStatus: string) {
    const { error } = await this.supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    if (error) throw error;
  }

  async deleteTask(taskId: string) {
    const { error } = await this.supabase.from('tasks').delete().eq('id', taskId);
    if (error) throw error;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}

import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanService } from '../../core/kanban.service.ts';
import { Task, TaskStatus, KanbanColumn } from '../../models/task.model.ts';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {

columns: KanbanColumn[] = [
    { id: TaskStatus.DIRTY, title: 'Dirty', tasks: [], color: '#ef4444' },
    { id: TaskStatus.ASSIGNED, title: 'Assigned', tasks: [], color: '#f59e0b' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', tasks: [], color: '#3b82f6' },
    { id: TaskStatus.INSPECTION, title: 'Inspection', tasks: [], color: '#8b5cf6' },
    { id: TaskStatus.CLEAN, title: 'Clean', tasks: [], color: '#10b981' }
  ];

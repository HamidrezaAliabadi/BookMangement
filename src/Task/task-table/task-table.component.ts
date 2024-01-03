import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Task } from '../Task';
import { HighlightDirective } from '../../highlight.directive';
import { TaskService } from '../task.service';
import { LocalStorageService } from '../../app/shared/local-storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    NgIf,
    IconButtonComponent,
    HighlightDirective,
    RouterLink],
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent {
  filteredTasks: Task[] = []

  constructor(private readonly taskService: TaskService, private readonly localStorageService: LocalStorageService) {
    this.refresh()
  }

  refresh() {
    this.filteredTasks = this.taskService.tasks
  }

  changeStatus(taskId: number, status: number) {
    const task = this.taskService.find(taskId)!
    task.status = status
    const list = JSON.parse(this.localStorageService.getItem('tasks'))
    if (list) {
      localStorage.setItem('tasks', JSON.stringify(this.taskService.tasks))
    }
  }

  deleteTask(taskId: number) {
    const task = this.taskService.find(taskId)!
    if (confirm('آیا از حذف این ردیف مطمئن هستید؟') == true)
      this.taskService.delete(task)
  }

  changeCursor(itemId: number) {
    const a = document.getElementById('td' + itemId.toString())!
    a.style.cursor = "pointer"
  }

  trackByItems(index: number, task: Task): number {
    return task.id
  }

  editTask(taskId: number) {
    const task = this.taskService.find(taskId)!
    this.taskService.taskTitle = task.title
    this.taskService.taskId = task.id
  }
}

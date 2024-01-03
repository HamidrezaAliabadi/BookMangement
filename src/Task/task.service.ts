import { Injectable } from '@angular/core';
import { Task } from './Task';
import { LocalStorageService } from '../app/shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = []
  private lsName = 'tasks'
  taskTitle = ''
  taskId = 0
  
  
  constructor(private readonly localStorageService:LocalStorageService) {
    this.tasks = this.initList()
  }

  initList(): Task[] {

    const list = JSON.parse(this.localStorageService.getItem(this.lsName))
    if (!list)
      return []
    return list
  }

  list() {
    return this.tasks
  }

  add(task: Task) {
    this.tasks.push(task)
    localStorage.setItem(this.lsName, JSON.stringify(this.tasks))
  }

  find(id: number) {
    return this.tasks.find(x => x.id == id)
  }

  findBy(title: string) {
    return this.tasks.find(x => x.title == title)
  }

  deleteAll() {
    this.tasks = []
    localStorage.removeItem(this.lsName)
  }

  length() {
    return this.tasks.length
  }

  delete(task: Task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    localStorage.setItem(this.lsName, JSON.stringify(this.tasks))
  }
}

import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { FormsModule } from '@angular/forms';
import { Task } from '../Task';
import { TaskService } from '../task.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    IconButtonComponent,
    RouterLink],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  taskTitle = ''
  taskId = 0
  @Output() onDeleteAllClicked = new EventEmitter()

  constructor(private readonly taskService: TaskService,
    private readonly router: Router) {
    this.taskTitle = this.taskService.taskTitle
    this.taskId = this.taskService.taskId
  }

  addTask() {
    if (!this.taskTitle) {
      alert('عنوان کار نمی تواند خالی باشد.')
      return
    }

    if (this.taskService.findBy(this.taskTitle)) {
      alert('این کار قبلا تعریف شده است.')
      return
    }

    if (this.taskService.taskId == 0) {
      const task: Task = {
        id: this.taskService.length() + 1,
        title: this.taskTitle,
        status: 1
      }
      this.taskService.add(task)
    }
    else {
      const task = this.taskService.find(this.taskId)!
      task.title = this.taskTitle
    }
    this.taskTitle = ''
    this.taskId = 0
    this.router.navigateByUrl('/task-table')
  }

  deleteAll() {
    if (confirm('آیا از حذف کل لیست مطمئن هستید؟') == true) {
      this.taskService.deleteAll()
      this.onDeleteAllClicked.emit()
    }
  }

  titleFilter() {
    if (this.taskTitle.trim() != '') {
      this.taskService.tasks.filter(x => x.title.includes(this.taskTitle))
    }
    else {
      this.taskService.tasks
    }
  }

  toPersian(event: any) {
    const parsianCharachter = ' !"#$%،گ)(×+و-./0123456789:ك,=.؟@ِذ}ىُيلا÷ـ،/’د×؛َءٍف‘{ًْإ~جژچ^_پشذزيثبلاهتنمئدخحضقسفعرصطغظ<|>ّ'
    if (event.keyCode > 31)
      if (event.keyCode < 128) {
        // console.log(String.fromCharCode(parsianCharachter.charCodeAt(event.keyCode - 32)));
        event.target.value = event.target.value + String.fromCharCode(parsianCharachter.charCodeAt(event.keyCode - 32));
        event.keyCode = 0;
      }
  }
}

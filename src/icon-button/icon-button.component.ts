import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  template: `<button [type]="type" class="btn btn-{{color}} {{customClass}}" data-toggle="tooltip" title="{{title}}" (click)="onClick()">
    <i class="bi bi-{{icon}}">{{label}}</i>
</button>`
})
export class IconButtonComponent {
  @Input() color: string = ''/*'primary' | 'danger' | 'warning' | 'secondry' | 'info' = 'primary'*/
  @Input() title: string = ''
  @Input() type: 'submit' | 'button' | 'menu' | 'reset' = 'button'
  @Input() label: string = ''
  @Input({ required: true }) icon: string = ''
  @Input() customClass: string = ''

  @Output() clicked = new EventEmitter()
  onClick() {
    this.clicked.emit()
  }

    // @Output() clicked = new EventEmitter<string>()پارامتر داشته باشد
  // onClick() {
  //   this.clicked.emit('this is a string')
  // }
}

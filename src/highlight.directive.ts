import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() color = ''
  constructor(private element: ElementRef) { }
  @HostListener('mouseenter') OnMouseEnter() {
    this.highlight(this.color)
  }

  @HostListener('mouseleave') OnMouseLeave() {
    this.highlight('')
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color
  }
}

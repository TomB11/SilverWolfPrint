import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFocusOff]'
})
export class FocusOffDirective {
  @Output() focusOff = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.focusOff.emit();
    }
  }
}

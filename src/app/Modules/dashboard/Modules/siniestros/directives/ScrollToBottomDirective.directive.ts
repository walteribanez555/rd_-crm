// scroll-to-bottom.directive.ts
import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements AfterViewChecked {
  constructor(private el: ElementRef) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    } catch (err) {}
  }
}

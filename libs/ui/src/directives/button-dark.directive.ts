import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[btnDark]',
  standalone: true,
})
export class ButtonDarkDirective {
  @Input() w_full = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.el.nativeElement.classList.add(
      'h-10',
      'bg-primary',
      'border-2',
      'border-primary',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'duration-300',
      'ease-in-out',
      'font-medium',
      'hover:bg-white',
      'hover:text-primary',
      'px-6',
      'py-2',
      'rounded-full',
      'text-sm',
      'text-white',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center'
    );
    if (this.w_full) this.renderer.addClass(this.el.nativeElement, 'w-full');
  }
}


@Directive({
  selector: '[btnWhite]',
  standalone: true,
})
export class ButtonWhiteDirective {
  @Input() w_full = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.el.nativeElement.classList.add(
      'h-10',
      'bg-white',
      'border-2',
      'border-primary',
      'hover:border-white',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'duration-300',
      'ease-in-out',
      'font-medium',
      'hover:bg-primary',
      'hover:text-white',
      'px-6',
      'py-2',
      'rounded-full',
      'text-sm',
      'text-primary',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center'
    );
    if (this.w_full) this.renderer.addClass(this.el.nativeElement, 'w-full');
  }
}

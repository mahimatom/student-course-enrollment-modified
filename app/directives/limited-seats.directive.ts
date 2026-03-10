import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLimitedSeats]',
  standalone: true
})
export class LimitedSeatsDirective implements OnInit {
  @Input() appLimitedSeats: number = 0;
  @Input() threshold: number = 2;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appLimitedSeats <= this.threshold) {
      this.el.nativeElement.style.backgroundColor = '#ffebee';
      this.el.nativeElement.style.color = '#c62828';
      this.el.nativeElement.style.fontWeight = 'bold';
      this.el.nativeElement.style.padding = '0.5rem';
      this.el.nativeElement.style.borderRadius = '4px';
      this.el.nativeElement.style.border = '2px solid #c62828';
    }
  }
}

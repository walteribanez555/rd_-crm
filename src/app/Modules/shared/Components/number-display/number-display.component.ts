import { trigger, state, animate, style, transition } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'number-display',
  templateUrl: './number-display.component.html',
  styleUrls: ['./number-display.component.css'],
  animations: [
    trigger('countUpAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50%)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('{{duration}}ms ease-in-out'))
    ])
  ]
})
export class NumberDisplayComponent implements OnInit{

  currentNumber: number = 0;
  @Input() finalNumber! : number
  duration: number = 10000; // 2 seconds

  ngOnInit() {
    this.animateNumber();
  }

  calculateSpeed(): number {
    const difference = this.finalNumber - this.currentNumber;
    return Math.max(1, Math.ceil(this.duration / Math.abs(difference))); // Ensure the speed is at least 1
  }

  animateNumber() {
    const speed = this.calculateSpeed();
    const interval = setInterval(() => {
      if (this.currentNumber < this.finalNumber) {
        this.currentNumber += speed;
        if (this.currentNumber > this.finalNumber) {
          this.currentNumber = this.finalNumber; // Ensure the final number is exactly the desired one
        }
      } else {
        clearInterval(interval);
      }
    }, 1000 / 30); // Reduce the frequency of updates to 30 times per second
  }
}

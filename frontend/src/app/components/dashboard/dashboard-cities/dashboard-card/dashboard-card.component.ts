import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';

@Component({
  selector: 'dashboard-card',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(400, style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent {
  @Input() building!: Building;
  mouseOverCard: boolean = false;

  constructor() {}

  toggleCardInfo() {
    this.mouseOverCard = !this.mouseOverCard;
  }
}

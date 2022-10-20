import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';

@Component({
  selector: 'building-card',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(400, style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.css'],
})
export class BuildingCardComponent {
  @Input() building!: Building;
  mouseOverCard = false;

  toggleCardInfo() {
    this.mouseOverCard = !this.mouseOverCard;
  }
}

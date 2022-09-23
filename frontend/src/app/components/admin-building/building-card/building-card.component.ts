import { Component, Input } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';

@Component({
  selector: 'building-card',
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.css'],
})
export class BuildingCardComponent {
  @Input() building!: Building;
  mouseOverCard: boolean = false;
  constructor() {}

  changeView(e: any) {
    this.mouseOverCard = e.type == 'mouseenter' ? true : false;
  }
}

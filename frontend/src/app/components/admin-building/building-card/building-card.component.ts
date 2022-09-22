import { Component, Input, OnInit } from '@angular/core';
import { Building } from 'src/app/helpingHand/buidling';

@Component({
  selector: 'building-card',
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.css'],
})
export class BuildingCardComponent implements OnInit {
  @Input() building!: Building;
  constructor() {}

  ngOnInit(): void {}
}

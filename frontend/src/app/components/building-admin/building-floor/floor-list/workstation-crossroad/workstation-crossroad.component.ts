import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'workstation-crossroad',
  templateUrl: './workstation-crossroad.component.html',
  styleUrls: ['./workstation-crossroad.component.css']
})
export class WorkstationCrossroadComponent implements OnInit {

  @Output() switchComponents = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

// COMPONENT OBSOLETE, NOW WORKING WITH VERSION WITHOUT THIS COMPONENT

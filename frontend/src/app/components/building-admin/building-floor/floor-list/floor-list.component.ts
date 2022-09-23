import { Component, OnInit, Input } from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import { Workstation } from 'src/app/help-files/workstation-interface';


@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  panelOpenState = false;

  @Input() floorList?: Floor[];
  @Input() workstationList?: Workstation[];

  constructor() { }

  ngOnInit(): void {
  }

  

}

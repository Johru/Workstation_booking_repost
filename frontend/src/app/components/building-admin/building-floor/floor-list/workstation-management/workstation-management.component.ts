import { Component, OnInit, Input } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';

import { Workstation } from 'src/app/help-files/workstation-interface';


@Component({
  selector: 'workstation-management',
  templateUrl: './workstation-management.component.html',
  styleUrls: ['./workstation-management.component.css']
})
export class WorkstationManagementComponent implements OnInit {
 
  @Input() floorList?: Floor[];

  @Input() workstationList?: Workstation[];

  constructor() { }

  ngOnInit(): void {
   
  }

}

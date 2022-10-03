import { Component, OnInit, Input } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';

import { WorkstationInterface } from 'src/app/help-files/workstation-interface';


@Component({
  selector: 'workstation-management',
  templateUrl: './workstation-management.component.html',
  styleUrls: ['./workstation-management.component.css']
})
export class WorkstationManagementComponent implements OnInit {
  selectedWorkstation?: WorkstationInterface;
  workstationIsSelected: boolean = false;
  // indexOfWorkstation?: string = '';
  selectedIndex: any;

  @Input() floorList?: Floor[];
  @Input() workstationList?: WorkstationInterface[];


  constructor() { }

  ngOnInit(): void {
    //  this.selectedWorkstation = this.workstationList[0].workstation_name.
  }

  onSelect(workstation: WorkstationInterface, i: number): void {
    this.selectedWorkstation = workstation;
   
   this.selectedIndex = i;

    this.workstationIsSelected = true;
    console.log(this.selectedWorkstation)
    console.log(this.selectedIndex)
  }

  // disableSelectedWorkstation(index: number): void {


  // }

  deleteWorkstation(): void {
    this.workstationList?.splice(this.selectedIndex, 1)
    console.log(this.workstationList)

    
    this. workstationIsSelected = false;
    console.log(this.workstationIsSelected)

   
  }

}

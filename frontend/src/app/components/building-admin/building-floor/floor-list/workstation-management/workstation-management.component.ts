import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedIndex: any;
  defaultText: string = 'Select a workstation';
  selected = 'option0';
  disableButton: boolean = true;
  confirmDeleteValue: boolean = false;

  @Input() floorList?: Floor[];
  @Input() workstationList?: WorkstationInterface[];
  @Input() managementButtonMenuVisible?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    //  this.selectedWorkstation = this.workstationList[0].workstation_name.
  }

  onSelect(workstation: WorkstationInterface, i: number): void {       
      this.selectedWorkstation = workstation;
    this.selectedIndex = i;
    this.disableButton = false;
   

    // console.log(this.selectedWorkstation)
    // console.log(this.selectedIndex)
  }

  disableSelected(): string {
    return this.selected;
  }

  deleteWorkstation(): void {

    this.workstationList?.splice(this.selectedIndex, 1)
    console.log(this.workstationList)

    this.workstationIsSelected = false;
    console.log(this.workstationIsSelected)
    this.disableSelected()

    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
    // console.log('workstation deleted')
  }

  cancelDelete(event: boolean) {
    if (event) {
      this.confirmDeleteValue = event;

    }
  }

  confirmDelete(event: boolean) {
    if (event) {
      this.confirmDeleteValue = event;
    }
    this.deleteWorkstation()
  }

}

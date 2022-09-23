import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'workstation-management',
  templateUrl: './workstation-management.component.html',
  styleUrls: ['./workstation-management.component.css']
})
export class WorkstationManagementComponent implements OnInit {

  selected = 'None';

  constructor() { }

  ngOnInit(): void {
  }

}

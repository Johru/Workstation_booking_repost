import { EmitterVisitorContext } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
// import { Workstation } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css']
})
export class WorkstationPreviewInputComponent implements OnInit {

  // @Input() panelOpenState?: boolean;

  @Input() buttonValueToFalse?: boolean;
  @Output() closePanel = new EventEmitter();
  

  newWorkstationForm = new FormGroup({ // error because thit part
    // floor_id: new FormControl(),
    workstation_name: new FormControl(),
    seats: new FormControl()
  })

  workstation!: WorkstationInterface;
  // workstations: Floor[] = [];
 

 
  // @Input() previewMenuVisible?: boolean;
  @Output() newWorkstationEvent = new EventEmitter<WorkstationInterface>();
  // @Output() switchComponents = new EventEmitter();

  // @Output() newWorkstationEvent = new EventEmitter<Floor>();

  constructor(private floorService: FloorService,
          private router: Router,
          private route: ActivatedRoute    
    ) { }


  onSubmit(): void {
    this.workstation = { //rework
      // floor_id: this.newWorkstationForm.value.floor_id,
      workstation_name: this.newWorkstationForm.value.workstation_name,
      seats: Number(this.newWorkstationForm.value.seats),
      workstation_isActive: true
    }
    this.newWorkstationEvent.emit(this.workstation); // rework
    this.newWorkstationForm.reset(); //rework
    console.log(this.workstation); //rework

    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['./'], {
    //   relativeTo: this.route
    // })
    // console.log('reset page')
  
  }

  clickToClosePanel(): void {
    this.closePanel.emit();
  }

  ngOnInit(): void {
  }

  // resetPage() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['./'], {
  //     relativeTo: this.route
  //   })
  //   console.log('reset page')
  // }


  // getWorkstation(): void {
  //   this.workstations = this.floorService.getWorkstation();
  // }

 

    // onChange(): void {
    //   this.getWorkstation();
    // }

}

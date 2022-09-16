import { Component, OnInit } from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-selection-book',
  templateUrl: './workstation-selection-book.component.html',
  styleUrls: ['./workstation-selection-book.component.css'],
})
export class WorkstationSelectionBookComponent implements OnInit {
  workstations?: IWorkstation[];

  selectedWs: string | number = 'default';

  constructor(private wsService: WorkstationService) {}

  ngOnInit(): void {
    this.getWsList();
  }

  getWsList() {
    this.workstations = this.wsService.getWorkstations();
  }

  showForm() {
    return this.selectedWs === 'default' ? false : true;
  }

  onSelection(selected: string | number) {
    this.selectedWs = selected;
  }
}

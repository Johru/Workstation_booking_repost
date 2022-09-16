import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';

@Component({
  selector: 'workstation-tab',
  templateUrl: './workstation-tab.component.html',
  styleUrls: ['./workstation-tab.component.css']
})
export class WorkstationTabComponent implements OnInit {

  @Input() wsList? : IWorkstation[];
  @Output() selectedWorkstation = new EventEmitter<string | number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any): void {
    this.selectedWorkstation!.emit(e.target.value);
  }
}

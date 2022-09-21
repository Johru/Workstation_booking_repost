import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';

@Component({
  selector: 'workstation-tab',
  templateUrl: './workstation-tab.component.html',
  styleUrls: ['./workstation-tab.component.css'],
})
export class WorkstationTabComponent implements OnInit, OnChanges {
  @Input() wsList?: IWorkstation[];
  @Output() selectedWorkstation = new EventEmitter<{
    id: string | number;
    name: string;
  }>();

  @Input() canceledOnTab?: boolean;
  @Output() canceledOnTabChange = new EventEmitter<boolean>();

  value: string | number = 'default';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.canceledOnTab) {
      this.resetOnCancel(changes['canceledOnTab'].currentValue);
    }
  }

  onChange(e: any): void {
    let value = e.target.value;
    if (e.target.value == 'default') {
      value = 0;
    }
    this.selectedWorkstation!.emit({
      id: e.target.value,
      name: e.target.options[value].text,
    });
  }

  resetOnCancel(cancel: boolean): void {
    if (cancel) {
      this.value = 'default';
      this.selectedWorkstation!.emit({
        id: this.value,
        name: 'Select a Workstation',
      });
    }
    this.canceledOnTab = false;
    this.canceledOnTabChange.emit(this.canceledOnTab);
  }
}

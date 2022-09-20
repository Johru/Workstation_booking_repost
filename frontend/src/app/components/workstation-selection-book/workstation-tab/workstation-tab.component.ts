import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';

@Component({
  selector: 'workstation-tab',
  templateUrl: './workstation-tab.component.html',
  styleUrls: ['./workstation-tab.component.css'],
})
export class WorkstationTabComponent implements OnInit {
  @Input() wsList?: IWorkstation[];
  @Output() selectedWorkstation = new EventEmitter<{
    id: string | number;
    name: string;
  }>();

  @Input() canceledOnTab?: boolean;

  value: string | number = 'default';

  constructor() {}

  ngOnInit(): void {
    this.canceledOnTab = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['canceledOnTab'].currentValue);
    if (this.canceledOnTab) {
      this.resetOnCancel(changes['canceledOnTab'].currentValue);
    }
    console.log(this.canceledOnTab);
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
    console.log(cancel);
    console.log(this.canceledOnTab);
    if (cancel) {
      this.value = 'default';
      this.selectedWorkstation!.emit({
        id: this.value,
        name: 'Select a Workstation',
      });
      this.canceledOnTab = false;
    }
  }
}

//second cancel does nothing first one works

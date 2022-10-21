import {
  Component,
  EventEmitter,
  Input,
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
export class WorkstationTabComponent implements OnChanges {
  @Input() workstationList?: IWorkstation[];
  @Output() selectedWorkstation = new EventEmitter<{
    id: number;
    name: string;
  }>();
  @Input() canceledOnTab?: boolean;
  @Output() canceledOnTabChange = new EventEmitter<boolean>();
  @Output() seats = new EventEmitter<void>();
  selectedValue = 0;
  defaultSelectionText = 'Select a workstation';
  workstationName?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (this.canceledOnTab) {
      this.resetOnCancel(changes['canceledOnTab'].currentValue);
    }
  }

  onChangeSelection(): void {
    if (this.selectedValue == 0) {
      this.selectedWorkstation!.emit({
        id: 0,
        name: this.defaultSelectionText,
      });
    } else {
      this.selectedWorkstation!.emit({
        id: this.selectedValue,
        name: this.getWorkstationName(this.selectedValue as number)!,
      });
      this.seats!.emit();
    }
  }

  getWorkstationName(id: number): string | undefined {
    return this.workstationList?.find(
      workstation => workstation.workstation_id == id
    )?.workstation_name;
  }

  resetOnCancel(cancel: boolean): void {
    if (cancel) {
      this.selectedValue = 0;
      this.selectedWorkstation!.emit({
        id: this.selectedValue,
        name: this.defaultSelectionText,
      });
    }
    this.canceledOnTab = false;
    this.canceledOnTabChange.emit(this.canceledOnTab);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seat } from 'src/app/helpingHand/seat';

@Component({
  selector: 'seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent {
  @Input() seats?: Seat[];
  @Output() selectedSeat = new EventEmitter<number>();

  isItTaken(userName: string | null): string {
    if (userName == null) {
      return '';
    }
    return `Booked by ${userName}`;
  }

  disableSeat(userName: string | null): boolean {
    if (userName == null) {
      return false;
    } else {
      return true;
    }
  }

  emitCheckedSeat(e: Event) {
    const target: HTMLInputElement =
      this.setTheTargetToParentIfClickedOnTheChild(
        e.target as HTMLInputElement
      );
    this.checkOnlyOneSeat(target);
    if (target.classList.contains('checked')) {
      this.selectedSeat.emit(parseInt(target.value));
    } else {
      this.selectedSeat.emit(0);
    }
  }

  setTheTargetToParentIfClickedOnTheChild(target: HTMLInputElement) {
    const isItTaken = target.classList.contains('on-hover');
    let targetElement = target;
    if (isItTaken) {
      targetElement = target.parentElement as HTMLInputElement;
    }
    return targetElement;
  }

  checkOnlyOneSeat(target: HTMLElement) {
    const hasClass = target.classList.contains('checked');
    if (hasClass) {
      target.classList.remove('checked');
    } else {
      Array.from(target.parentElement!.children).forEach((button: Element) => {
        button.classList.remove('checked');
      });
      target.classList.add('checked');
    }
  }
}

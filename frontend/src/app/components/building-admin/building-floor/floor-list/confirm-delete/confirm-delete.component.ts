import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  @Output() cancelDeleteEmitter = new EventEmitter<boolean>();
  @Output() confirmDeleteEmitter = new EventEmitter<boolean>();

  confirmDeleteValue: boolean = true;
  cancelDeleteValue: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete(): void {
    this.confirmDeleteEmitter.emit(this.confirmDeleteValue);   
  }

  cancelDelete(): void {
    this.cancelDeleteEmitter.emit(this.cancelDeleteValue);
  }

}

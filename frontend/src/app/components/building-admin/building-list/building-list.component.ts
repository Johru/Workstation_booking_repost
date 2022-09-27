import { Component, OnInit, Input } from '@angular/core';
import { Building } from 'src/app/help-files/buildind-interface';

@Component({
  selector: 'building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {  

  @Input() buildingList?: Building[];

  constructor() { }

  ngOnInit(): void {
    
  }

}

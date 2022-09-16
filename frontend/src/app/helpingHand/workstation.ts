export class Workstation {
  id: number;
  floor_id : number;
  name: 'string';
  status: boolean;

  constructor(data:any) {
    this.id = data.id;
    this.floor_id = data.floor_id;
    this.name = data.floor_id;
    this.status = data.status;
  }

  putInTheSeats(data:any, wsId: number) {
    
  }

}

import { WorkstationInterface } from '../help-files/workstation-interface';

export interface Success {
  success: string;
}

export interface ResponseI {
  status: string;
  message: string[];
  workstation?: WorkstationInterface;
}

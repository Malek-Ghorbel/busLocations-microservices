import { Stops } from "./stops.enum";

export interface Bus {
  id : number ;
  latitude: number;
  longitude: number;
  timestamp: number;
  nextStop : Stops ;
}

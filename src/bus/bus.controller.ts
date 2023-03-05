import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { BusService } from './bus.service';
import { BusById } from './interfaces/bus-by-id.interface';
import { Bus } from './interfaces/bus.interface';
import { Location } from './interfaces/location.interface';

@Controller('bus')
export class BusController  {
  constructor(private  busService : BusService) {}

  //the user sends id to find the position of that exact bus
  @GrpcMethod('BusService' , 'FindBusById')
  findBusById(busById: BusById): Bus {
    return this.busService.findBusById(busById.id)
  }

  //the user sends his position and this return buses sorted by the distance from his position
  @GrpcMethod('BusService', 'FindBusesSortedByClosest')
  findBusesSortedByClosest(location: Location): Observable<Bus> {
    return this.busService.findBusesSortedByClosest(location) ;
  }
}

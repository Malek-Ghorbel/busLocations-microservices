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
import { NoParam } from './interfaces/no-param.interface';
import { Location } from './interfaces/location.interface';

@Controller('bus')
export class BusController  {
  constructor(private  busService : BusService) {}

  @GrpcMethod('BusService' , 'FindOne')
  findOne(busById: BusById): Bus {
    return this.busService.findOne(busById.id)
  }

  @GrpcMethod('BusService', 'FindMany')
  findMany(request: Location): Observable<Bus> {
    return this.busService.findMany(request) ;
  }
}

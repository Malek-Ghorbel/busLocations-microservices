import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, of, Subject } from 'rxjs';
import { BusById } from './interfaces/bus-by-id.interface';
import { Bus } from './interfaces/bus.interface';
import { Location } from './interfaces/location.interface';

interface IBusService {
    findOne(data: BusById): Observable<Bus>;
    findMany(upstream: Observable<BusById>): Observable<Bus>;
}

@Injectable()
export class BusService implements OnModuleInit {
    private readonly items: Bus[] = [
        {
          id: 2,
          latitude: 37.7749,
          longitude: -122.4194,
          timestamp: 12
        },
        {
            id: 1,
            latitude: 86.7749,
            longitude: -557.4194,
            timestamp: 988
        },
        {
            id: 3,
            latitude: 0,
            longitude: 0,
            timestamp: 5
        },
    ];
    private protoBusService : IBusService ;
    
    constructor(@Inject('BUS_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.protoBusService = this.client.getService<IBusService>('BusService');
    }

    findOne(id: number): Bus {
        return this.items.find((element) => element.id == id);
    }

    findMany(location : Location) : Observable<Bus> {
        const closerBus = (bus1 :Bus , bus2 : Bus) => {
            return this.distance(location , bus1.latitude , bus1.longitude) 
                - this.distance(location , bus2.latitude , bus2.longitude)
        }
        this.items.sort(closerBus);
        const observable = new Observable<Bus>((subscriber) => {
            this.items.forEach((e)=>{
                subscriber.next(e);
            }) ;
            subscriber.complete();
        });
        return observable ;
    }

    private distance(location : Location , targetLattitude : number , targetLongitude : number ) : number {
        return Math.sqrt(
            Math.pow((location.latitude - targetLattitude) , 2)
            + Math.pow((location.longitude - targetLongitude) , 2)
        )
    }
}

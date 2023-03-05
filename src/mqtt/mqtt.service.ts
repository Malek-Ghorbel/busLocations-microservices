import { Injectable } from '@nestjs/common';
import { Stops } from '../bus/interfaces/stops.enum';
import { Bus } from '../bus/interfaces/bus.interface';

@Injectable()
export class MqttService {
    private items: Bus[] = [
        {
          id: 2,
          latitude: 37.7749,
          longitude: -122.4194,
          timestamp: 12,
          nextStop: Stops.Oulu
        },
        {
            id: 1,
            latitude: 86.7749,
            longitude: -557.4194,
            timestamp: 988,
            nextStop : Stops.Helsinki
        },
        {
            id: 3,
            latitude: 0,
            longitude: 0,
            timestamp: 5,
            nextStop : Stops.Helsinki
        },
    ];
    addOrUpdateLocation(data : Bus) {
        const bus = this.items.find((element) => element.id == data.id) ;
        if (bus) {
            //the bus already exists we update position
            const index = this.items.indexOf(bus) ;
            this.items[index] = data ;
        }
        else {
            //bus doesn't exist we add it
            this.items.push(data) ;
        }
        console.log(this.items);
    }
}

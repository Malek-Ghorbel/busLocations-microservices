import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload, Transport } from '@nestjs/microservices';
import { Bus } from '../bus/interfaces/bus.interface';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
    constructor (private mqttService : MqttService){}

    //subscribe to the telemetry topic to get the location of buses
    //we assume the telemetry sent by the bus follows our defined businterface
    @MessagePattern('telemetry', Transport.MQTT)
    getNotifications(@Payload() data : Bus, @Ctx() context: MqttContext) {
      console.log(context.getTopic());
      
        this.mqttService.addOrUpdateLocation(data) ;
        console.log('Client data received: ', data);
        return `I Got Message From Client: ${data}`
    }
}

import { Module } from '@nestjs/common';
import { BusModule } from './bus/bus.module';
import { MqttController } from './mqtt/mqtt.controller';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [BusModule, MqttModule],
})
export class AppModule {}

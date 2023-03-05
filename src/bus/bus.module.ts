import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BUS_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}

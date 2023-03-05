import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'bus', // ['hero', 'hero2']
    protoPath: join(__dirname, './bus/bus.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};

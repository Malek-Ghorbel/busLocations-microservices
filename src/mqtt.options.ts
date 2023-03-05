import { ClientOptions, Transport } from "@nestjs/microservices";

export const mqttOptions : ClientOptions  = {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    }
}
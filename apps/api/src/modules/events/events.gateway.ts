import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { config } from '@/api/config';

@WebSocketGateway({
  cors: {
    origin: [config.CLIENT_DEVELOPMENT_URL, config.CLIENT_PRODUCTION_URL],
  },
})
@Injectable()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(EventsGateway.name);
  private connectedClients: ReadonlyArray<string> = [];

  @WebSocketServer()
  private server: Server;

  afterInit() {
    this.logger.log('Socket connection initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.connectedClients = [...this.connectedClients, client.id];
    this.server.emit('connectedClients', this.connectedClients.length);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.connectedClients = this.connectedClients.filter((id) => id !== client.id);
    this.server.emit('connectedClients', this.connectedClients.length);
  }
}

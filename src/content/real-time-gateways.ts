import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RealTimeService } from 'src/real-time/real-time.service';

@WebSocketGateway()
export class RealTimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly realTimeService: RealTimeService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    this.realTimeService.initialize(this.server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
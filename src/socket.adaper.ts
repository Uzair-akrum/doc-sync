// src/socket/socket.adapter.ts

 import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

export class SocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: socketio.ServerOptions): any {
    console.log("🚀 ~ file: socket.adaper.ts:8 ~ SocketAdapter ~ createIOServer ~ port:", port)
    const server = super.createIOServer(port, options);
    // Add any additional configurations for the server if needed
    return server;
  }
}

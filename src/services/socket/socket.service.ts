import { io, Socket } from 'socket.io-client';

import { BASE_ENDPOINT } from '@/services/api/axios';

class SocketService {
  private mainSocket: Socket | null = null;
  private tenantSocket: Socket | null = null;

  public setupMainSocketConnection(token: string) {
    if (this.mainSocket) this.mainSocket.disconnect();

    this.mainSocket = this.createSocket(token);
    this.mainSocket.on('joinTenant', (applicationId: string) => {
      this.switchToTenantSocket(token, applicationId);
    });

    this.setupConnectionEvents(this.mainSocket);
  }

  public emitMessage(channel: string, message: any) {
    if (!this.tenantSocket) return;

    this.tenantSocket.emit(channel, message);
  }

  public disconnectTenantSocket() {
    if (this.tenantSocket) {
      this.tenantSocket.emit('disconnectedUser', this.tenantSocket.id);
      this.tenantSocket.disconnect();
      this.tenantSocket = null;
    }
  }

  public getMainSocket() {
    return this.mainSocket;
  }
  public getTenantSocket() {
    return this.tenantSocket;
  }

  private switchToTenantSocket(token: string, applicationId: string) {
    if (this.mainSocket) this.mainSocket.disconnect();

    const namespace = `application-${applicationId}`;
    this.tenantSocket = this.createSocket(token, namespace);

    this.setupConnectionEvents(this.tenantSocket);
  }

  private createSocket(token: string, namespace = '') {
    const socketNamespace = namespace ? `/${namespace}` : '';

    return io(`${BASE_ENDPOINT}${socketNamespace}`, {
      transports: ['websocket'],
      secure: true,
      auth: { token },
    });
  }

  private setupConnectionEvents(socket: Socket | null) {
    if (!socket) return;

    socket.on('connect', () => {
      console.log(`Connected ${socket.id}`);
    });

    socket.on('disconnect', (reason) => {
      console.log('Reason', { reason });
    });

    socket.on('connect_error', (error) => {
      console.log(`${error}`);
    });
  }
}

export const socketService = new SocketService();

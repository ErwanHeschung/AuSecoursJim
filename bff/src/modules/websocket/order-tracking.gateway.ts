import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TableProxy } from '../back-proxy/table.proxy';
import { PreparationProxy } from '../back-proxy/preparation.proxy';

@WebSocketGateway({ cors: true })
export class OrderTrackingGateway {
    constructor(
        private readonly tableProxy: TableProxy,
        private readonly preaprationProxy: PreparationProxy,
    ) { }

    @SubscribeMessage('subscribeOrder')
    async handleSubscribe(
        @MessageBody() orderId: string,
        @ConnectedSocket() client: Socket
    ) {
        const intervalId = setInterval(async () => {
            try {
                const order = await this.tableProxy.getOrder(orderId);
                const preparations = await this.preaprationProxy.getPreparations(
                    'readyToBeServed',
                    order.tableNumber
                );

                const orderPrepIds = order.preparations.map(p => p._id);
                const readyIds = preparations.map(p => p._id);
                const readyCount = orderPrepIds.filter(id => readyIds.includes(id)).length;
                const total = orderPrepIds.length;
                const progress = total > 0 ? Math.round((readyCount / total) * 100) : 0;

                client.emit('orderUpdate', { progress });

                if (progress === 100) {
                    clearInterval(intervalId);
                }
            } catch (error) {
                clearInterval(intervalId);
                client.disconnect(true);
            }
        }, 2000);

        client.on('disconnect', () => {
            clearInterval(intervalId);
        });
    }
}
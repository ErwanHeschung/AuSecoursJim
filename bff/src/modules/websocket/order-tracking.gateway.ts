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
        private readonly preparationProxy: PreparationProxy,
    ) { }

    @SubscribeMessage('subscribeOrder')
    async handleSubscribe(
        @MessageBody() orderId: string,
        @ConnectedSocket() client: Socket
    ) {
        try {
            const order = await this.tableProxy.getOrder(orderId);
            const orderPrepIds = order.preparations.map(p => p._id);

            let isActive = true;

            const pollPreparations = async () => {
                if (!isActive) return;

                try {
                    const preparations = await this.preparationProxy.getPreparations(
                        'readyToBeServed',
                        order.tableNumber
                    );

                    const readyIds = preparations.map(p => p._id);
                    const readyCount = orderPrepIds.filter(id => readyIds.includes(id)).length;
                    const total = orderPrepIds.length;
                    const progress = total > 0 ? Math.round((readyCount / total) * 100) : 0;

                    client.emit('orderUpdate', { progress });

                    if (progress < 100) {
                        setTimeout(pollPreparations, 2000);
                    } else {
                        isActive = false;
                    }
                } catch (error) {
                    isActive = false;
                    client.emit('error', { message: 'Failed to fetch preparations' });
                    client.disconnect(true);
                }
            };

            pollPreparations();

            client.on('disconnect', () => {
                isActive = false;
            });
        } catch (error) {
            client.emit('error', { message: 'Failed to fetch order' });
            client.disconnect(true);
        }
    }
}
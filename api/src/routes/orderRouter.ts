import { Request, Response, Router } from 'express';
import OrderService from '../services/order.service';
import OrderItemService from '../services/orderitem.service';
import { getSessionUser } from '../utils/commonutils';

class OrderRouter {
    private _router: Router;
    private service: OrderService;
    private orderItemService: OrderItemService;

    constructor() {
        this.service = OrderService.getInstance();
        this.orderItemService = OrderItemService.getInstance();
        this._router = Router();
        this._router.post('', (req, res) => this.create(req, res));
    }

    router(): Router {
        return this._router;
    }

    public static build(): Router {
        return new OrderRouter().router();
    }

    async create(req: Request, res: Response) {
        const user = getSessionUser(req);

        const orderItems = await this.orderItemService.findUserProcessingCart(user.id);

        const total = orderItems.reduce((sum, item) => {
            sum += item.quantity * item.price;
            return sum;
        }, 0);

        const serviceCharge = 30;
        const gross = Number(Number(total).toFixed(2));
        const gst = Number(Number(gross * 0.05).toFixed(2));
        const grandTotal = Number(Number(gross + gst + serviceCharge).toFixed(2));

        const order = await this.service.create({
            userId: user.id,
            serviceCharge: serviceCharge,
            gst: gst,
            total: grandTotal,
            discountApplied: 0.0
        });

        try {
            await this.orderItemService.updateUserProcessingCart(user.id, order.id);
        } catch (e) {
            await this.service.deleteById(order.id);
        }
        res.status(200).json(order);
    }
}
export default OrderRouter.build();
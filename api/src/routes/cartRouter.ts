import { Request, Response, Router } from 'express';
import MenuItemService from '../services/menuitem.service';
import OrderItemService from '../services/orderitem.service';
import { getSessionUser } from '../utils/commonutils';

class CartRouter {
    private _router: Router;
    private orderItemService: OrderItemService;
    private menuItemService: MenuItemService;

    constructor() {
        this.orderItemService = OrderItemService.getInstance();
        this.menuItemService = MenuItemService.getInstance();
        this._router = Router();
        this._router.get('/details', (req, res) => this.userItemDetails(req, res));
        this._router.get('/items', (req, res) => this.currentUserItems(req, res));
        this._router.post('/addorupdate', (req, res) => this.addOrUpdate(req, res));
        this._router.put('/:id', (req, res) => this.update(req, res));
        this._router.delete('/:id', (req, res) => this.removeItem(req, res));
    }

    router(): Router {
        return this._router;
    }

    public static build(): Router {
        return new CartRouter().router();
    }

    async removeItem(req: Request, res: Response) {
        const { id } = req.params;
        const user = getSessionUser(req);
        await this.orderItemService.deleteById(+id);
        const updatedItems = await this.orderItemService.findAllByUser(user.id)
        res.status(200).json(updatedItems);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const user = getSessionUser(req);
        await this.orderItemService.update(+id, req.body);
        const updatedItems = await this.orderItemService.findAllByUser(user.id, true);
        res.status(200).json(updatedItems);
    }

    async addOrUpdate(req: Request, res: Response) {
        const { menuItemId } = req.body;
        const user = getSessionUser(req);

        const menuItem = await this.menuItemService.findById(menuItemId);
        const orderItem = await this.orderItemService.findOne({
            menuId: menuItemId,
            userId: user.id
        });

        if (orderItem) {
            await this.orderItemService.update(orderItem.id, {
                quantity: orderItem.quantity + 1
            })
        } else {
            await this.orderItemService.create({
                quantity: 1,
                price: menuItem.unitPrice,
                menuId: menuItemId,
                userId: user.id
            });
        }
        const orderItems = await this.orderItemService.findAllByUser(user.id);
        res.status(200).json(orderItems);
    }

    async currentUserItems(req: Request, res: Response) {
        const user = getSessionUser(req);
        const orderItems = await this.orderItemService.findAllByUser(user.id);
        res.status(200).json(orderItems);
    }

    async userItemDetails(req: Request, res: Response) {
        const user = getSessionUser(req);
        const orderItems = await this.orderItemService.findAllByUser(user.id, true);
        res.status(200).json(orderItems);
    }
}
;
export default CartRouter.build();
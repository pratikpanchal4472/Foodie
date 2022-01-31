import { Request, Response, Router } from 'express';
import RestaturantService from '../services/restaurant.service';

export class RestaurantRouter {
    private _router: Router;
    private service: RestaturantService;

    constructor() {
        this.service = RestaturantService.getInstance();
        this._router = Router();
        this._router.get('/:id', (req, res) => this.findById(req, res));
        this._router.get('/', (req, res) => this.findAll(req, res));
    }

    router(): Router {
        return this._router;
    }

    public static build(): Router {
        return new RestaurantRouter().router();
    }

    async findAll(req: Request, res: Response) {
        const restaurants = await this.service.findAll();
        res.status(200).json(restaurants);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const restaurant = await this.service.findById(+id);
        res.status(200).json(restaurant);
    }
}
export default RestaurantRouter.build();
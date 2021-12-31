import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const Router = express.Router();
const prisma = new PrismaClient();

export class RestaurantRouter {
    constructor() {
        Router.get('/:id/menuitems', this.findMenuItems);
        Router.get('/', this.findAll);

    }

    public static build(): RestaurantRouter {
        return new RestaurantRouter();
    }

    async findAll(req: Request, res: Response) {
        const restaurants = await prisma.restaurant.findMany();

        res.status(200).json(restaurants);
    }

    async findMenuItems(req: Request, res: Response) {
        const { id } = req.params;

        const menuItems = await prisma.menuItem.findMany({
            where: {
                restaurantId: Number(id),
            },
        });

        res.status(200).json(menuItems);
    }
}
RestaurantRouter.build();
export default Router;
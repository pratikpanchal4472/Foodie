import { PrismaClient } from "@prisma/client";

class MenuItemService {
    private prisma: PrismaClient;
    private static _instance: MenuItemService;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new MenuItemService();
        }
        return this._instance;
    }

    findById(id: number) {
        return this.prisma.menuItem.findUnique({ where: { id } });
    }

    findOne(query: any) {
        return this.prisma.menuItem.findFirst({ where: query });
    }

    findAllByRestaurant(restaurantId: number) {
        return this.prisma.menuItem.findMany({ where: { restaurantId } });
    }

    deleteById(id: number) {
        return this.prisma.menuItem.delete({ where: { id } });
    }
}

export default MenuItemService;
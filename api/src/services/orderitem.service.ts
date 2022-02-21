import { PrismaClient } from "@prisma/client";

class OrderItemService {
    private prisma: PrismaClient;
    private static _instance: OrderItemService;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new OrderItemService();
        }
        return this._instance;
    }

    findById(id: number) {
        return this.prisma.orderItem.findUnique({ where: { id } });
    }

    findOne(query: any) {
        return this.prisma.orderItem.findFirst({ where: query });
    }

    findAllByUser(userId: number, detailed: boolean = false) {
        const query = { where: { userId } } as any;
        if (detailed) {
            query.include = {
                menuItem: {
                    include: {
                        restaurant: true
                    }
                }
            }
        }
        return this.prisma.orderItem.findMany(query);
    }

    findUserProcessingCart(userId: number) {
        const query = { where: { userId, state: 'IN_PROGRESS' } } as any;
        return this.prisma.orderItem.findMany(query);
    }

    updateUserProcessingCart(userId: number, orderId: number) {
        const query = { where: { userId, state: 'IN_PROGRESS' }, data: { orderId } } as any;
        return this.prisma.orderItem.updateMany(query);
    }

    deleteById(id: number) {
        return this.prisma.orderItem.delete({ where: { id } });
    }

    create(payload: any) {
        return this.prisma.orderItem.create({ data: payload });
    }

    update(id: number, payload: any) {
        return this.prisma.orderItem.update({
            where: { id },
            data: payload
        });
    }
}

export default OrderItemService;
import { PrismaClient } from "@prisma/client";

class OrderService {
    private prisma: PrismaClient;
    private static _instance: OrderService;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new OrderService();
        }
        return this._instance;
    }

    findById(id: number) {
        return this.prisma.order.findUnique({ where: { id } });
    }

    findOne(query: any) {
        return this.prisma.order.findFirst({ where: query });
    }

    deleteById(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }

    create(payload: any) {
        return this.prisma.order.create({ data: payload });
    }

    update(id: number, payload: any) {
        return this.prisma.order.update({
            where: { id },
            data: payload
        });
    }
}

export default OrderService;
import { PrismaClient } from "@prisma/client";

class RestaturantService {
    private prisma: PrismaClient;
    private static _instance: RestaturantService;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new RestaturantService();
        }
        return this._instance;
    }

    findAll() {
        return this.prisma.restaurant.findMany();
    }

    findById(id: number) {
        return this.prisma.restaurant.findUnique({ where: { id }, include: { menu: true } });
    }

    findOne(query: any) {
        return this.prisma.restaurant.findFirst({ where: query });
    }

    deleteById(id: number) {
        return this.prisma.restaurant.delete({ where: { id } });
    }
}

export default RestaturantService;
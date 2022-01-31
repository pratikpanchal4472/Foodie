import { PrismaClient } from "@prisma/client";

class UserService {
    private prisma: PrismaClient;
    private static _instance: UserService;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new UserService();
        }
        return this._instance;
    }

    findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findOne(query: any) {
        return this.prisma.user.findFirst({ where: query });
    }

    create(payload: any) {
        return this.prisma.user.create({ data: payload });
    }

    update(email: string, payload: any) {
        return this.prisma.user.update({
            where: { email },
            data: payload
        });
    }
}

export default UserService;
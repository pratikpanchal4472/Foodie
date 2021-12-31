import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const Router = express.Router();
const prisma = new PrismaClient();

class UserNotFoundError extends Error {
    constructor() {
        super('User not found!');
    }
}

export class UserRouter {
    constructor() {
        Router.get('/:id', this.findById);
        Router.post('/', this.save);
    }

    public static build(): UserRouter {
        return new UserRouter();
    }

    async save(req: Request, res: Response) {
        const user = req.body as Prisma.UserUncheckedCreateInput;
        let status = 200;
        if (user.id) {
            const { name, email } = user;
            await prisma.user.update({
                where: { id: user.id },
                data: { name, email },
            });
        } else {
            await prisma.user.create({ data: user });
            status = 201;
        }
        res.status(status).json()
    }

    async findById(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
            const user = await prisma.user.findUnique({ where: { id } });

            if (user === null) {
                throw new UserNotFoundError();
            }

            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    }
}
UserRouter.build();
export default Router;
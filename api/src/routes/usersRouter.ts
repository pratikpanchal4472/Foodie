import { Prisma } from '@prisma/client';
import { Request, Response, Router } from 'express';
import UserService from '../services/user.service';

class UserFetchExceptions extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserRouter {
    private _router: Router;
    private service: UserService;

    constructor() {
        this.service = UserService.getInstance();
        this._router = Router();
        this._router.get('/:id', (req, res) => this.findById(req, res));
        this._router.post('/', (req, res) => this.save(req, res));
    }

    router(): Router {
        return this._router;
    }

    public static build(): Router {
        return new UserRouter().router();
    }

    async save(req: Request, res: Response) {
        const user = req.body as Prisma.UserUncheckedCreateInput;
        let status = 200;
        const { name, email, profileId, image } = user;
        const existingUser = await this.service.findByEmail(email);

        let updatedUser;
        if (existingUser) {
            updatedUser = await this.service.update(email,
                { name, profileId: profileId || null, image: image || null });
        } else {
            updatedUser = await this.service.create(user);
            status = 201;
        }
        delete updatedUser.password;
        res.status(status).json(updatedUser);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await this.service.findById(+id);
            if (user === null) {
                throw new UserFetchExceptions('User not found!');
            }
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    }
}
export default UserRouter.build();
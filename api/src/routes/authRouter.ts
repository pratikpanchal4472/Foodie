import { Request, Response, Router } from 'express';
import UserService from '../services/user.service';
import { getSessionUser } from '../utils/commonutils';

class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class AuthRouter {
    private _router: Router;
    private service: UserService;

    constructor() {
        this.service = UserService.getInstance();
        this._router = Router();
        this._router.post('/login', (req, res) => this.authenticate(req, res));
        this._router.post('/profile/session', (req, res) => this.updateSession(req, res));
        this._router.get('/session', (req, res) => this.getSession(req, res));
        this._router.post('/logout', (req, res) => this.logout(req, res));
    }

    router(): Router {
        return this._router;
    }

    public static build(): Router {
        return new AuthRouter().router();
    }

    async authenticate(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.service.findOne({
                AND: {
                    email,
                    password
                }
            });

            if (user === null) {
                throw new AuthenticationError('Bad Credentials!');
            }

            delete user.password;
            // Updating the user to the session
            const session = req.session as Express.Session;
            session._user = JSON.stringify(user);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    }

    async getSession(req: Request, res: Response) {
        const user = getSessionUser(req);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                error: 'Unauthorized'
            });
        }
    }

    async updateSession(req: Request, res: Response) {
        const { profileId } = req.body;

        const profileUser = await this.service.findOne({ profileId });

        const session = req.session as Express.Session;
        if (profileUser) {
            session._user = JSON.stringify(profileUser);
            res.status(200).json(profileUser);
        }

        res.status(400).json({
            error: 'Something went wrong, try again after sometime.'
        });
    }

    async logout(req: Request, res: Response) {
        req.session.destroy(error => {
            if (error) {
                res.status(400).json({ error });
            }
            res.status(200).json({});
        });
    }
}
export default AuthRouter.build();
import { Request } from 'express';

export const getSessionUser = (req: Request) => {
    const session = req.session as Express.Session;
    if (session._user) {
        return JSON.parse(session._user);
    }
    return undefined;
}
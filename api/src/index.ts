import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import logger from 'morgan';
import { createClient } from 'redis';
import authRouter from './routes/authRouter';
import cartRouter from './routes/cartRouter';
import restaurantRouter from './routes/restaurantRouter';
import usersRouter from './routes/usersRouter';

declare global {
    namespace Express {
        interface Session {
            _user?: string
        }
    }
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

const RedisStore = connectRedis(session);
//Configure redis client
const redisClient = createClient({ legacyMode: true });
redisClient.on('connect', () => {
    console.log('Connected to redis successfully');
}).on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
}).on('end', () => {
    console.log('CacheStore - Connection status: disconnected');
}).on('reconnecting', () => {
    console.log('CacheStore - Connection status: reconnecting');
});

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_SALT_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 30 * 60 * 1000 // session max age in miliseconds
    }
}));
redisClient.connect();

app.use('/auth', authRouter);
app.use('/restaurants', restaurantRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

app.use((req: Request, res: Response, next) => {
    if (req.url.indexOf('/auth') === -1) {
        const session = req.session as Express.Session;
        if (!session._user) {
            res.status(400).json({ message: 'Session Timedout' });
        }
    }
    next();
});

app.listen(3200, () => console.log(`🚀 Server ready at: http://localhost:3200`));
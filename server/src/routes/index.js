import authRouter from './auth.js';

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter);

    app.use('/', (req, res) => {
        res.send('server on...');
    });
};

export default initRoutes;

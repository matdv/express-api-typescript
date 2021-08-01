import express from 'express';

export const userRouter = express.Router();

// get users
userRouter.get('/', (req, res) => {
    res.json({ name: 'john do' });
});

import express from 'express';

import { userConstroller } from '../controllers/userController.js';
import userAuth from '../middlewares/authmiddleware.js';

const router = express.Router();

//route to get users
router.get('/', (req, res) => {
    res.send('Hello World');
});

// route to update the users
router.put('/update-user', userAuth, userConstroller);

export default router


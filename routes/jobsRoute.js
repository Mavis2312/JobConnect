import express from 'express';
import userAuth from '../middlewares/authmiddleware.js';

const router = express.Router();

//routes
router.post('/create-job', (req, res) => {
    res.send('Job created successfully');
});

export default router;
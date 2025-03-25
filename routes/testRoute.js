import express from 'express';
import { testPostController } from '../controllers/testController.js';
import userAuth from '../middlewares/authmiddleware.js';
// router object
const router = express.Router();

// route
router.post('/test-post', userAuth, testPostController);


//export the router
export default router;
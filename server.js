// import packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import "express-async-error";

//db import
import dbConnect from './config/dbconnect.js';

//routes import
import testRoute from './routes/testRoute.js';
import authRoute from './routes/authRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoute from './routes/userRoute.js';
import jobRoute from './routes/jobRoute.js';


// config the env variables
dotenv.config();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// connect to db
dbConnect();

// routes
app.use('/api/v1/test', testRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/jobs', jobRoute);

// validation middleware
app.use(errorMiddleware);


// port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
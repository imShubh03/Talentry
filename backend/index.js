import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'

import path from 'path';

dotenv.config();
const app = express();
// Database connection and server setup
const port = process.env.PORT || 3000;

const _dirname = path.resolve()

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: 'https://talentry-3.onrender.com',
    credentials: true,
};
app.use(cors(corsOptions));



// API routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)


connectDB(); // Move DB connection outside of app.listen


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

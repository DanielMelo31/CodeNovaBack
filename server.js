// Oldschool way
// const express = require('express')

import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDB } from './db/db.js';
import salesRoutes from './views/sales/routes.js';


dotenv.config({ path: './.env' });

const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(salesRoutes)

//Database connection
const main = () => {
	return app.listen(process.env.PORT, () => {
		console.log(`listen in port ${process.env.PORT}`);
	});
};

connectDB(main);

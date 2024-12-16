import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // Added for CORS handling
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true, // Allow cookies and credentials
}));

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use('/api',routes);


sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

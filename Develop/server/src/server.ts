import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const forceDatabaseRefresh = false; // or true, depending on your needs



const app = express();
const PORT = process.env.PORT || 3001;

sequelize.sync({force: forceDatabaseRefresh}).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api', routes); // Prefix all routes with /api

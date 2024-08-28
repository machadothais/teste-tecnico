import express from 'express';
import connectDB from './config/database';
import imageRoutes from '../src/routes';

const app = express();
const port = 3000;

// Conectar ao MongoDB
connectDB();

app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

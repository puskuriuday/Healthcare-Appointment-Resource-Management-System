import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './api/auth.routes.js';
import apptRoutes from './api/appointments.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/healthz', (req, res) => res.json({ ok: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', apptRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API listening on', port));

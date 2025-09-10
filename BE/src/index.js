import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './api/auth.routes.js';
import apptRoutes from './api/appointments.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

// CORS configuration – allow frontend dev origin & credentials
const allowedOrigins = [
	process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
];
app.use(cors({
	origin: function(origin, cb) {
		if (!origin) return cb(null, true); // non-browser / curl
		if (allowedOrigins.includes(origin)) return cb(null, true);
		return cb(new Error('CORS_NOT_ALLOWED: ' + origin));
	},
	credentials: true,
	methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
	allowedHeaders: ['Content-Type','Authorization']
}));
app.use((req,res,next)=>{ // Helpful header for clients (some proxies strip Vary automatically)
	res.header('Vary','Origin');
	next();
});
app.use(express.json());
app.use(morgan('dev'));

app.get('/healthz', (req, res) => res.json({ ok: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', apptRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API listening on', port));

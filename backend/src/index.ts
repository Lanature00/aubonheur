import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { verifierToken, verifierAdmin } from './middleware/authMiddleware';
import { AuthRequest } from './types/types';
import { authRouter } from './routes/auth';
import { reservationRouter } from './routes/reservations';

dotenv.config();

import './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Trop de requêtes, réessaie dans 15 minutes' }
});

app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Trop de tentatives de connexion, réessaie dans 15 minutes' }
});

app.use(express.json());

console.log('authRouter =', authRouter);
console.log('reservationRouter =', reservationRouter);
console.log('authLimiter =', authLimiter);

app.use('/auth', authLimiter, authRouter);
app.use('/reservations', reservationRouter);

app.get('/protected', verifierToken, (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Accès autorisé !',
    utilisateur: req.utilisateur
  });
});

app.get('/admin', verifierToken, verifierAdmin, (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Bienvenue dans le backoffice admin !'
  });
});

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne !');
});

app.listen(PORT, () => {
  console.log('Serveur démarré');
});
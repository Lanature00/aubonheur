const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { verifierToken, verifierAdmin } = require('./middleware/authMiddleware');

require('./config/db');

app.use(helmet());

app.use(cors({
  origin: ['http://localhost:5173', 'https://aubonheur-production.up.railway.app'],
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

app.use('/auth', authLimiter, require('./routes/auth'));
app.use('/reservations', require('./routes/reservations'));

app.get('/protected', verifierToken, (req, res) => {
  res.json({ message: 'Accès autorisé !', utilisateur: req.utilisateur });
});

app.get('/admin', verifierToken, verifierAdmin, (req, res) => {
  res.json({ message: 'Bienvenue dans le backoffice admin !' });
});

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne ! 🎉');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
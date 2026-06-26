const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { verifierToken, verifierAdmin } = require('./middleware/authMiddleware');

require('./config/db');

app.use(express.json());

app.use('/auth', require('./routes/auth'));
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
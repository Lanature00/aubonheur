const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Connexion base de données
require('./config/db');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));

// Route de test
app.get('/', (req, res) => {
  res.send('Le serveur fonctionne ! 🎉');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
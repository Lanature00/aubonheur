const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: `postgresql://admin:admin123@127.0.0.1:5432/aubonheur`,
  ssl: false
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err.message);
  } else {
    console.log('✅ Connecté à PostgreSQL avec succès !');
    release();
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Le serveur fonctionne ! 🎉');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
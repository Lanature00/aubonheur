const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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

module.exports = pool;
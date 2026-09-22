const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  try {
    const userExiste = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (userExiste.rows.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);

    const nouvelUtilisateur = await pool.query(
      'INSERT INTO users (nom, email, mot_de_passe) VALUES ($1, $2, $3) RETURNING id, nom, email, role',
      [nom, email, hash]
    );

    res.status(201).json({
      message: 'Compte créé avec succès',
      utilisateur: nouvelUtilisateur.rows[0]
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

const login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const utilisateur = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (utilisateur.rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const motDePasseValide = await bcrypt.compare(
      mot_de_passe, utilisateur.rows[0].mot_de_passe
    );
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: utilisateur.rows[0].id, role: utilisateur.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur.rows[0].id,
        nom: utilisateur.rows[0].nom,
        email: utilisateur.rows[0].email,
        role: utilisateur.rows[0].role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

module.exports = { register, login };
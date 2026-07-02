import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { nom, email, mot_de_passe } = req.body;

  try {
    const userExiste = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (userExiste.rows.length > 0) {
      res.status(400).json({ message: 'Cet email est déjà utilisé' });
      return;
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
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, mot_de_passe } = req.body;

  try {
    const utilisateur = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (utilisateur.rows.length === 0) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const motDePasseValide = await bcrypt.compare(
      mot_de_passe, utilisateur.rows[0].mot_de_passe
    );
    if (!motDePasseValide) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const token = jwt.sign(
      { id: utilisateur.rows[0].id, role: utilisateur.rows[0].role },
      process.env.JWT_SECRET as string,
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
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};
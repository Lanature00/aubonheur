import { Response } from 'express';
import pool from '../config/db';
import { AuthRequest } from '../types/types';

export const creerReservation = async (req: AuthRequest, res: Response): Promise<void> => {
  const { date, heure, nombre_personnes, nom_contact, telephone } = req.body;
  const user_id = req.utilisateur!.id;

  try {
    const reservation = await pool.query(
      `INSERT INTO reservations (user_id, date, heure, nombre_personnes, nom_contact, telephone)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, date, heure, nombre_personnes, nom_contact, telephone]
    );
    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: reservation.rows[0]
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

export const mesReservations = async (req: AuthRequest, res: Response): Promise<void> => {
  const user_id = req.utilisateur!.id;

  try {
    const reservations = await pool.query(
      'SELECT * FROM reservations WHERE user_id = $1 ORDER BY date DESC',
      [user_id]
    );
    res.json(reservations.rows);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

export const annulerReservation = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const user_id = req.utilisateur!.id;

  try {
    const reservation = await pool.query(
      `UPDATE reservations SET statut = 'annulée' WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id]
    );
    if (reservation.rows.length === 0) {
      res.status(404).json({ message: 'Réservation non trouvée' });
      return;
    }
    res.json({ message: 'Réservation annulée', reservation: reservation.rows[0] });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

export const toutesLesReservations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reservations = await pool.query(
      `SELECT r.*, u.nom, u.email FROM reservations r
       JOIN users u ON r.user_id = u.id
       ORDER BY r.date DESC`
    );
    res.json(reservations.rows);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

export const changerStatut = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { statut } = req.body;

  try {
    const reservation = await pool.query(
      `UPDATE reservations SET statut = $1 WHERE id = $2 RETURNING *`,
      [statut, id]
    );
    if (reservation.rows.length === 0) {
      res.status(404).json({ message: 'Réservation non trouvée' });
      return;
    }
    res.json({ message: 'Statut mis à jour', reservation: reservation.rows[0] });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};
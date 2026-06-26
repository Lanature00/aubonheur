const pool = require('../config/db');

// Créer une réservation
const creerReservation = async (req, res) => {
  const { date, heure, nombre_personnes, nom_contact, telephone } = req.body;
  const user_id = req.utilisateur.id;

  try {
    const reservation = await pool.query(
      `INSERT INTO reservations (user_id, date, heure, nombre_personnes, nom_contact, telephone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, date, heure, nombre_personnes, nom_contact, telephone]
    );

    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: reservation.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// Obtenir les réservations de l'utilisateur connecté
const mesReservations = async (req, res) => {
  const user_id = req.utilisateur.id;

  try {
    const reservations = await pool.query(
      'SELECT * FROM reservations WHERE user_id = $1 ORDER BY date DESC',
      [user_id]
    );

    res.json(reservations.rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// Annuler une réservation
const annulerReservation = async (req, res) => {
  const { id } = req.params;
  const user_id = req.utilisateur.id;

  try {
    const reservation = await pool.query(
      `UPDATE reservations SET statut = 'annulée'
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id]
    );

    if (reservation.rows.length === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json({ message: 'Réservation annulée', reservation: reservation.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// ADMIN — obtenir toutes les réservations
const toutesLesReservations = async (req, res) => {
  try {
    const reservations = await pool.query(
      `SELECT r.*, u.nom, u.email 
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       ORDER BY r.date DESC`
    );

    res.json(reservations.rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

// ADMIN — changer le statut d'une réservation
const changerStatut = async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  try {
    const reservation = await pool.query(
      `UPDATE reservations SET statut = $1 WHERE id = $2 RETURNING *`,
      [statut, id]
    );

    if (reservation.rows.length === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json({ message: 'Statut mis à jour', reservation: reservation.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};

module.exports = {
  creerReservation,
  mesReservations,
  annulerReservation,
  toutesLesReservations,
  changerStatut
};
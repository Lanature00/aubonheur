const express = require('express');
const router = express.Router();
const {
  creerReservation,
  mesReservations,
  annulerReservation,
  toutesLesReservations,
  changerStatut
} = require('../controllers/reservationController');
const { verifierToken, verifierAdmin } = require('../middleware/authMiddleware');

// Routes client (nécessitent d'être connecté)
router.post('/', verifierToken, creerReservation);
router.get('/mes-reservations', verifierToken, mesReservations);
router.put('/annuler/:id', verifierToken, annulerReservation);

// Routes admin (nécessitent d'être admin)
router.get('/admin/toutes', verifierToken, verifierAdmin, toutesLesReservations);
router.put('/admin/statut/:id', verifierToken, verifierAdmin, changerStatut);

module.exports = router;
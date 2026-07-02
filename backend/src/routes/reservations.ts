import { Router } from 'express';
import {
  creerReservation,
  mesReservations,
  annulerReservation,
  toutesLesReservations,
  changerStatut
} from '../controllers/reservationController';
import { verifierToken, verifierAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifierToken, creerReservation);
router.get('/mes-reservations', verifierToken, mesReservations);
router.put('/annuler/:id', verifierToken, annulerReservation);
router.get('/admin/toutes', verifierToken, verifierAdmin, toutesLesReservations);
router.put('/admin/statut/:id', verifierToken, verifierAdmin, changerStatut);

export const reservationRouter = router;
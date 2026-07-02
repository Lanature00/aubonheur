import { Request } from 'express';

export interface User {
  id: number;
  nom: string;
  email: string;
  mot_de_passe: string;
  role: 'client' | 'admin';
  created_at: Date;
}

export interface Reservation {
  id: number;
  user_id: number;
  date: string;
  heure: string;
  nombre_personnes: number;
  nom_contact: string;
  telephone: string;
  statut: 'en_attente' | 'confirmée' | 'annulée';
  created_at: Date;
}

export interface JwtPayload {
  id: number;
  role: 'client' | 'admin';
}

export interface AuthRequest extends Request {
  utilisateur?: JwtPayload;
}
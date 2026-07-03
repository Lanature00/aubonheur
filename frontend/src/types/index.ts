export interface User {
  id: number;
  nom: string;
  email: string;
  role: 'client' | 'admin';
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
  created_at: string;
  nom?: string;
  email?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  utilisateur: User;
}

export interface LoginData {
  email: string;
  mot_de_passe: string;
}

export interface RegisterData {
  nom: string;
  email: string;
  mot_de_passe: string;
}

export interface ReservationData {
  date: string;
  heure: string;
  nombre_personnes: number;
  nom_contact: string;
  telephone: string;
}
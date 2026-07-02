import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '..';

export const verifierToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Accès refusé, token manquant' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.utilisateur = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

export const verifierAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.utilisateur?.role !== 'admin') {
    res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    return;
  }
  next();
};
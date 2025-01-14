import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: string; // Add user ID to the payload
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded: any) => {
    if (err) {
      console.error('JWT verification error:', err.message); // Log error for debugging
      return res.sendStatus(403);
    }
    console.log('Decoded JWT payload:', decoded); // Debug log to verify the decoded payload
    req.user = decoded as JwtPayload;
    next();
    return;
  });
};

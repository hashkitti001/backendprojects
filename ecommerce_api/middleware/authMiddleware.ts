import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;

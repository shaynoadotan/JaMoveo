// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid Token');
//   }
// };

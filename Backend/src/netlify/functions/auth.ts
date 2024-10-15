import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser } from '../../models/User'; // Ensure IUser is imported for typing

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password, instrument, isAdmin, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      password: hashedPassword,
      instrument,
      isAdmin,
      role, // Save the role
    });

    await user.save();
     res.status(201).json({ message: 'User created successfully' });
      // Added return statement
      return;
  } catch (error) {
     res.status(500).json({ message: 'Error creating user', error }); // Added return statement
    return;
    }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
       res.status(400).json({ message: 'Invalid username or password' });
       return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid username or password' });
       return;
    }

    // Return user details including role
     res.json({ user: { username: user.username, isAdmin: user.isAdmin, instrument: user.instrument } });
     return;
     // Added return statement
  } catch (error) {
     res.status(500).json({ message: 'Error logging in', error }); // Added return statement
    return;
    }
});

export default router; // Ensure to export the router

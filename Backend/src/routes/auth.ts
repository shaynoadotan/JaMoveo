import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';  // Import IUser for typing

const router = express.Router();

// Signup Route
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { username, password, instrument } = req.body;

  try {
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({ username, password: hashedPassword, instrument });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

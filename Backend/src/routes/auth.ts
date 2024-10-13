import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, instrument, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashedPassword, instrument, role });
  await user.save();
  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid username' });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!);
  res.header('Authorization', `Bearer ${token}`).json({ token });
});

export default router;

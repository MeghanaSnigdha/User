import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/add', async (req, res) => {
  const { username, email, password, role } = req.body;
  const newUser = new User({ username, email, password, role });
  await newUser.save();
  res.json({ message: 'User added' });
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;

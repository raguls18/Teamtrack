import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { validEmail, cleanText } from '../utils/validation.js';
const router = Router();
const tokenFor = (user) => jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2h' });
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });
router.post('/register', async (req, res, next) => {
  try {
    const name = cleanText(req.body.name, 80), email = cleanText(req.body.email, 160).toLowerCase(), password = req.body.password;
    if (name.length < 2 || !validEmail(email) || typeof password !== 'string' || password.length < 8) return res.status(400).json({ message: 'Enter a name, valid email, and password with at least 8 characters' });
    if (await User.exists({ email })) return res.status(409).json({ message: 'An account with this email already exists' });
    const role = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), role });
    return res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (err) { next(err); }
});
router.post('/login', async (req, res, next) => {
  try {
    const email = cleanText(req.body.email, 160).toLowerCase(), password = req.body.password;
    const user = await User.findOne({ email }).select('+password');
    if (!user || typeof password !== 'string' || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect' });
    return res.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (err) { next(err); }
});
router.get('/me', protect, (req, res) => res.json({ user: publicUser(req.user) }));
export default router;

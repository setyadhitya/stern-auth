import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // For simplicity we do basic auth via token cookie; only admin can register
  const token = req.cookies?.token || (req.headers.cookie || '').split('token=')[1];
  const jwt = require('jsonwebtoken');
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    if (!data || data.role !== 'admin') return res.status(403).json({message:'only admin allowed'});
  } catch (e) {
    return res.status(403).json({message:'unauthorized'});
  }

  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({message:'missing fields'});
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO tb_users (username, role, password_hash) VALUES (?, ?, ?)', [username, role, hash]);
    return res.json({ok:true});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message:'error creating user'});
  }
}
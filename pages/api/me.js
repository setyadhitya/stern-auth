import pool from '../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies?.token || (req.headers.cookie || '').split('token=')[1];
  if (!token) return res.json({ok:false});
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    // optionally fetch fresh user
    const [rows] = await pool.query('SELECT id, username, role FROM tb_users WHERE id = ?', [data.id]);
    const user = rows[0];
    if(!user) return res.json({ok:false});
    return res.json({ok:true, user});
  } catch (e) {
    return res.json({ok:false});
  }
}
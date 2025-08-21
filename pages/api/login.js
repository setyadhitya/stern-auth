import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  try {
    const [rows] = await pool.query('SELECT * FROM tb_users WHERE username = ?', [username]);
    const user = rows[0];
    const attempt_time = new Date();
    if (!user) {
      await pool.query('INSERT INTO tb_log (username_attempt, attempt_time, success, message, ip) VALUES (?, ?, ?, ?, ?)',
        [username, attempt_time, false, 'user not found', ip]);
      return res.status(401).json({message:'User not found'});
    }
    // disallow praktikan login from login page
    if (user.role === 'praktikan') {
      await pool.query('INSERT INTO tb_log (username_attempt, attempt_time, success, message, ip) VALUES (?, ?, ?, ?, ?)',
        [username, attempt_time, false, 'praktikan login disallowed', ip]);
      return res.status(403).json({message:'Practikan tidak diizinkan login melalui halaman ini.'});
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      await pool.query('INSERT INTO tb_log (username_attempt, attempt_time, success, message, ip) VALUES (?, ?, ?, ?, ?)',
        [username, attempt_time, false, 'wrong password', ip]);
      return res.status(401).json({message:'Password salah'});
    }

    // create a very simple session using a JWT cookie
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({id: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET || 'devsecret', {expiresIn: '8h'});
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${8*3600}`);
    await pool.query('INSERT INTO tb_log (username_attempt, attempt_time, success, message, ip) VALUES (?, ?, ?, ?, ?)',
      [username, attempt_time, true, 'login success', ip]);

    return res.json({ok:true});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message:'Server error'});
  }
}
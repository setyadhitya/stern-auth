Stern - Next.js starter project
===============================

Setup:
1. Import the SQL file `db/stern_schema.sql` into your MySQL server to create database and seed users.
   - Sample seeded users:
     - admin / password: admin123
     - asisten1 / password: asisten123
     - praktikan1 / password: praktikan123
   (Passwords in DB are bcrypt-hashed.)

2. Update MySQL credentials in `lib/db.js` if necessary.

3. Install dependencies:
   npm install

4. Run development server:
   npm run dev

Notes/Features:
- There are three main pages: / (login), /dashboard, /register
- Practikan role is prevented from logging in via the login API.
- Login attempts (success/failure) are logged to `tb_log` with timestamp and message.
- Register route is protected: only admin (by token cookie) can create new users; passwords are hashed before storing.
- JWT secret can be set via environment variable JWT_SECRET.

Generated bcrypt hashes used for seed inserts:
- admin: $2b$10$6TEiJG8bnDUP72RmeZFLz.nQsZDUYgZb7Z6tM1Ono2UyIuFt83QYe
- asisten: $2b$10$l6pzl39GPJ/wM2mi6YE1juoA2ildw00TTl68hXo0WP9MPov6odUmS
- praktikan: $2b$10$m76BOs0dQqJNJ//mTR3gfeZNB5bqCC0GsytVrr6fD3NiGupgkmZ96
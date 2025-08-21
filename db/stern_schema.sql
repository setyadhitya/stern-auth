-- Create database and tables for project 'stern'
CREATE DATABASE IF NOT EXISTS stern;
USE stern;

CREATE TABLE IF NOT EXISTS tb_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('laboran','asisten','praktikan','admin') NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tb_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username_attempt VARCHAR(100),
  attempt_time DATETIME NOT NULL,
  success BOOLEAN NOT NULL,
  message VARCHAR(255),
  ip VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed users (passwords already bcrypt-hashed)
INSERT INTO tb_users (username, role, password_hash) VALUES
('admin','admin','$2b$10$6TEiJG8bnDUP72RmeZFLz.nQsZDUYgZb7Z6tM1Ono2UyIuFt83QYe'),
('asisten1','asisten','$2b$10$l6pzl39GPJ/wM2mi6YE1juoA2ildw00TTl68hXo0WP9MPov6odUmS'),
('praktikan1','praktikan','$2b$10$m76BOs0dQqJNJ//mTR3gfeZNB5bqCC0GsytVrr6fD3NiGupgkmZ96');
import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// ===== "БД" в памяти =====
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@example.com',
    passwordHash: bcrypt.hashSync('alice123', 10),
    role: 'user',
  },
];

// ===== JWT utils =====
function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

// ===== Middleware: auth =====
function authenticateJWT(req, _res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return _res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, username, role, iat, exp }
    next();
  } catch {
    return _res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

// ===== БАЗА: /login =====
app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ message: 'username and password required' });

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signAccessToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// текущий пользователь
app.get('/me', authenticateJWT, (req, res) => {
  const me = users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: 'User not found' });
  res.json({
    id: me.id,
    username: me.username,
    email: me.email,
    role: me.role,
  });
});

// ===== Задание 1: обновление email =====
app.put('/update-email', authenticateJWT, (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ message: 'email required' });

  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.email = email;
  return res.json({
    message: 'Email updated',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// ===== Задание 2: удаление аккаунта =====
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const idx = users.findIndex((u) => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });

  const removed = users.splice(idx, 1)[0];
  return res.json({
    message: 'Account deleted',
    id: removed.id,
    username: removed.username,
  });
});

// ===== Задание 3: обновление роли (только admin) =====
app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, role } = req.body || {};
  if (!userId || !role)
    return res.status(400).json({ message: 'userId and role required' });

  const target = users.find((u) => u.id === Number(userId));
  if (!target)
    return res.status(404).json({ message: 'Target user not found' });

  target.role = role;
  return res.json({
    message: 'Role updated',
    user: {
      id: target.id,
      username: target.username,
      email: target.email,
      role: target.role,
    },
  });
});

// ===== Задание 4: обновление (продление) токена =====
app.post('/refresh-token', authenticateJWT, (req, res) => {
  const me = users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: 'User not found' });

  const newToken = signAccessToken(me);
  res.json({ token: newToken });
});

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

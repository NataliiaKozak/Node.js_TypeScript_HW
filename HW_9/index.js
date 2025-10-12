import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ===== «БД» в памяти =====
let nextId = 1;
const users = []; 
// user: { id, email, passwordHash, role: 'user'|'admin', mustChangePassword: boolean }

// ===== helpers =====
function getCredsFromBasicAuth(req) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return null;
  const raw = Buffer.from(h.slice(6), 'base64').toString('utf8');
  const [email, password] = raw.split(':');
  if (!email || !password) return null;
  return { email, password };
}

async function authenticate(req, res, next) {
  // Принимаем либо Basic, либо {email,password} в body для удобства тестов
  const basic = getCredsFromBasicAuth(req);
  const email = basic?.email ?? req.body?.email;
  const password = basic?.password ?? req.body?.password;

  if (!email || !password) {
    return res.status(401).send('Auth required: provide email & password (Basic or body)');
  }
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).send('Invalid credentials');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).send('Invalid credentials');

  req.authUser = user;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.authUser || req.authUser.role !== 'admin') {
    return res.status(403).send('Access denied: admins only');
  }
  next();
}

// ===== ЗАДАЧА 1: POST /register (уникальность email) =====
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body || {};
  if (!email || !password) {
    return res.status(400).send('email and password are required');
  }

  const exists = users.some(u => u.email === email);
  if (exists) {
    return res.status(409).send('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = {
    id: nextId++,
    email,
    passwordHash,
    role: role === 'admin' ? 'admin' : 'user',
    mustChangePassword: true,
  };
  users.push(user);

  res.status(201).json({ message: 'User created', id: user.id, email: user.email, role: user.role });
});

// ===== ЗАДАЧА 2: /login (проверка mustChangePassword) =====
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).send('email and password are required');

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).send('Invalid credentials');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).send('Invalid credentials');

  if (user.mustChangePassword) {
    return res.status(403).json({ requirePasswordChange: true, message: 'Must change password' });
  }

  res.json({ message: 'Login OK', user: { id: user.id, email: user.email, role: user.role } });
});

// ===== ЗАДАЧА 2: POST /change-password =====
app.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body || {};
  if (!email || !newPassword) return res.status(400).send('email and newPassword are required');

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send('User not found');

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.mustChangePassword = false;

  res.json({ message: 'Password changed' });
});

// ===== ЗАДАЧА 3: POST /delete-account (только авторизованным) =====
app.post('/delete-account', authenticate, async (req, res) => {
  const idx = users.findIndex(u => u.id === req.authUser.id);
  if (idx === -1) return res.status(400).send('User not found');

  users.splice(idx, 1);
  res.json({ message: 'Account deleted' });
});

// ===== ЗАДАЧА 4: GET /admin (только admin) =====
app.get('/admin', authenticate, requireAdmin, (req, res) => {
  res.json({ message: `Welcome, admin ${req.authUser.email}` });
});

// ===== ЗАДАЧА 5: POST /change-email =====
app.post('/change-email', async (req, res) => {
  const { email, newEmail, password } = req.body || {};
  if (!email || !newEmail || !password) {
    return res.status(400).send('email, newEmail and password are required');
  }

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send('User not found');

  const exists = users.some(u => u.email === newEmail);
  if (exists) return res.status(409).send('New email already in use');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).send('Incorrect password');

  user.email = newEmail;
  res.json({ message: 'Email updated', email: user.email });
});


app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
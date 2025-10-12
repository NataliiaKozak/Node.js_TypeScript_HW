import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const URL = `http://localhost:${PORT}`;

async function registerUser() {
  try {
    const res = await axios.post(`${URL}/register`, {
      email: 'f@gmail.com',
      password: '123454321',
      role: 'admin', // для демонстрации доступа к /admin
    });
    console.log('REGISTER:', res.status, res.data);
  } catch (e) {
    console.log(
      'REGISTER ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

async function login(email, password) {
  try {
    const res = await axios.post(`${URL}/login`, { email, password });
    console.log('LOGIN:', res.status, res.data);
    return res.data;
  } catch (e) {
    console.log(
      'LOGIN ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

async function changePassword(email, newPassword) {
  try {
    const res = await axios.post(`${URL}/change-password`, {
      email,
      newPassword,
    });
    console.log('CHANGE PASSWORD:', res.status, res.data);
  } catch (e) {
    console.log(
      'CHANGE PASSWORD ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

async function accessAdminBasic(email, password) {
  try {
    const auth = Buffer.from(`${email}:${password}`).toString('base64');
    const res = await axios.get(`${URL}/admin`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    console.log('ADMIN:', res.status, res.data);
  } catch (e) {
    console.log(
      'ADMIN ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

async function changeEmail(email, newEmail, password) {
  try {
    const res = await axios.post(`${URL}/change-email`, {
      email,
      newEmail,
      password,
    });
    console.log('CHANGE EMAIL:', res.status, res.data);
  } catch (e) {
    console.log(
      'CHANGE EMAIL ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

async function deleteAccount(email, password) {
  try {
    const res = await axios.post(`${URL}/delete-account`, { email, password });
    console.log('DELETE ACCOUNT:', res.status, res.data);
  } catch (e) {
    console.log(
      'DELETE ACCOUNT ERR:',
      e.response?.status,
      e.response?.data ?? e.message
    );
  }
}

(async () => {
  await registerUser(); // 1) регистрация
  await login('f@gmail.com', '123454321'); // 2) login → должно вернуть requirePasswordChange=true
  await changePassword('f@gmail.com', '543212345'); // 3) смена пароля
  await login('f@gmail.com', '543212345'); // 4) login OK
  await accessAdminBasic('f@gmail.com', '543212345'); // 5) доступ к /admin
  await changeEmail('f@gmail.com', 'fa@gmail.com', '543212345'); // 6) смена email
  await deleteAccount('fa@gmail.com', '543212345'); // 7) удаление учётки
})();

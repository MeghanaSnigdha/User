import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!form.username || !form.email || !form.password || !form.role) return;
    await axios.post(`${API}/add`, form);
    setForm({ username: '', email: '', password: '', role: '' });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="form">
        <input type="text" placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input type="text" placeholder="Role" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <button onClick={addUser}>Add User</button>
      </div>

      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <strong>{user.username}</strong> ({user.role}) - {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

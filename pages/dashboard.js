import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/me').then(r=>r.json()).then(d=>{
      if(!d?.ok) Router.push('/');
      else setUser(d.user);
    });
  }, []);

  const logout = async () => {
    await fetch('/api/logout', {method:'POST'});
    Router.push('/');
  }

  if(!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <p>Welcome, <strong>{user.username}</strong> (role: {user.role})</p>
        {user.role === 'admin' && <p><a href="/register">Open Register</a></p>}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
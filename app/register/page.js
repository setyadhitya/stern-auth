"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("praktikan");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else setMsg(data.message || "Register failed");
  };

  return (
    <div className="container">
      <h1>Register - Admin Only</h1>
      <div className="card">
        <form onSubmit={submit}>
          <div>
            <label>Username</label>
            <br />
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div style={{ marginTop: 10 }}>
            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div style={{ marginTop: 10 }}>
            <label>Role</label>
            <br />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">admin</option>
              <option value="laboran">laboran</option>
              <option value="asisten">asisten</option>
              <option value="praktikan">praktikan</option>
            </select>
          </div>
          <div style={{ marginTop: 12 }}>
            <button type="submit">Create user</button>
          </div>
          {msg && <p style={{ color: "red" }}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) router.push("/");
        else setUser(d.user);
      });
  }, [router]);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <p>
          Welcome, <strong>{user.username}</strong> (role: {user.role})
        </p>
        {user.role === "admin" && (
          <p>
            <a href="/register">Open Register</a>
          </p>
        )}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

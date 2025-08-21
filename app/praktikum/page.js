import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import PraktikumClient from "./PraktikumClient";

async function getUser() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "devsecret");
  } catch {
    return null;
  }
}

export default async function PraktikumPage() {
  const user = await getUser();

  if (!user || !["admin", "laboran", "asisten"].includes(user.role)) {
    return <meta httpEquiv="refresh" content="0; url=/" />;
  }

  const res = await fetch("http://localhost:3000/api/praktikum", {
    cache: "no-store",
    headers: { Cookie: cookies().toString() },
  });
  const data = await res.json();

  return (
    <div className="container">
      <h1>Daftar Praktikum</h1>
      <p>Halo, {user.username} (role: {user.role})</p>
      <PraktikumClient data={data} user={user} />
    </div>
  );
}

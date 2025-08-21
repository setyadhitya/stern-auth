"use client";

import { useState } from "react";

export default function PraktikumClient({ data, user }) {
  const [list, setList] = useState(data);
  const [form, setForm] = useState({
    Mata_Kuliah: "",
    Jurusan: "",
    Kelas: "",
    Semester: "",
    Hari: "",
    Jam_Mulai: "",
    Jam_Ahir: "",
    Shift: "",
    Assisten: "",
    Catatan: "",
    Tanggal_Mulai: "",
  });
  const [editId, setEditId] = useState(null);

  // 🟢 Tambah / Update
  const save = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, ID: editId } : form;

    const res = await fetch("/api/praktikum", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      location.reload(); // reload biar sinkron
    }
  };

  // 🔴 Hapus
  const del = async (id) => {
    if (!confirm("Hapus data ini?")) return;
    const res = await fetch(`/api/praktikum?id=${id}`, { method: "DELETE" });
    if (res.ok) location.reload();
  };

  return (
    <div>
      {/* Tabel */}
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mata Kuliah</th>
            <th>Jurusan</th>
            <th>Kelas</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Shift</th>
            <th>Asisten</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.ID}>
              <td>{p.ID}</td>
              <td>{p.Mata_Kuliah}</td>
              <td>{p.Jurusan}</td>
              <td>{p.Kelas}</td>
              <td>{p.Hari}</td>
              <td>
                {p.Jam_Mulai} - {p.Jam_Ahir}
              </td>
              <td>{p.Shift}</td>
              <td>{p.Assisten}</td>
              <td>
                <button
                  onClick={() => {
                    setEditId(p.ID);
                    setForm(p);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => del(p.ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Tambah/Edit */}
      {(user.role === "admin" || user.role === "laboran") && (
        <form onSubmit={save} style={{ marginTop: "20px" }}>
          <h3>{editId ? "Edit Praktikum" : "Tambah Praktikum"}</h3>
          <input
            placeholder="Mata Kuliah"
            value={form.Mata_Kuliah}
            onChange={(e) => setForm({ ...form, Mata_Kuliah: e.target.value })}
            required
          />
          <input
            placeholder="Jurusan"
            value={form.Jurusan}
            onChange={(e) => setForm({ ...form, Jurusan: e.target.value })}
            required
          />
          <input
            placeholder="Kelas"
            value={form.Kelas}
            onChange={(e) => setForm({ ...form, Kelas: e.target.value })}
            required
          />
          <input
            placeholder="Semester"
            value={form.Semester}
            onChange={(e) => setForm({ ...form, Semester: e.target.value })}
          />
          <input
            placeholder="Hari"
            value={form.Hari}
            onChange={(e) => setForm({ ...form, Hari: e.target.value })}
          />
          <input
            placeholder="Jam Mulai"
            type="time"
            value={form.Jam_Mulai}
            onChange={(e) => setForm({ ...form, Jam_Mulai: e.target.value })}
          />
          <input
            placeholder="Jam Akhir"
            type="time"
            value={form.Jam_Ahir}
            onChange={(e) => setForm({ ...form, Jam_Ahir: e.target.value })}
          />
          <input
            placeholder="Shift"
            value={form.Shift}
            onChange={(e) => setForm({ ...form, Shift: e.target.value })}
          />
          <input
            placeholder="Asisten"
            value={form.Assisten}
            onChange={(e) => setForm({ ...form, Assisten: e.target.value })}
          />
          <input
            placeholder="Catatan"
            value={form.Catatan}
            onChange={(e) => setForm({ ...form, Catatan: e.target.value })}
          />
          <input
            type="date"
            placeholder="Tanggal Mulai"
            value={form.Tanggal_Mulai}
            onChange={(e) =>
              setForm({ ...form, Tanggal_Mulai: e.target.value })
            }
          />

          <button type="submit">{editId ? "Update" : "Tambah"}</button>
        </form>
      )}
    </div>
  );
}

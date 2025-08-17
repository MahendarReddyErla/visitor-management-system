import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function CheckIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.post("/visitors/", { name, email, phone, purpose });
      navigate("/"); // go back to list
    } catch (err: any) {
      setError(err?.message ?? "Failed to check in");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: 520, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1>Check In Visitor</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: "0.75rem" }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
        <input placeholder="Purpose" value={purpose} onChange={e=>setPurpose(e.target.value)} required />
        <button disabled={saving} type="submit">{saving ? "Saving…" : "Check In"}</button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </form>
    </div>
  );
}

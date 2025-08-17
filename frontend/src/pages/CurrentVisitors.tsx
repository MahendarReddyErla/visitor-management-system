import { useEffect, useState } from "react";
import { api } from "../api";

type Visitor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  check_in_time: string;
  check_out_time: string | null;
  is_checked_out: boolean;
};

export default function CurrentVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Visitor[]>("/visitors/current/")
      .then(res => setVisitors(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{padding:"1.5rem"}}>Loading…</h2>;

  return (
    <div style={{ padding: "1.5rem", fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1>Current Visitors</h1>
      {visitors.length === 0 ? (
        <p>No one is checked in.</p>
      ) : (
        <ul>
          {visitors.map(v => (
            <li key={v.id}>
              <strong>{v.name}</strong> — {v.purpose} (in since {new Date(v.check_in_time).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

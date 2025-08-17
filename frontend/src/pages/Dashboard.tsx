import { useEffect, useMemo, useState } from "react";
import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";                       // ← use classic Grid
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import StatCard from "../components/StatCard";
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

export default function Dashboard() {
  const [all, setAll] = useState<Visitor[]>([]);
  const [current, setCurrent] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<Visitor[]>("/visitors/"),
      api.get<Visitor[]>("/visitors/current/"),
    ])
      .then(([allRes, curRes]) => {
        setAll(allRes.data);
        setCurrent(curRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
    return all.filter(v => v.check_in_time.startsWith(today)).length;
  }, [all]);

  const columns: GridColDef<Visitor>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "purpose", headerName: "Purpose", flex: 1, minWidth: 160 },
  {
    field: "check_in_time",
    headerName: "Check-In",
    width: 190,
    valueFormatter: (p: GridValueFormatterParams<Visitor, string | null>) =>
      p?.value ? new Date(String(p.value)).toLocaleString() : "-",
  },
  {
    field: "check_out_time",
    headerName: "Check-Out",
    width: 190,
    valueFormatter: (p: GridValueFormatterParams<Visitor, string | null>) =>
      p?.value ? new Date(String(p.value)).toLocaleString() : "-",
  },
];

  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <StatCard label="Today’s Visitors" value={todayCount} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Currently Inside" value={current.length} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Visitors" value={all.length} />
        </Grid>
      </Grid>


      <Paper sx={{ p: 1 }}>
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={all}
            columns={columns}
            getRowId={(r) => r.id}
            loading={loading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          />
        </div>
      </Paper>
    </Container>
  );
}

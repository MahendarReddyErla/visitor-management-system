
import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Card sx={{ boxShadow: 4 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}

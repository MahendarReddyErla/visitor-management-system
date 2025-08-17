import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Visitor Management System
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/check-in" style={{ color: "inherit", textDecoration: "none" }}>Check In</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

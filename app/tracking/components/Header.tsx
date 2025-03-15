import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          อยู่ระหว่างการจัดส่ง
        </Typography>
        <IconButton color="inherit" aria-label="help">
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

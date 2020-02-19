import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Appraisal cycle</MenuItem>
            <MenuItem onClick={handleClose}>Tracking</MenuItem>
            <MenuItem onClick={handleClose}>Analysis</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Key Perfomance Indicator
          </Typography>
          <Button
            onClick={() => reactLocalStorage.remove("token")}
            style={{ background: "white", fontWeight: "bold" }}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              Log out
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

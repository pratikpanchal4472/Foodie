import {
  AppBar,
  Badge,
  Container,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    marginBottom: "1rem",
  },
  logo: {
    marginRight: "20px",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const cartItems = useSelector((state) => state.cart.value);
  const classes = useStyles();
  const navigate = useNavigate();

  const openCart = () => navigate(`/cart`);

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center">
            <Grid item>
              <img
                className={classes.logo}
                src="https://logodix.com/logo/1981946.png"
                alt="Logo"
                width="100"
              />
            </Grid>
            <Grid item>
              <InputBase
                placeholder="Search topics"
                className={classes.searchInput}
                startAdornment={<SearchIcon fontSize="small" />}
              />
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton onClick={openCart}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartOutlinedIcon fontSize="medium" />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

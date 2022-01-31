import {
  Avatar,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import Controls from "../../components/controls/Controls";
import { setCartItems } from "../../reducers/cartReducer";
import { addOrUpdateItem } from "../../services/cartService";
import { getRestaurantDetails } from "../../services/restaurantService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    "& .MuiListItem-root": {
      marginBottom: theme.spacing(2),
    },
  },
  media: {
    height: 450,
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  menuName: {
    marginLeft: theme.spacing(3),
  },
  label: {
    margin: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Restaurant = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [subTitle, setSubtitle] = useState("");

  useEffect(() => {
    getRestaurantDetails(id).then((data) => {
      setSubtitle(
        [...new Set(data.menu.map((item) => item.category))].join(", ")
      );
      setRestaurant(data);
    });
  }, [id]);

  const addItem = (menuItemId) => () => {
    addOrUpdateItem({ menuItemId }).then((data) => dispatch(setCartItems(data)));
  };

  return (
    <AppLayout>
      {restaurant && (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" component={RouterLink}>
              Restaurants
            </Link>
            <Link
              color="textPrimary"
              to={`/restaurant/${id}`}
              aria-current="page"
              component={RouterLink}
            >
              {restaurant?.name}
            </Link>
          </Breadcrumbs>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={restaurant.image}
                title={restaurant.name}
              />
              <CardContent>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6" component="h2">
                      {restaurant.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {restaurant.location}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {subTitle}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Rating
                      name="disabled"
                      value={restaurant.rating}
                      disabled
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>

          <Paper className={classes.paper}>
            <Typography variant="h6" component="h2" className={classes.label}>
              Order Online
            </Typography>
            <List dense className={classes.root}>
              {restaurant.menu.map((menuItem) => {
                const id = menuItem.id;
                const labelId = `checkbox-list-label-${id}`;

                return (
                  <ListItem key={id} role={undefined} dense>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        alt={menuItem.name}
                        src={menuItem.image}
                        className={classes.largeAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} className={classes.menuName}>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        component="h6"
                      >
                        {menuItem.name}
                      </Typography>
                      <Typography variant="body1">
                        &#8377; {menuItem.unitPrice}
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Controls.Button
                        variant="outlined"
                        text="Add"
                        onClick={addItem(id)}
                        startIcon={<AddOutlinedIcon />}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </>
      )}
    </AppLayout>
  );
};

export default Restaurant;

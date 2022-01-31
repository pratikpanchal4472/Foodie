import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { getRestaurants } from "../services/restaurantService";

const useStyles = makeStyles({
  media: {
    height: 180,
  },
});

const Restaurants = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then((response) => {
      setRestaurants(response);
    });
  }, []);

  const exploreRestaurant = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <AppLayout>
      <Grid container spacing={2}>
        {restaurants &&
          restaurants.map((restaurant) => (
            <Grid item xs={12} md={6} lg={4} key={restaurant.id}>
              <Card
                className={classes.root}
                onClick={() => exploreRestaurant(restaurant)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={restaurant.image}
                    title={restaurant.name}
                  />
                  <CardContent>
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
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Rating
                      name="disabled"
                      value={restaurant.rating}
                      disabled
                    />
                    <Typography color="textSecondary" component="p">
                      ({restaurant.rating})
                    </Typography>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </AppLayout>
  );
};

export default Restaurants;

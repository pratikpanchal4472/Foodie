import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Card, CardActions, CardContent, Divider, Grid, Link, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Controls from "../components/controls/Controls";
import OrderItems from "../components/OrderItems";
import { removeCartItem, updateOrderItem, userCartItemDetails } from "../services/cartService";
import { createOrder } from "../services/orderService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    "& .MuiListItem-root": {
      marginBottom: theme.spacing(2),
    }
  },
  orderItemsContainer: {
    marginTop: theme.spacing(2),
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
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.secondary,
  },
  details: {
    width: '100%'
  },
  quantityPaper: {
    width: '120px',
    display: 'flex',
    borderRadius: '25px',
    marginRight: '20px'
  },
  quantiyPaperDisabled: {
    width: '60px',
    display: 'flex',
    borderRadius: '25px',
    marginRight: '20px'
  },
  plusIcon: {
    marginLeft: '5px',
    padding: '0px'
  },
  minusIcon: {
    marginRight: '5px',
    padding: '0px'
  },
  listItemSecondaryAction: {
    display: 'flex',
    alignItems: 'center'
  },
  quantity: {
    "& .MuiInputBase-input": {
      textAlign: 'center'
    }
  }
}));

const Cart = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [itemExpansionStatus, setItemExpansionStatus] = useState([]);
  const [grossTotal, setGrossTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(30);
  const [grandTotal, setGrandTotal] = useState(0);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState(false);

  useLayoutEffect(() => {
    userCartItemDetails().then((data) => {
      const displayItems = buildItems(data);
      setItemExpansionStatus(displayItems.map(item => true));
      setItems(displayItems);
    });
  }, []);

  const buildItems = (data) => {
    if (data.length > 0) {
      setOrderCreated(data[0].orderId !== null);
      setOrderId(data[0].orderId);
    }

    const groupItemsByRestaurant = data.reduce((group, item) => {
      const { name, image, restaurant, unitPrice } = item.menuItem;
      const quantity = item.quantity;
      const restaurantId = restaurant.id;

      const details = {
        id: item.id,
        itemName: name,
        image: image,
        restaurantId,
        restaurantName: restaurant.name,
        restaurantLocation: restaurant.location,
        unitPrice,
        quantity
      }

      if (group[restaurantId]) {
        group[restaurantId].push(details);
      } else {
        group[restaurantId] = [details];
      }

      return group;
    }, {});

    return Object.keys(groupItemsByRestaurant).map(restaurantId => {
      const orderItems = groupItemsByRestaurant[restaurantId];
      const { restaurantName, restaurantLocation } = orderItems[0];
      orderItems.sort((i1, i2) => i1.itemName.localeCompare(i2.itemName));
      return {
        restaurantId,
        restaurantName,
        restaurantLocation,
        orderItems
      }
    });
  }

  useEffect(() => updateTotal(), [items]);

  const updateTotal = () => {
    const gross = items.map(item => item.orderItems).flat().reduce((sum, item) => {
      sum += item.quantity * item.unitPrice;
      return sum;
    }, 0);
    const goodsAndServiceTax = Number(Number(gross * 0.05).toFixed(2));
    setGrossTotal(Number(Number(gross).toFixed(2)));
    setGst(goodsAndServiceTax);
    setGrandTotal(Number(Number(gross + goodsAndServiceTax + deliveryCharge).toFixed(2)));
  }

  const updateQuantity = (item, action) => (event) => {
    let quantity = item.quantity;
    if (action === 'descrease') {
      quantity--;
    } else {
      quantity++;
    }

    if (quantity === 0) {
      removeCartItem(item.id).then((data) => {
        const displayItems = buildItems(data);
        setItemExpansionStatus(displayItems.map(item => true));
        setItems(displayItems);
      })
    } else {
      updateOrderItem(item.id, { quantity }).then((data) => {
        const displayItems = buildItems(data);
        setItemExpansionStatus(displayItems.map(item => true));
        setItems(displayItems);
      })
    }
  };

  const onChangeDetailsExpansion = (id) => (event, isExpanded) => {
    const index = items.findIndex(item => item.restaurantId === id);
    itemExpansionStatus[index] = !itemExpansionStatus[index];
    console.log(itemExpansionStatus);
    setItemExpansionStatus([...itemExpansionStatus]);
  }

  const onCheckout = () => {
    createOrder().then((data) => {
      console.log(data);
    });
  }

  const confirmAndPay = () => {
    createOrder().then((data) => {
      console.log(data);
    });
  }

  const cancelOrder = () => {

  }

  return (
    <AppLayout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/" component={RouterLink}>
          Back to Explore
        </Link>
        <Link
          color="textPrimary"
          to={`/cart`}
          aria-current="page"
          component={RouterLink}
        >
          Your orders
        </Link>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.orderItemsContainer}>
          {items.map((item, index) => {
            const id = item.restaurantId;
            return (
              <Accordion expanded={itemExpansionStatus[index]} onChange={onChangeDetailsExpansion(id)} key={id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={id}
                >
                  <Typography className={classes.heading}>{item.restaurantName}</Typography>
                  <Typography className={classes.secondaryHeading}>{item.restaurantLocation}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderItems orderItems={item.orderItems} orderCreated={orderCreated} updateQuantity={updateQuantity}></OrderItems>
                </AccordionDetails>
              </Accordion>)

          })}
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Total amount Payable
                </Typography>

                <List component="nav" className={classes.root}>
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        Gross Total:
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        &#8377; {grossTotal}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        GST (5%):
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        &#8377; {gst}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        Delivery Charge:
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        &#8377; {deliveryCharge}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        Pay:
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography className={classes.title} color="textSecondary" variant="h6" component="h6">
                        &#8377; {grandTotal}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                {orderCreated
                  ? (
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Controls.Button
                        text="Confirm and Pay"
                        onClick={confirmAndPay}
                      />
                      <Controls.Button
                        color="secondary"
                        text="Cancel Order"
                        onClick={cancelOrder}
                      />
                    </Grid>
                  )
                  : (
                    <Controls.Button
                      fullwidth
                      text="Checkout"
                      onClick={onCheckout}
                    />)}
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>


    </AppLayout>
  );
};

export default Cart;

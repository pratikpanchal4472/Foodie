import { List, makeStyles } from '@material-ui/core';
import React from 'react';
import OrderItem from './OrderItem';

const useStyles = makeStyles((theme) => ({
    details: {
        width: '100%'
    }
}));

const OrderItems = ({ orderCreated, orderItems, updateQuantity }) => {
    const classes = useStyles();

    return <List dense className={classes.details}>
        {orderItems.map((orderItem) => (
            <OrderItem key={orderItem.id} orderItem={orderItem} orderCreated={orderCreated} updateQuantity={updateQuantity}></OrderItem>
        ))}
    </List>;
};

export default OrderItems;

import { Avatar, IconButton, InputBase, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React from 'react';

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

const OrderItem = ({ orderItem, orderCreated, updateQuantity }) => {
    const classes = useStyles();

    return <ListItem key={orderItem.id} dense>
        <ListItemAvatar>
            <Avatar variant="rounded" alt={orderItem.itemName} src={orderItem.image} className={classes.largeAvatar} />
        </ListItemAvatar>
        <ListItemText id={orderItem.id} className={classes.menuName}>
            <Typography variant="body1" color="textPrimary">
                {orderItem.itemName}
            </Typography>
            <Typography variant="body1">
                &#8377; {orderItem.unitPrice}
            </Typography>
        </ListItemText>
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>

            <Paper className={orderCreated ? classes.quantiyPaperDisabled : classes.quantityPaper} variant="outlined">
                {!orderCreated && (
                    <IconButton className={classes.minusIcon} onClick={updateQuantity(orderItem, 'descrease')}>
                        <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                )}
                <InputBase value={orderItem.quantity} disabled className={classes.quantity} />

                {!orderCreated && (
                    <IconButton className={classes.plusIcon} onClick={updateQuantity(orderItem, 'increase')}>
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                )}
            </Paper>


            <Typography variant="h6" color="textPrimary" component="h6">
                &#8377; {orderItem.quantity * orderItem.unitPrice}
            </Typography>
        </ListItemSecondaryAction>
    </ListItem>;
};

export default OrderItem;

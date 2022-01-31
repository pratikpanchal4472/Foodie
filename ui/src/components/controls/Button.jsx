import { Button as MuiButton, makeStyles } from "@material-ui/core";
import React from 'react';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    fullwidth: {
        margin: theme.spacing(1),
        width: '95%'
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, fullwidth, ...other } = props
    const classes = useStyles();

    const btnStyle = { root: classes.root, label: classes.label };
    if (fullwidth) {
        btnStyle['root'] = classes.fullwidth;
    }

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={btnStyle}>
            {text}
        </MuiButton>
    )
}

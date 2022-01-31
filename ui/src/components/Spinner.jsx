import { makeStyles } from "@material-ui/core";
import React from "react";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  msg: {
    fontSize: "20px",
  },
});

const Spinner = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Loader
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />

      <p className={classes.msg}>{message}</p>
    </div>
  );
};

export default Spinner;

import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Controls from "../components/controls/Controls";
import SuccessStrip from "../components/SuccessStrip";
import { Form, useForm } from "../components/useForm";
import { saveUser } from "../services/userService";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  signupForm: {
    padding: theme.spacing(2),
    width: "350px",
    minHeight: "400px",
  },
  logo: {
    marginBottom: "2rem",
  },
  googleicon: {
    marginRight: theme.spacing(1),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      name: "",
      email: "",
      password: "",
    },
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    saveUser(values).then(() => {
      setOpen(true);
      setTimeout(() => {
        resetForm();
        navigate("/login");
      }, 2000);
    });
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.signupForm}>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={3} md={3}></Grid>
            <Grid item xs={4} md={4}>
              <img
                className={classes.logo}
                src="https://logodix.com/logo/1981946.png"
                alt="Logo"
                width="200"
              />
            </Grid>
            <Grid item></Grid>

            <Grid item xs={12} md={12}>
              <Controls.Input
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controls.Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controls.Button
                variant="outlined"
                type="submit"
                text="Sign Up"
                fullwidth
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <SuccessStrip
        open={open}
        setOpen={setOpen}
        message="User registered successfully"
      ></SuccessStrip>
    </div>
  );
};

export default Signup;

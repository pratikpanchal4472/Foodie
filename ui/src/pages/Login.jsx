import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Controls from "../components/controls/Controls";
import { Form, useForm } from "../components/useForm";
import { setCartItems } from "../reducers/cartReducer";
import { login } from "../reducers/userReducer";
import { authenticate } from "../services/authService";
import { currentUserCartItems } from "../services/cartService";
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
  loginform: {
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

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("email" in fieldValues) {
      temp.email = fieldValues.email
        ? /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email is not valid."
        : "This field is required.";
    }

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      email: "",
      password: "",
    },
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    authenticate(values).then((data) => {
      const { email, name, id } = data;
      dispatch(login({ email, name, id }));
      currentUserCartItems().then((items) => {
        dispatch(setCartItems(items.map(item => ({ menuItemId: item.menuId, quantity: item.quantity }))))
      });
      navigate("/");
    });
  };

  const onGoogleLogin = async (response) => {
    const { email, name, imageUrl } = response.profileObj;
    const profileId = response.googleId;

    saveUser({
      name,
      email,
      profileId,
      image: imageUrl,
    }).then((data) => {
      const { email, name, id, image } = data;
      dispatch(login({ email, name, id, image }));
      navigate("/");
    });
  };

  return (
    <div className={classes.main}>
      <Paper className={classes.loginform}>
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
                text="Sign In"
                fullwidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controls.Button
                variant="text"
                text="Are you a new foodie?"
                fullwidth
                onClick={() => navigate("/signup")}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" align="center">
                or
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <Controls.Button
                    fullwidth
                    variant="outlined"
                    color="default"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    text={
                      <>
                        <FcGoogle className={classes.googleicon} /> Sign in with
                        Google
                      </>
                    }
                  />
                )}
                onSuccess={onGoogleLogin}
                onFailure={onGoogleLogin}
                cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </div>
  );
};

export default Login;

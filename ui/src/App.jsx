import { Grid } from "@material-ui/core";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/Auth";
import Spinner from "./components/Spinner";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Restaurant from "./pages/restaurant/Restaurant";
import Restaurants from "./pages/Restaurants";
import Signup from "./pages/Signup";
import { setCartItems } from "./reducers/cartReducer";
import { login } from "./reducers/userReducer";
import { session } from "./services/authService";
import { currentUserCartItems } from "./services/cartService";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    session()
      .then((data) => {
        if (data.id) {
          const { email, name, id } = data;
          dispatch(login({ email, name, id }));
          currentUserCartItems().then((items) => {
            dispatch(setCartItems(items.map(item => ({ menuItemId: item.menuId, quantity: item.quantity }))))
          });
          navigate("/");
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 2000);
      });
  }, []);

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Spinner message="Loading.." />
        </Grid>
      </Grid>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/restaurant/:id"
        element={
          <RequireAuth>
            <Restaurant />
          </RequireAuth>
        }
      />
      <Route
        path="/cart"
        exact
        element={
          <RequireAuth>
            <Cart />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        exact
        element={
          <RequireAuth>
            <Restaurants />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;

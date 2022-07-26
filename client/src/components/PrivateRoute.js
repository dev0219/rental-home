import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../context/GlobalContext";

function PrivateRoute({ component: Component, path, admin, ...rest }) {
  const { user } = useContext(StateContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.auth ? (
              <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: path } }} />
        )
      }
    />
  );
}

PrivateRoute.defaultProps = {
  admin: false,
};

export default PrivateRoute;

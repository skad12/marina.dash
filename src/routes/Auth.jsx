import { Route, Routes } from "react-router-dom";
import Redirect from "../components/Redirect";
import Login from "../pages/auth/Login";
import routes from "../utils/routes";

function Auth(props) {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={<Redirect url={routes.auth.baseUrl + routes.auth.login} />}
      />
      <Route path={routes.auth.login} element={<Login />} />
    </Routes>
  );
}

export default Auth;

import Dashboard from "../../pages/app/apartments/Dashboard";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../components/Redirect";
import routes from "../../utils/routes";

function Apartments(props) {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={
          <Redirect
            url={routes.app.apartments.baseUrl + routes.app.dashboard}
          />
        }
      />

      <Route path={routes.app.dashboard} element={<Dashboard />} />
    </Routes>
  );
}

export default Apartments;

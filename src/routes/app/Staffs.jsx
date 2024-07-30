import Dashboard from "../../pages/app/staffs/Dashboard";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../components/Redirect";
import routes from "../../utils/routes";

function Staffs(props) {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={
          <Redirect url={routes.app.staffs.baseUrl + routes.app.dashboard} />
        }
      />

      <Route path={routes.app.dashboard} element={<Dashboard />} />
    </Routes>
  );
}

export default Staffs;

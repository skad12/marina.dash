import Dashboard from "../../pages/app/calender/Dashboard";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../components/Redirect";
import routes from "../../utils/routes";

export const Calender = () => {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={
          <Redirect url={routes.app.calender.baseUrl + routes.app.dashboard} />
        }
      />

      <Route path={routes.app.calender.baseUrl} element={<Dashboard />} />
    </Routes>
  );
};

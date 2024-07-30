import Dashboard from "../../pages/app/bookings/Dashboard";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../components/Redirect";
import routes from "../../utils/routes";
import ViewBooking from "../../pages/app/bookings/ViewBooking";

function Bookings(props) {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={
          <Redirect url={routes.app.bookings.baseUrl + routes.app.dashboard} />
        }
      />
      <Route path={routes.app.dashboard} element={<Dashboard />} />
      <Route path={routes.details} element={<ViewBooking />} />
    </Routes>
  );
}

export default Bookings;

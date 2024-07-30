import { Route, Routes } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Redirect from "../components/Redirect";
import routes from "../utils/routes";
import { useContext, useEffect } from "react";
import Home from "./app/Home";
import Auth from "./Auth";
import Bookings from "./app/Bookings";
import Apartments from "./app/Apartments";
import Feedbacks from "./app/Feedbacks";
import Schedules from "./app/Schedules";
import Affiliate from "./app/Affiliate";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import DataContext from "../contexts/DataContext";
import useApartments from "../hooks/api/useApartments";
import Staffs from "./app/Staffs";
import Admin from "./app/Accounts";
import Inventory from "./app/Inventory";
import Dashboard from "../pages/app/calender/Dashboard";

function Base(props) {
  const { apartments, getApartments } = useApartments();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user && !apartments.length) getApartments();
    // eslint-disable-next-line
  }, [user]);

  return (
    <DataContext.Provider value={{ apartments, getApartments }}>
      <div className="dashboard home">
        {user && <SideBar />}
        <div className="body">
          {user && <Header />}
          <div className="content">
            <Routes>
              <Route
                path={routes.baseUrl}
                element={
                  <Redirect
                    url={user ? routes.app.home.baseUrl : routes.auth.baseUrl}
                  />
                }
              />
              <Route path={routes.auth.baseUrl} element={<Auth />} />
              <Route path={routes.app.home.baseUrl} element={<Home />} />
              <Route
                path={routes.app.calender.baseUrl}
                element={<Dashboard />}
              />
              <Route
                path={routes.app.bookings.baseUrl}
                element={<Bookings />}
              />
              <Route
                path={routes.app.apartments.baseUrl}
                element={<Apartments />}
              />
              <Route
                path={routes.app.feedbacks.baseUrl}
                element={<Feedbacks />}
              />
              <Route
                path={routes.app.schedules.baseUrl}
                element={<Schedules />}
              />
              <Route path={routes.app.staffs.baseUrl} element={<Staffs />} />
              <Route path={routes.app.admin.baseUrl} element={<Admin />} />
              <Route
                path={routes.app.inventory.baseUrl}
                element={<Inventory />}
              />
              <Route
                path={routes.app.affiliates.baseUrl}
                element={<Affiliate />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default Base;

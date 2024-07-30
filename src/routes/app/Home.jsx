import Dashboard from "../../pages/app/home/Dashboard";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../components/Redirect";
import routes from "../../utils/routes";

function Home(props) {
  return (
    <Routes>
      <Route
        path={routes.baseUrl}
        element={
          <Redirect url={routes.app.home.baseUrl + routes.app.dashboard} />
        }
      />

      <Route path={routes.app.dashboard} element={<Dashboard />} />
    </Routes>
  );
}

export default Home;

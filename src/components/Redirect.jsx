import { Navigate } from "react-router-dom";
import { getUrl } from "../utils/routes";

function Redirect({ url }) {
  return <Navigate replace to={getUrl(url)} />;
}

export default Redirect;

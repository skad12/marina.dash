import { useContext } from "react";
import "../css/components/header.css";
import AppContext from "../contexts/AppContext";
import ProfileImage from "./ProfileImage";
import { AvatarSM } from "./svg/Avatar";

function Header(props) {
  const { user } = useContext(AppContext);

  return (
    <header>
      <h2 className="t-primary">Dashboard</h2>
      <div className="user-info">
        <div>
          <h5 className="t-primary">
            {user.firstName} {user.lastName}
          </h5>
          <span>Admin</span>
        </div>
        <ProfileImage svg={<AvatarSM />} />
      </div>
    </header>
  );
}

export default Header;

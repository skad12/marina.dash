import { AvatarLG } from "./svg/Avatar";

function ProfileImage({ svg = <AvatarLG /> }) {
  return <div className="profile-image">{svg}</div>;
}

export default ProfileImage;

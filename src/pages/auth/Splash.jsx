import Loader from "../../components/Loader";
import useAuth from "../../hooks/api/useAuth";
import { useEffect } from "react";

function Splash({ setIsLoaded, setUser }) {
  const { restoreUser } = useAuth();

  const init = async () => {
    const user = await restoreUser();
    setUser(user);
    setIsLoaded(true);
  };

  useEffect(() => {
    init();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="screen screen-flex splash">
      <Loader loading />
    </div>
  );
}

export default Splash;

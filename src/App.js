import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./contexts/AppContext";
import Splash from "./pages/auth/Splash";
import { useState } from "react";
import Base from "./routes/Base";

function App(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setUser }}>
        <div className="raleway container">
          {isLoaded ? (
            <Base />
          ) : (
            <Splash setUser={setUser} setIsLoaded={setIsLoaded} />
          )}
        </div>
        <ToastContainer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;

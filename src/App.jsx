import { useEffect, useState } from "react";
import Login from "./pages/Login";
import AppRoutes from "./routes";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingToken(false);
  }, []);

  if (isCheckingToken) {
    return null; // or a loading spinner
  }
  return <>{!token ? <Login /> : <AppRoutes />}</>;
};

export default App;

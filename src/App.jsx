import User from "./pages/User";
import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LayOut from "./Components/LayOut";
import { useSelector } from "react-redux";
import { selectAccessToken } from "./store/slice/authSlice";
import PageError from "./pages/PageError";

function App() {
  const accessToken = useSelector(selectAccessToken);
  const [token, setToken] = useState();
  useEffect(() => {
    if (!accessToken) {
      setToken(true);
    } else if (accessToken) {
      setToken(false);
    }
  }, [accessToken, token]);
  return (
    <div className="App">
      <Routes>
        {/* <LayOut> */}
        <Route path="*" element={<PageError />} />
        {token ? (
          <>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/user" element={<User />} />
          </>
        )}
        {/* </LayOut>  */}
      </Routes>
    </div>
  );
}

export default App;

import User from "./pages/User";
import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LayOut from "./Components/LayOut";
import { useSelector } from "react-redux";
import { selectAccessToken, setUser } from "./store/slice/authSlice";
import PageError from "./pages/PageError";
import jwtDecode from "jwt-decode";

function App() {
  const accessToken = useSelector(selectAccessToken);
  const [token, setToken] = useState();
  // const dispatch = useDispatch()
  // const userToken = accessToken && jwtDecode(accessToken);
  useEffect(() => {
    if (!accessToken) {
      setToken(true);
    } else if (accessToken){
      // dispatch(setUser(userToken))
      setToken(false);
    }
  }, [accessToken]);
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

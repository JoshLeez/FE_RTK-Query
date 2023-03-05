import "../styles/login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/userApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/slice/authSlice";

const Login = () => {
  const [loginUser, { isLoading : isLogin, isError : isLoginError, error}] = useLoginUserMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const handleLogin = async (value) => {
    if (isLogin) {
      // show loading indicator
      return <div>...Loading</div>;
    } else {
      // call loginUser mutation and navigate to /user on success
      const {accessToken} = await loginUser(value).unwrap();
      dispatch(setAccessToken(accessToken))
      navigate("/user");
    }
  };

  return (
    <div>
      {error?.data?.message}
      <form onSubmit={handleSubmit(handleLogin)} className="login-container">
        <div>
          <h3>Email</h3>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            })}
            placeholder="Insert your username"
          />
          {errors.email&& <span>Invalid email address </span>}
        </div>
        <div>
          <h3>Password</h3>
          <input
          autoComplete="true"
            type="password"
            {...register("password", { required: true })}
            placeholder="insert your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-nav">
         <p>Don't have account? click here to register</p>
         <Link to="/register">Register now</Link>
      </div>   
    </div>
  );
};

export default Login;

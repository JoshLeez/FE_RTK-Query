import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Link to="/">Back</Link>
      <form className="register-container">
        <div>
          <h3>Username</h3>
          <input placeholder="insert username" />
        </div>
        <div>
          <h3>Email</h3>
          <input placeholder="insert email" />
        </div>
        <div>
          <h3>Password</h3>
          <input placeholder="insert password" />
        </div>
        <div>
          <h3>Confirim Password</h3>
          <input placeholder="confirm password" />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;

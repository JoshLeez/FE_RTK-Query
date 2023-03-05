import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/register.css";
import { useRegisterUserMutation } from "../../store/api/userApi";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {  errors },
  } = useForm();
  const [registerUser, {isLoading : isRegister}] = useRegisterUserMutation();
  const navigate = useNavigate()
  const onSubmit = async(value)=>{
    if(isRegister){
      return <div>...Loading</div>
    }else{
      await registerUser(value)
      navigate("/")
    }
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <form onSubmit={handleSubmit(onSubmit)} className="register-container">
        <div>
          <h3>Username</h3>
          <input {...register("name",{
            required: true
          })} placeholder="insert username" />
        </div>
        <div>
          <h3>Email</h3>
          <input  type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            })} placeholder="insert email" />
        </div>
        {errors.email && <span>Email are not valid</span>}
        <div>
          <h3>Password</h3>
          <input autoComplete="true"
            type="password"
            {...register("password", { required: true })}
             placeholder="insert password" />
        </div>
        <div>
          <h3>Confirim Password</h3>
          <input type="password" {...register("confirmPassword", { required : true,
          validate: (val)=>{
            if(watch("password") != val){
              return "Confirm Password and Password not the same"
            }
            }}
          )} placeholder="confirm password" />
        </div>
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;

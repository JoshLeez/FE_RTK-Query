import { useEffect, useRef } from "react";
import "./edituser.css";
import { useForm } from "react-hook-form";

const EditUser = ({ user, setModal, handleUpdate }) => {
  const menuRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      gender: user.gender,
    },
  });

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        console.log(event.target);
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);


  return (
    <div className="background-modal">
      <form onSubmit={handleSubmit(handleUpdate)} ref={menuRef} className="edit-container">
            <input
              type="text"
              {...register("name")}
              placeholder="insert name"
            />
            <input
              type="text"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              placeholder="insert email"
            />
            {errors.email && <span>Format Email Salah</span>}
            <select {...register("gender")}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditUser;

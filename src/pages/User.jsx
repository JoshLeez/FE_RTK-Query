import { 
  useGetUsersQuery, 
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useLogOutUserMutation,
  useGetUserByLoginQuery} from "../store/api/userApi";
import { useForm } from "react-hook-form";
import "./styles/user.css";
import { useState } from "react";
import EditUser from "../Components/EditUser";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/authSlice";

const User = () => {
  const { data : users, isError, error, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating}] = useUpdateUserMutation();
  const [logOutUser, { isLoading : isLogOut, isError : isLogOutError, error : errorLogout}] = useLogOutUserMutation();
  const { data : user, isLoading : isLoginByUser} = useGetUserByLoginQuery();
  console.log(user)
  const [modal ,setModal] = useState(false)
  const [selected, setSelected] = useState()
  // const {name} = useSelector(selectUser); 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const navigate = useNavigate()
  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (isLoginByUser){
    return <div>...Loading</div>
  }

  const onSubmit = async (value) =>{
    if(isCreating){
      return <div>...Loading</div>
    }else{
      await createUser(value);
      reset()
    }
  }

  const logOutHandler = async () =>{
    if(isLogOut){
      return <div>...Loading</div>
    }else if(isLogOutError){
      console.log(errorLogout)
    }else{
      await logOutUser();
      navigate("/")
    }

  }

  if (isError) {
  return <div>{error?.data?.message}</div>
  }

  const handleUpdate = async (value) =>{
    if(isUpdating){
      return <div>...Loading</div>
    }else{
      await updateUser({id : selected.id, value})
      setModal(false)
    }
  }

  const handleDelete = async (id) =>{
    await deleteUser(id)
  }

  const renderDeleteButton = (id) => {
    if (isDeleting) {
      return <button disabled>Deleting...</button>;
    } else {
      return <button onClick={() => handleDelete(id)}>Delete</button>;
    }
  };

  return (
    <div className="container">
      <p>Welcome Back {user.name}</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
    {users && users.map((datas)=>{
      return(
        <tbody key={datas.id}>
          <tr>
            <td>{datas.id}</td>
            <td>{datas.name}</td>
            <td>{datas.email}</td>
            <td>{datas.gender}</td>
            <td className="action-btn">
               <button onClick={()=>{setModal(!modal), setSelected(datas)}}>Edit</button>
                {/* <button onClick={()=>handleDelete(datas.id)}>Delete</button> */}
                {renderDeleteButton(datas.id)}
            </td>
          </tr>
        </tbody>
       )})} 
       </table>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name", { required : true})} placeholder="insert name"/>
        {errors.name && <span>Please fill the name</span>}
        <input  type="text"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })} placeholder="insert email"/>
        {errors.email && <span>Format Email Salah</span>}
        <select {...register("gender")}>
          <option>Male</option>
          <option>Female</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      {modal && <EditUser handleUpdate={handleUpdate} user={selected} setModal={setModal}/>}
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
};

export default User;

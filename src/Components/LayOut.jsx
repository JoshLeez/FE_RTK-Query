import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../store/slice/authSlice"

const LayOut = ({children}) => {
const accessToken = useSelector(selectAccessToken);
const navigate = useNavigate()
useEffect(()=>{
    if(!accessToken){
        navigate("/")
    }
},[])

return(
    <>
    {children}
    </>
)

}

export default LayOut
import { Route, Routes } from "react-router-dom";
import Main from "../components/Main";
import Login from "../components/Login";
import Register from "../components/Register";
const User = () => {
  return (
    <div>
         <Routes>
            <Route path="/home" element={<Main/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
  )
}

export default User
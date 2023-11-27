import { logout } from "../config/firebase";
import {Button} from "@mui/material"

const Dashboard = () => {

    const handleLogout = async()=>{
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
        <h1>Dashboard (ruta protegida)</h1>
        <Button>Logout</Button>
        <button onClick={handleLogout}>Logout</button></>
    )
};

export default Dashboard;

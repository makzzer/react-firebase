import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useEffect } from "react"

export const useRedirectActiveUser = (user,path) =>{
    //me traigo el navigate tambien
    const navigate = useNavigate()

    useEffect(()=>{
        user && navigate(path)
    },[user])
}
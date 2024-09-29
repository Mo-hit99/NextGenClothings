import { useEffect } from "react"
import { useNavigate,useLocation } from "react-router-dom"

export default function RefreshHandler({setIsAuthenticated}) {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const data = localStorage.getItem('user-info');
        const token = JSON.parse(data)?.token
        if(token){
            setIsAuthenticated(true)
            if(location.pathname==='/' || location.pathname === '/signIn' || location.pathname === '/signUp'){
                navigate('/',{replace:false});
            }
        }
    },[])
  return null;
}

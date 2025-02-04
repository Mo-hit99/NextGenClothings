import axios from "axios";

const api=axios.create({
    baseURL:`${import.meta.env.VITE_SERVER_LINK}/users/auth`
})

export const googleAuth =(code)=>{
  return api.get(`/google?code=${code}`)
}
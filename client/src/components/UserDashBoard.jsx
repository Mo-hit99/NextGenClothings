import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

export default function UserDashBoard() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [ user ,setUser] = useState('')
    const [name ,setName]= useState('')
    const [address , setAddress] = useState('')
    const [optionalAddress , setOptionalAddress] = useState('')
    const [officeAddress , setOfficeAddress] = useState('')
    const [phone,setPhone] = useState();
    const [optionalOfficeAddress , setOptionalOfficeAddress] = useState('')
    const [model ,setModel] = useState(false);
      
    useEffect(() => {   
        fetchUserData();
    }, [])
    const fetchUserData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_LINK +`/api/user/${id}`);
        if(response){
          setUser(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    };
    async function updateUserData(e){
        e.preventDefault();
        try {
        const response = await axios.put(import.meta.env.VITE_SERVER_LINK +`/api/user/${id}`,{name,
            address,
            optionalAddress,
            officeAddress,
            optionalOfficeAddress,
            phone
        });
            if(response){
                console.log(response)
                fetchUserData()
                alert('successful update')
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    }
    function UserDataOptionToggle(commentId) {
        setModel(model === commentId ? null : commentId);
    }
    async function deleteUser(id){
        try {
          const response = await axios.delete(`${import.meta.env.VITE_SERVER_LINK}/api/user/${id}`)
      
          if(response){
            fetchUserData()
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("user-info");
            navigate("/signIn");
          }
          
      } catch (error) {
        console.log({error : error.message})
      }
      }
    return (
        <div className="form-container-wrapper">
            {
                model && <form className='form-edit' onSubmit={updateUserData}>
                       <div className="form-group">
                    <label htmlFor="#">name</label>
                    <input className='input-edit' type="text" value={name || user.name} onChange={(e)=> setName(e.target.value)} />

                    <label htmlFor="#">address</label>
                    <input  className='input-edit' type="text" value={address || user.address} onChange={(e)=> setAddress(e.target.value)} />

                    <label htmlFor="#">optionalAddress</label>
                    <input className='input-edit' type="text" value={optionalAddress || user.optionalAddress} onChange={(e)=> setOptionalAddress(e.target.value)} />

                    <label htmlFor="#">officeAddress</label>
                    <input className='input-edit' type="text" value={officeAddress || user.officeAddress} onChange={(e)=> setOfficeAddress(e.target.value)} />

                    <label htmlFor="#">phone</label>
                    <input className='input-edit' type="text" value={phone || user.phone} onChange={(e)=> setPhone(e.target.value)} />

                    <label htmlFor="#">optionalOfficeAddress</label>
                    <input className='input-edit' type="text" value={optionalOfficeAddress || user.optionalOfficeAddress} onChange={(e)=> setOptionalOfficeAddress(e.target.value)} />
                       </div>

                    <button className='form-edit-btn'>update</button>
                </form>
            }
            <div className="user-data-wrapper">
            <button className='edit-btn-user' onClick={()=> UserDataOptionToggle(user._id)}><i className="fa-solid fa-pencil"></i></button>
            <h1>User Profile</h1>
            <p className='user-info'>Username: <span className='user-text'>
               {user.name}
              </span>
               </p>
            <p className='user-info'>Phone: +91 <span className='user-text'>
               {user.phone}
              </span>
               </p>
            <p className='user-info'>Address: <span className='user-text'>
              {user.address}
              </span> 
              </p>
            <p className='user-info'>Optional Address: <span className='user-text'> 
              {user.optionalAddress}
              </span> 
              </p>
            <p>Office Address: <span className='user-text'>
              {user.officeAddress}
              </span> 
              </p>
            <p className='user-info'>Optional Office Address: <span className='user-text'>
              {user.optionalOfficeAddress}
              </span> 
              </p>
            <button onClick={()=> deleteUser(user._id)} className='user-data-delete-btn'>Delete My Account</button>
            </div>
       </div>
    )
}

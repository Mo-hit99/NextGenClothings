import { useEffect, useState } from 'react'

export default function BackendInfoModel() {
 const [timer,setTimer] = useState(60);
 const [showModal,setShowModel]=useState(true)
  useEffect(()=>{
   if(timer<= 0 ){
       setShowModel(false);
       return;
} 

   const timerId = setInterval(()=>{
     setTimer((prev)=> prev - 1);
    },1000)
    return () => {clearInterval(timerId)}
    
},[timer])

 const closeModal = () => setShowModel(false)
 const minutes = Math.floor( timer / 60);
 const seconds = timer % 60 ;
 return (
    showModal && (
        <div className="modal">
          <div className="modal-content">
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
            <h1>Backend Server Starting</h1>
            <p>Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            <div className="admin-credentials">
            <p className='admin-info'>These admin credentials are provided to you to explore the admin panel for better understanding.</p>
              <p className='admin-para'><strong className='admin-strong'>Admin Email:</strong>u9120307@gmail.com</p>
              <p className='admin-para'><strong className='admin-strong'>Admin Password:</strong>admin123456789@</p>
            </div>
          </div>
        </div>
      )
    
  )
}

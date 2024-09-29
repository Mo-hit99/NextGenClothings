import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()

export const createRazorpayInstance = ()=>{
   return new razorpay({
       key_id : process.env.RAZORPAY_KEY_ID,
       headers: {
        "X-Razorpay-Account": "OrUZjrJvCFzz6W"
      } 
   })

}
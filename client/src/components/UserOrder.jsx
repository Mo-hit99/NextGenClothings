import axios from "axios";
import { useEffect, useState } from "react";

export default function UserOrder() {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [userInvoice, setUserInvoice]=useState([]);
    useEffect(()=>{
      getUserInvoice()
    },[])
    async function getUserInvoice(){
      try {
          const response = await axios.get(import.meta.env.VITE_SERVER_LINK +'/payment/invoice')
          if(response){
              setUserInvoice(response.data);
              console.log(response.data)
          }
      } catch (error) {
          console.log(error)
      }
    }


    const updateOrderStatus = async (invoiceId) => {
        try {
          await axios.put(import.meta.env.VITE_SERVER_LINK + `/payment/order/${invoiceId}/status`, { status: selectedStatus });
          setUserInvoice((prevInvoices) =>
            prevInvoices.map((invoice) =>
              invoice._id === invoiceId ? { ...invoice, status: selectedStatus } : invoice
            )
          );
        } catch (error) {
          console.error('Error updating order status', error);
        }
      };
    
  return (
    <div className="manage-orders-container" >
    <h2>Manage Orders</h2>
    {userInvoice.map((invoice) => (
      <div key={invoice._id} className="order-card">
         <img src={invoice.ProductImg} alt={invoice.productName} />
         <div className="order-card-content">
        <h3>Order ID: {invoice._id}</h3>
        <p>Current Status: {invoice.status}</p>
        <select onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Ordered">Ordered</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button className="update-order-btn" onClick={() => updateOrderStatus(invoice._id)}>Update Status</button>
      </div>
      </div>
    ))}
  </div>
  )
}
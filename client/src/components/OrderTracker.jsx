import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderTracker() {
  const { id } = useParams();
  const [ userEmail ,setUserEmail] = useState('')
  const [ user ,setUser] = useState('')
  const [userOrder, setUserOrder]=useState([]);

  useEffect(() => {   
      fetchUserData();
      getUserInvoice()
  }, [])
  const fetchUserData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_LINK +`/api/user/${id}`);
      if(response){
        setUserEmail(response.data.email)
        setUser(response.data.name)
      }
    } catch (error) {
      console.error(error);
    }
  };
async function getUserInvoice(){
  try {
      const response = await axios.get(import.meta.env.VITE_SERVER_LINK +'/payment/invoice')
      if(response){
        setUserOrder(response.data);
      }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="order-tracker-container">
    <h2>Order Tracker For {user}</h2>
    {/* <input
      type="email"
      placeholder="Filter by Email"
      value={userEmail}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button onClick={fetchInvoices}>Search</button> */}

    {userOrder && userOrder.filter(invoiceUser => invoiceUser.CustomerEmail === userEmail).map((invoice) => (
      <div key={invoice._id} className="order-card">
        <img src={invoice.ProductImg} alt={invoice.productName} />
        <div className="order-card-content">
        <h3>Order for {invoice.CustomerName}</h3>
        <p>Status: {invoice.status}</p>
        <ul className="status-updates">
          {invoice.statusUpdates.map((update, index) => (
            <li key={index}>{`${update.status} - ${new Date(update.updatedAt).toLocaleString()}`}</li>
          ))}
        </ul>
        <p>Product: {invoice.productName}</p>
        <p>Brand: {invoice.ProductBrand}</p>
        <p>Color: {invoice.ProductColor}</p>
        <p>Size: {invoice.ProductSize}</p>
        <p>Price: ${invoice.ProductPrice}</p>
        <p>Quantity: {invoice.totalQuantity}</p>
        <p>Address: {invoice.CustomerAddress}</p>
        <p>Date: {new Date(invoice.date).toLocaleString()}</p>
      </div>
      </div>
    ))}
    {userOrder.filter(invoiceUser => invoiceUser.CustomerEmail === userEmail).length === 0 && (
        <p className="user-invoice-text">No Order Status found for this user.</p>
      )}
  </div>
  )
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { timeAgo } from "../assets/Timeago";

export default function UserInvoice() {
    const { id } = useParams();
    const [ userEmail ,setUserEmail] = useState('')
    const [ user ,setUser] = useState('')
    const [userInvoice, setUserInvoice]=useState([]);

    useEffect(() => {   
        fetchUserData();
        getUserInvoice()
    }, [])
    const fetchUserData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_USER_LINK +`/api/user/${id}`);
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
        const response = await axios.get(import.meta.env.VITE_SERVER_INVOICE_LINK +'/payment/invoice')
        if(response){
            setUserInvoice(response.data);
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <section>
     <h1>Invoices for {user}</h1>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Total Quantity</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Size</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userInvoice && userInvoice.filter(invoiceUser => invoiceUser.CustomerEmail === userEmail).map(getInvoice => (
            <tr key={getInvoice._id}>
              <td>{getInvoice.paymentId}</td>
              <td>{getInvoice.totalQuantity}</td>
              <td>{getInvoice.CustomerName}</td>
              <td>{getInvoice.productName}</td>
              <td>{getInvoice.productDescription}</td>
              <td>{getInvoice.ProductBrand}</td>
              <td>{getInvoice.ProductColor}</td>
              <td>{getInvoice.ProductSize}</td>
              <td>{getInvoice.ProductPrice}</td>
              <td>{getInvoice.CustomerAddress}</td>
              <td>{timeAgo(getInvoice.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {userInvoice.filter(invoiceUser => invoiceUser.CustomerEmail === userEmail).length === 0 && (
        <p className="user-invoice-text">No invoices found for this user.</p>
      )}
    </section>
  )
}

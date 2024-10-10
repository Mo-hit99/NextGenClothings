import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserInvoice() {
    const { id } = useParams();
    const [ user ,setUser] = useState('')
    const [userInvoice, setUserInvoice]=useState([]);

    useEffect(() => {   
        fetchUserData();
        getUserInvoice()
    }, [])
    const fetchUserData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_LINK +`/api/user/${id}`);
        if(response){
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
            setUserInvoice(response.data);
            console.log(response.data)
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
            <th>Price</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userInvoice && userInvoice.filter(invoiceUser => invoiceUser.CustomerName === user).map(getInvoice => (
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
              <td>{getInvoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {userInvoice.filter(invoiceUser => invoiceUser.CustomerName === user).length === 0 && (
        <p>No invoices found for this user.</p>
      )}
    </section>
  )
}
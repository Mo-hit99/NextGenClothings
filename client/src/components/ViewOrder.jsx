import axios from "axios";
import { useEffect, useState } from "react";
import { timeAgo } from "../assets/Timeago";
import ShimmerSkeleton from "./ShimmerSkeleton";

export default function ViewOrder() {

  const [userInvoice, setUserInvoice]=useState([]);
  const [loading ,setLoading]=useState(true);
  useEffect(()=>{
    getUserInvoice()
  },[])
  async function getUserInvoice(){
    try {
      setLoading(true)
        const response = await axios.get(import.meta.env.VITE_SERVER_INVOICE_LINK +'/invoices/payment/invoice')
        if(response){
            setUserInvoice(response.data);
            console.log(response.data)
        }
    } catch (error) {
        console.log(error)
    }finally{
      setLoading(false)
    }
  }

  async function deleteProduct(id){
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_INVOICE_LINK}/invoices/payment/invoice/${id}`)
  
      if(response){
        getUserInvoice()
      }
      
  } catch (error) {
    console.log({error : error.message})
  }
  }
  return (
    <section className="section-invoice-container">
      {loading ? (<ShimmerSkeleton cards={4}/>):userInvoice.length > 0 ? (
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
        <tbody className="table-invoice-body">
          {userInvoice && userInvoice.map(getInvoice => (
            <tr key={getInvoice._id}>
              <td>{getInvoice.paymentId}</td>
              <td>{getInvoice.totalQuantity}</td>
              <td>{getInvoice.CustomerName}</td>
              <td>{getInvoice.productName}</td>
              {/* <td>{getInvoice.productDescription}</td> */}
              <td>{getInvoice.ProductBrand}</td>
              <td>{getInvoice.ProductColor}</td>
              <td>{getInvoice.ProductSize}</td>
              <td>{getInvoice.ProductPrice}</td>
              <td>{getInvoice.CustomerAddress}</td>
              <td>{timeAgo(getInvoice.date)}</td>
              <button title="Delete" className="admin-delete-btn" onClick={()=>deleteProduct(getInvoice._id)}><i className="fa-regular fa-trash-can"></i></button>
            </tr>
          ))}
          
        </tbody>
      </table>
        ):(
          <p className="user-invoice-text">No invoices found for this user.</p>
        )
    }
    </section>
  );
}

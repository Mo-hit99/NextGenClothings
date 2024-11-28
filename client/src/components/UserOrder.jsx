import axios from "axios";
import { useEffect, useState } from "react";
import ShimmerSkeleton from "./ShimmerSkeleton";

export default function UserOrder() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userInvoice, setUserInvoice] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserInvoice();
  }, []);
  async function getUserInvoice() {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_INVOICE_LINK + "/invoices/payment/invoice"
      );
      if (response) {
        setUserInvoice(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateOrderStatus = async (invoiceId) => {
    try {
      await axios.put(
        import.meta.env.VITE_SERVER_INVOICE_LINK +
          `/invoices/payment/order/${invoiceId}/status`,
        { status: selectedStatus }
      );
      setUserInvoice((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId
            ? { ...invoice, status: selectedStatus }
            : invoice
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="manage-orders-container">
      {loading ? (
        <ShimmerSkeleton cards={8} />
      ) : userInvoice.length > 0 ? (
        <>
          <h2>Manage Orders</h2>
          {userInvoice?.map((invoice) => (
            <div key={invoice._id} className="order-card">
              <div className="admin-img-order-tracker">
                {invoice.ProductImg.split(",").map((img, index) => (
                  <img
                    className="order-tracker-images"
                    key={index}
                    src={img}
                    alt={invoice.productName}
                  />
                ))}
              </div>
              <div className="order-card-content">
                <h3>Order ID: {invoice._id}</h3>
                <p>User Name: {invoice.CustomerName}</p>
                <p>User Email: {invoice.CustomerEmail}</p>
                <p>Current Status: {invoice.status}</p>
                <select onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="Ordered">Ordered</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  className="update-order-btn"
                  onClick={() => updateOrderStatus(invoice._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="api-para2">No Manage Order Found!</p>
      )}
    </div>
  );
}

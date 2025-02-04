import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerSkeleton from "./ShimmerSkeleton";

export default function OrderTracker() {
  const { id } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [remainingDays, setRemainingDays] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  useEffect(() => {
    fetchUserData();
    getUserInvoice();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_USER_LINK + `/users/api/user/${id}`
      );
      if (response) {
        setUserEmail(response.data.email);
        setUser(response.data.name);
      }
    } catch (error) {
      console.error(error);
    }
  };
  async function getUserInvoice() {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_INVOICE_LINK + "/invoices/payment/invoice"
      );
      if (response) {
        setUserOrder(response.data);
        // Fetch remaining days for each invoice
        response.data.forEach((invoice) => fetchRemainingDays(invoice));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // Fetch remaining delivery days for a given order
  const fetchRemainingDays = async (invoice) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_INVOICE_LINK +
          `/invoices/payment/invoices/${invoice._id}/remaining-days`
      );
      if (response) {
        setRemainingDays((prevDays) => ({
          ...prevDays,
          [invoice._id]: response.data.remainingDays,
        }));
      }
    } catch (error) {
      console.error("Error fetching remaining delivery days:", error);
    }
  };
  return (
    <div className="order-tracker-container">
      {loading ? (
        <ShimmerSkeleton cards={5} />
      ) : userOrder.length > 0 ? (
        <>
          <h2>Order Tracker For {user}</h2>

          {/* <input
      type="email"
      placeholder="Filter by Email"
      value={userEmail}
      onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchInvoices}>Search</button> */}

          {userOrder &&
            userOrder
              .filter((invoiceUser) => invoiceUser.CustomerEmail === userEmail)
              .map((invoice) => (
                <div key={invoice._id} className="order-card">
                  {/* Display multiple product images if available */}
                  <div className="img-order-tracker">
                    {invoice.ProductImg.split(", ").map((imgUrl, index) => (
                      <img
                        className="order-tracker-images"
                        key={index}
                        src={imgUrl}
                        alt={invoice.productName}
                      />
                    ))}
                  </div>
                  <div className="order-card-content">
                    <h3>Order for {invoice.CustomerName}</h3>
                    <p>Status: {invoice.status}</p>
                    <ul className="status-updates">
                      {invoice.statusUpdates.map((update, index) => (
                        <li key={index}>{`${update.status} - ${new Date(
                          update.updatedAt
                        ).toLocaleString()}`}</li>
                      ))}
                    </ul>
                    <p>
                      Remaining Delivery Days:{" "}
                      {remainingDays[invoice._id] ?? "Loading..."}
                    </p>
                    <p>Product: {invoice.productName}</p>
                    <p>Brand: {invoice.ProductBrand}</p>
                    <p>Color: {invoice.ProductColor}</p>
                    <p>Size: {invoice.ProductSize}</p>
                    <p>Price: ${invoice.ProductPrice}</p>
                    <p>subQuantity : {invoice.subQuantity}</p>
                    <p>Total Quantity: {invoice.totalQuantity}</p>
                    <p>Address: {invoice.CustomerAddress}</p>
                    <p>Date: {new Date(invoice.date).toLocaleString()}</p>
                  </div>
                </div>
              ))}
        </>
      ) : (
        <p className="api-para2">No Order Status found for this user.</p>
      )}
    </div>
  );
}

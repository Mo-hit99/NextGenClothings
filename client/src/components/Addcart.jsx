import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeToCart,
  subtractQuantityItems,
  updateQuantityItems,
} from "../redux/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Addcart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [CustomerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState("");
  const [ProductBrand, setProductBrand] = useState('');
  const [ProductColor, setProductColor] = useState('');
  const [ProductSize, setProductSize] = useState('');
  const [subQuantity,setSubQuantity] = useState('');
  const [subProductPrice,SetSubProductPrice]=useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [invoiceUserEmail,setInvoiceUserEmail]=useState("");
  const [ProductPrice, setProductPrice] = useState(cart.cartTotalAmount);
  const [totalQuantity, setTotalQuantity] = useState(cart.cartTotalQuantity);
  const [paymentId,setPaymentId]=useState('')
  // const [CustomerAddress, setCustomerAddress] = useState("");
  const [CustomerAddress ,setCustomerAddress] =useState('')
  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const userData = JSON.parse(user_info);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_LINK + `/api/user`
        );
        if (response.data) {
          const currentUser = response.data.find(
            (user) => user.email === UserEmail || user.email === userData.email
          ); // Find user by email
          if (currentUser) {
            setUserId(currentUser._id); // Set user ID
            setInvoiceUserEmail(currentUser.email)
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [UserEmail, userData]);

  function handleRemoveCart(cartItem) {
    dispatch(removeToCart(cartItem));
  }

  function updateItems(cartItem) {
    dispatch(updateQuantityItems(cartItem));
  }

  function subtractItems(cartItem) {
    dispatch(subtractQuantityItems(cartItem));
  }

  useEffect(() => {
    const getUserById = async () => {
      if (!userId) return; // Ensure userId is not null

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_LINK}/api/user/${userId}`
        );
        if (response) {
          setCustomerAddress(response.data)
          setCustomerName(response.data.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserById();
  }, [userId]);

  useEffect(()=>{
    setProductName(cart.items.map((ele) => ele.product.title).join(", "));
    setProductBrand(cart.items.map((ele) => ele.product.brand).join(", "));
    setProductColor(cart.items.map((ele) => ele.selectedColor).join(", "));
    setProductSize(cart.items.map((ele) => ele.selectedSize).join(", "));
    setProductPrice(cart.cartTotalAmount);
    setTotalQuantity(cart.cartTotalQuantity);
    setSubQuantity(cart.items.map((ele) => ele.quantity).join(", "));
    SetSubProductPrice(cart.items.map((ele)=> ele.product.price).join(", "));
  },[cart])
  // invoice rest api
  async function handlePayment() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_LINK + `/api/payment/order`,
        { amount : ProductPrice }
      );
      if(response){
        await handlePaymentVerify(response.data.data);
        setPaymentId(response.data.data.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MOHIT",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          await axios.post(
            import.meta.env.VITE_SERVER_LINK + `/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );
          setPaymentId(response.razorpay_payment_id);  // Update paymentId with verified payment ID
          await createInvoice(response.razorpay_payment_id);  // Pass paymentId to createInvoice
          dispatch(clearCart());
        } catch (error) {
          console.log(error.message);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const AddressHandleChange = (event) => {
    const address = event.target.value;
    setSelectedAddress(address);
    // console.log(address); // Log the selected address to the console
  };
  async function createInvoice(paymentId) {
    try {
      await axios.post(
        import.meta.env.VITE_SERVER_LINK + `/payment/invoice`,
        {
          CustomerName,
          productName,
          productDescription,
          ProductBrand,
          ProductColor,
          ProductSize,
          ProductPrice,
          CustomerAddress:selectedAddress,
          paymentId,
          totalQuantity,
          subQuantity,
          subProductPrice,
          email:invoiceUserEmail
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="shopping-main-container">
  <section className="shopping-cart">
    <div className="cart-title">
      <h1 className="title-heading">
        Shopping Bags <i className="fa-solid fa-tag"></i>
      </h1>
    </div>
    {cart.items.length === 0 ? (
      <div className="cart-empty">
        <p>
          Your cart is currently empty
          <i className="fa-regular fa-face-rolling-eyes"></i>
        </p>
      </div>
    ) : (
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Brand</th>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {cart.items.map((element) => (
            <tr key={element.product._id} className="shopping-item">
              <td>
                <img
                  className="shopping-cart-image"
                  src={`${element.product.filename[0]}`}
                  alt={element.product.title}
                />
              </td>
              <td>{element.product.brand}</td>
              <td>{element.product.title}</td>
              <td>{element.selectedSize}</td>
              <td>
                <div
                  className="bg-color"
                  style={{ backgroundColor: element.selectedColor, width: '30px', height: '30px', borderRadius: '50%' }}
                ></div>
              </td>
              <td>
                <div className="quantity-items-btn">
                  <button
                    onClick={() => subtractItems(element.productId)}
                    className="items-minus"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="count-items">{element.quantity}</span>
                  <button
                    onClick={() => updateItems(element.productId)}
                    className="items-plus"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </td>
              <td>
                <p className="shopping-pricing">
                  ₹ {parseInt(element.product.price) * element.quantity}
                </p>
              </td>
              <td>
                <button
                  onClick={() => handleRemoveCart(element.product._id)}
                  className="addcart-remove-btn"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>
  {cart.cartTotalQuantity > 0 && (
    <>
     <div className="radio-group">
      <div className="radio-wrapper">
     <h4 className="select-address-heading">Select an Address</h4>
       <div className="radio-item">
         <input
           type="radio"
           id="address"
           name="address"
           value={CustomerAddress.address}
           checked={selectedAddress === CustomerAddress.address}
           onChange={AddressHandleChange}
           />
         <label className="address" htmlFor="address">{CustomerAddress.address}</label>
       </div>
       <div className="radio-item">
         <input
           type="radio"
           id="officeAddress"
           name="address"
           value={CustomerAddress.officeAddress}
           checked={selectedAddress === CustomerAddress.officeAddress}
           onChange={AddressHandleChange}
           />
         <label className="address" htmlFor="officeAddress">{CustomerAddress.officeAddress}</label>
       </div>
      </div>
     </div>
    <div className="Total-amount">
      <div className="total-container">
        <h3 className="total-quantity">Total Quantity:</h3>
        <p>
          {cart.cartTotalQuantity} <i className="fa-solid fa-box"></i>
        </p>
        <h3 className="total-product-amount">Total Amount:</h3>
        <p>₹ {cart.cartTotalAmount}</p>
          </div>
        <div className="checkout-btn">
          <button
            onClick={handlePayment}
            className="checkoutcart-in_btn"
            >
            Pay ₹{cart.cartTotalAmount}
          </button>
        </div>
    </div>
    </>
  )}
</div>
  );
}

import {useLocation } from "react-router-dom";
import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cartSlice";
import axios from "axios";
export default function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state // Fallback to an empty object if state is not present
  const MoreDate = data.state;

  const [selectedColor, setSelectedColor] = useState('');
  const [userId,setUserId]=useState('')
  // const [amount,setAmount]=useState('')
  const [invoiceUserEmail,setInvoiceUserEmail]=useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [CustomerEmail,setCustomerEmail]=useState('')
  const [CustomerName,setCustomerName]=useState('')
  const [paymentId,setPaymentId]=useState('')
  const [ProductImg,setProductImg]=useState(MoreDate.filename?.[0] || '')
  const [selectedImage, setSelectedImage] = useState(
    MoreDate.filename?.[0] || ''
  );
  const [CustomerAddress, setCustomerAddress] = useState("");
  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const userData = JSON.parse(user_info);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if email is available
        const email = UserEmail || (userData && userData.email);
        if (!email) {
          console.log("No email found to search for user.");
          return; // Exit if email is not available
        }
        const response = await axios.get(
          import.meta.env.VITE_SERVER_LINK + `/api/user`
        );
        if (response.data) {
          // const currentUser = response.data.find(
          //   (user) => user.email === UserEmail || user.email === userData.email
          // ); // Find user by email
          const currentUser = response.data.find(
            (user) => user.email === email
          );
          if (currentUser) {
            setUserId(currentUser._id); // Set user ID
            setInvoiceUserEmail(currentUser.email);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (UserEmail || (userData && userData.email)) {
      fetchUserData();
    }
  }, [UserEmail, userData]);

  useEffect(() => {
    const getUserById = async () => {
      if (!userId) return; // Ensure userId is not null

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_LINK}/api/user/${userId}`
        );
        if (response) {
          setCustomerAddress(response.data.address);
          setCustomerName(response.data.name);
          setCustomerEmail(response.data.email)
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserById();
  }, [userId]);

  // invoice rest api
  async function handlePayment() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_LINK + `/api/payment/order`,
        { amount: MoreDate.price }
      );
      if (response) {
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
          setPaymentId(response.razorpay_payment_id); // Update paymentId with verified payment ID
          await createInvoice(response.razorpay_payment_id); // Pass paymentId to createInvoice
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
  async function createInvoice(paymentId) {
    try {
      await axios.post(import.meta.env.VITE_SERVER_LINK + `/payment/invoice`, {
        CustomerName,
        productName:MoreDate.title,
        productDescription:MoreDate.description,
        ProductBrand:MoreDate.brand,
        ProductColor:selectedColor,
        ProductSize:selectedSize,
        ProductPrice:MoreDate.price,
        CustomerAddress,
        paymentId,
        totalQuantity:0,
        subQuantity:0,
        subProductPrice:0,
        CustomerEmail,
        ProductImg,
        email: invoiceUserEmail,
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleImageClick = (filename) => {
    setSelectedImage(filename);
  };
  // if (!data._id) {
  //   return <div>Product not found or no details available.</div>;
  // }
  return (
    <section>
      {MoreDate && (
        <div key={MoreDate._id} className="product-details-container2">
          <div className="img-details2">
            <img
              className="product-img2"
              src={`${selectedImage}`}
              alt={MoreDate.title}
              />
            <div className="images-container2">
              {MoreDate.filename.map((image, index) => (
                <img
                  key={index}
                  className="dynamic-images-func2"
                  src={`${image}`}
                  alt={MoreDate.title}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="product-content2">
            <h1 className="product-detail-title2">{MoreDate.brand}</h1>
            <div className="product-details-description2">
              <p className="product-description2">{MoreDate.title}</p>
              <div className="color-wrapper2">
                {MoreDate.colors.map((color , index) => (
                    <button
                      className="colors-btn"
                      key={index}
                      style={{
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? "1px solid #000"
                            : "1px solid #cccccc",
                        margin: "4px",
                      }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                ))}
              </div>
              <div className="size-wrapper2">
                {MoreDate.sizes.map((size,index) => (
                    <button
                      className="sizes-btn2"
                      key={index}
                      style={{
                        border:
                          selectedSize === size
                            ? "1px solid #026eda"
                            : "1px solid #cccccc",
                        margin: "4px",
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                ))}
              </div>
            </div>
            <div className="price2">
              <p className="product-price2">{"₹ " + MoreDate.price}</p>
            </div>
            <div className="buy-now-btn2">
              <button onClick={()=>handlePayment(MoreDate.price)}
                title="buy Now"
                type="submit"
                className="buynow-in_btn2"
              >
                <span>Buy Now</span>
                <i className="fa-solid fa-bag-shopping"></i>
              </button>
              <button
                onClick={() =>
                  dispatch(
                    addToCard({
                      productId: MoreDate._id,
                      quantity: 1,
                      product: MoreDate,
                      selectedColor,
                      selectedSize,
                    })
                  )
                }
                title="Add to Cart"
                className="addcart-in_btn2"
              >
                <span>Add cart</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
            <div className="description-forProduct2">
              <h3 className="description-title-content2">Description</h3>
              <p className="description-content2">{MoreDate.description}</p>
            </div>
            <CommentSection id={MoreDate._id} />
          </div>
        </div>
      )}
    </section>
  );
}

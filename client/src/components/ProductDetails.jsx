import {useLocation } from "react-router-dom";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cartSlice";
import axios from "axios";
export default function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const MoreDate = data.state;
  console.log(MoreDate)
  const [selectedColor, setSelectedColor] = useState();
  const [amount,setAmount]=useState('')
  const [selectedSize, setSelectedSize] = useState();
  const [selectedImage, setSelectedImage] = useState(
    MoreDate.filename[0]
  );

  const handleImageClick = (filename) => {
    setSelectedImage(filename);
  };

  async function handlePayment(payment) {
    try {
      setAmount(payment);
      const response = await axios.post(
        import.meta.env.VITE_SERVER_LINK + `/api/payment/order`,
        { amount }
      );
      if (response) {
        handlePaymentVerify(response.data.data);
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
                            ? "2px solid #393a37"
                            : "1px solid gray",
                        margin: "5px",
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
                            ? "2px solid #026eda"
                            : "1px solid gray",
                        margin: "5px",
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

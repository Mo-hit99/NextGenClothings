import {useDispatch, useSelector} from 'react-redux'
import { removeToCart, subtractQuantityItems, updateQuantityItems } from "../redux/cartSlice";
export default function Addcart() {
  const cart = useSelector((state)=> state.cart);
  const dispatch=useDispatch();
    function handleRemoveCart(cartItem){
      dispatch(removeToCart(cartItem))
    }

    function updateItems(cartItem){
     dispatch(updateQuantityItems(cartItem))
    }

    function subtractItems(cartItem){
     dispatch(subtractQuantityItems(cartItem))
    }
  return (
      <div className='shopping-main-container'>
    <section className="shopping-cart">
    <div className="title">
      <h1 className="title-heading">Shopping Bags <i className="fa-solid fa-tag"></i></h1>
    </div>
    { cart.items.length === 0 ? (<div className="cart-empty"><p>Your cart is currently empty  <i className="fa-regular fa-face-rolling-eyes"></i></p></div>) :(cart.items?.map((element)=>(
      <>
      <div key={element.product._id} className="shopping-item">
        <div className="image-container-shopping">
          <img className="shopping-cart-image" src={`http://localhost:3000/productData/${element.product.filename}`} alt={element.product.title} />
        </div>
        <div className="shopping-cart-description">
          <h1 className="shopping-cart-heading">{element.product.brand}</h1>
          <h4 className="shopping-cart-content">{element.product.title}</h4>
        </div>
        <div className="quantity-items-btn">
          <button onClick={()=> subtractItems(element.productId)} className="items-minus"><i className="fa-solid fa-minus"></i></button>
          <span className="count-items">{element.quantity}</span>
          <button onClick={()=> updateItems(element.productId)} className="items-plus"><i className="fa-solid fa-plus"></i></button>
          <div className="quantity">
            <p className='quantity-items'>Quantity<span><i className="fa-solid fa-box"></i></span></p>
          </div>
        </div>
        <div className="shopping-cart-price">
          <p className="shopping-pricing"> ₹ {parseInt(element.product.price) * element.quantity}</p>
        </div>
        <div className="shopping-cart-buy-btn">
          <button onClick={()=> handleRemoveCart(element.product._id)} className="addcart-remove-btn"><i className="fa-solid fa-xmark"></i></button>
        </div>
      </div>
  </>
  )))}
  </section>
  {cart.cartTotalQuantity === 0 ? false:
  <div className="Total-amount">
    <div className="total-container">
      <h3 className='total-quantity'>Total Quantity:</h3>
    <p>{cart.cartTotalQuantity} <i className="fa-solid fa-box"></i></p>
    <h3 className='total-product-amount'>Total Amount:</h3>
    <p>₹ {cart.cartTotalAmount}</p>
     <div className="checkout-btn">
    <button className='checkoutcart-in_btn'>Pay ₹{cart.cartTotalAmount}</button>
     </div> 
    </div>
  </div>
  }
  </div>
  )
}

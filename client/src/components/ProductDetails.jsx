import { NavLink, useLocation } from "react-router-dom";
import CommentSection from "./CommentSection";
import { useState } from "react";
export default function ProductDetails() {
  const location = useLocation();
  const data = location.state;
  const MoreDate = data.state
  const [selectedImage,setSelectedImage] = useState(MoreDate.filename[0])

  const handleImageClick = (filename) => {
    setSelectedImage(filename);
  };
  return (
    <section>
        {MoreDate && (
        <div key={MoreDate._id} className="product-details-container">
          <div className="img-details">
            <img
              className="product-img" 
              src={`${import.meta.env.VITE_SERVER_LINK}/productData/${selectedImage}`}
              alt={MoreDate.title}
            />
            <div className="images-container">
              {MoreDate.filename.map((image, index) => (   
                <img 
                  key={index}
                  className="dynamic-images-func"  
                  src={`${import.meta.env.VITE_SERVER_LINK}/productData/${image}`} 
                  alt={MoreDate.title} 
                  onClick={() => handleImageClick(image)}
                  />
              ))}
            </div>
          </div>
          <div className="product-content">
            <h1 className="product-detail-title">{MoreDate.brand}</h1>
            <div className="product-details-description">
              <p className="product-description">{MoreDate.title}</p>
            </div>
            <div className="price">
              <p className="product-price">{"₹ " + MoreDate.price}</p>
            </div>
            <div className="buy-now-btn">
              <NavLink
                to={"/addcart"}
                title="Sign In"
                type="submit"
                className="buynow-in_btn"
              >
                <span>Buy Now</span>
                <i className="fa-solid fa-bag-shopping"></i>
              </NavLink>
            </div>
            <div className="description-forProduct">
              <h3 className="description-title-content">Description</h3>
              <p className="description-content">
                {MoreDate.description}
              </p>
            </div>
            <CommentSection id={MoreDate._id} />
          </div>
        </div>
      )}

    </section>
  );
}

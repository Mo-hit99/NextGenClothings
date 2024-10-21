
import { NavLink, useNavigate } from "react-router-dom";
import { useCategory } from "../../context/context";

    export default function FeatureCard({state,brand,description,formattedPrice,links,image}) {
   const navigate = useNavigate();
  const { setCategoryItem } =  useCategory();


  const handleCategory = (category) => {
    setCategoryItem(category);
    navigate('/products/q');
  };
  return (
    <section className='product-card2'>
      <button className="feature-category-btn" onClick={() => handleCategory("T-shirts")}>
     <NavLink state={{state}} className="product-card-img2" to={links}>
      <img className="product-card__image2" src={image} />
      </NavLink>
      <p className="product-card__brand2">{brand}</p>
      <p className="product-card__description2">{description}</p>
      {/* <p className="product-card__price">{formattedPrice}</p> */}
      </button>
    </section>
  )
}

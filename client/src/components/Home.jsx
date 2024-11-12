import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img from '../assets/henry-co-cp-VMJ-mdKs-unsplash.jpg'
import img2 from '../assets/jason-leung-DmD8HVOjy4c-unsplash.jpg'
import img3 from '../assets/tuananh-blue-_sNZ8XOm52w-unsplash.jpg'
import { NavLink, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { trendingData } from '../data/trendingProductData.js';
import FeatureCard from './FeatureCard';
import { useCategory } from '../../context/context.jsx';



export default function Home() {
  const navigate = useNavigate();
  const { setCategoryItem } =  useCategory();


  const handleCategory = (category) => {
    setCategoryItem(category);
    navigate('/products/q');
  };

  const [trendingProducts,setTrendingProducts]=useState(trendingData)
  return (
    <>
    <Carousel
        dynamicHeight={true}
        infiniteLoop={true}
        autoPlay={true}
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        interval={3000}
        >
        <div className='carousel-wrapper'>
          <img src={img} />
          <div className="bg-black-wrapper"></div>
          <div className="carousel-content">
          <p className='carousel-heading'>Get Ready to Save: 30% Discount on Nike Products Just for You!</p>
          <button className="carousel-btn" onClick={() => handleCategory("nike")}>Shop Now</button>
          </div>
        </div>
        <div className='carousel-wrapper'>
          <img src={img2} />
          <div className="bg-black-wrapper"></div>
          <div className="carousel-content"> 
          <p className='carousel-heading'>Get Ready to Save: 10% Discount on T-Shirts Products Just for You!</p>
          <button className="carousel-btn" onClick={() => handleCategory("T-shirts")}>Shop Now</button>
          </div>
        </div>
        <div className='carousel-wrapper'>
          <img src={img3} />
          <div className="bg-black-wrapper"></div>
          <div className="carousel-content">
          <p className='carousel-heading'>Get Ready to Save: 70% Discount on Polo Shirts Products Just for You!</p>
          <button className="carousel-btn" onClick={() => handleCategory("polo")}>Shop Now </button>
          </div>
        </div>
      </Carousel>
  <h1 className='title-arrivals'>NEW ARRIVALS</h1>
  <section className='Trending-container'>
    <div className="Trending">

    {trendingProducts?.map((trending)=>(
      <>
      <FeatureCard key={trending.id} links={'/products/q'} image={trending.image}
      brand={trending.brand}
      description={trending.description}
      >
    </FeatureCard>
  </>
))}
</div>
  </section>

  <div className="payday-sale">
    <div className="payday-container">
    <div className="sale-now">
      <h1 className='payday'>PayDay</h1>
      <h1 className='sale'>SALE NOW</h1>
    </div>
    <div className="spend-container">
     <div className="offer">
      <p className='spend-mini'>spend minimal $100 get 30% voucher code for your next purchase</p>
     </div>
     <div className="offer-deadline">
      <h1 className='date-offer'>1 June - 10 June 2024</h1>
      <p className='term-offer'>*Terms & Condition apply</p>
      <div className="showNow-btn">
        <NavLink className='offer-btn' to={'/products/q'}>SHOP NOW</NavLink>
      </div>
    </div>
    </div>
  </div>
  </div>
  </>
)
}

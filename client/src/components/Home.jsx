import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img from '../assets/henry-co-cp-VMJ-mdKs-unsplash.jpg'
import img2 from '../assets/jason-leung-DmD8HVOjy4c-unsplash.jpg'
import img3 from '../assets/tuananh-blue-_sNZ8XOm52w-unsplash.jpg'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { trendingData } from '../data/trendingProductData';
import FeatureCard from './FeatureCard';


export default function Home() {
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
        <div>
          <img src={img} />
          <p>Legend 1</p>
        </div>
        <div>
          <img src={img2} />
          <p>Legend 2</p>
        </div>
        <div>
          <img src={img3} />
          <p>Legend 3</p>
        </div>
      </Carousel>
  <h1 className='title-arrivals'>NEW ARRIVALS</h1>
  <section className='Trending'>
    {trendingProducts?.map((trending)=>(
      <FeatureCard key={trending.id} links={'/products'} image={trending.image}
      brand={trending.brand}
      description={trending.description}
      >
    </FeatureCard>
))}
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
        <NavLink className='offer-btn' to={'/products'}>SHOP NOW</NavLink>
      </div>
    </div>
    </div>
  </div>
  </div>
  </>
)
}

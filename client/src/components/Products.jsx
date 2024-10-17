import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cartSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ProductLoading from "./ProductLoading";
import Search from "./Search";
import { useCategory } from "../../context/context";
import { addToWishList } from "../redux/wishlistslice";


const LIMIT = 5;

export default function Products() {
  
  const { categoryItem } = useCategory();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loadingOff,setLoadingOff]=useState(true)
  const [activePage, setActivePage] = useState(1);
  const [totalProductData, setTotalProductData] = useState(0);
  const [like,setLinke]= useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchProductData();
  }, []);

  const likehandler = (product) => {
    setLinke(like === product._id ? null : product._id); // Toggle like state
    dispatch(addToWishList({wishlistId:product._id, wishlistItem:product}))
  };
  const filteredData = categoryItem 
  ? data.filter(ele => ele.category === categoryItem) 
  : data.filter(product => (category.length === 0) || category.includes(product.category) && (brand.length === 0 || brand.includes(product.brand)));
  async function fetchProductData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/productData`, {
        params: {
          page: activePage,
          pageSize: LIMIT,
        },
      });
      setActivePage(activePage + 1);
      setData([...data, ...response.data.queryData]);
      setTotalProductData(response.data.pagination.totalCount);
      if (!response) {
        console.log("failed to fetch");
      }
      if (response.ok) {
        console.log("fetch data successfully");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  }
  
  async function filterSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/productData?category=${category}&brand=${brand}`
      );
      let result = await response.data;
      if (result) {
        setData(result.queryData);
        setLoadingOff(!loadingOff)
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  }
  // function handleCategory(categoryItem) {
  //   const filterCategory = data.filter((ele) => ele.category === categoryItem);
  //   setData(filterCategory);
  //   setLoadingOff(!loadingOff)
  // }
  // Handle checkbox change for categories
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(category => category !== value) 
        : [...prev, value]
    );
    
  };

  // Handle checkbox change for brands
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(prev => 
      prev.includes(value) 
        ? prev.filter(brand => brand !== value) 
        : [...prev, value]
    );
    console.log(value)
  };  

  return (
    <section className="product-section-container2">
      <Search setData={setData}/>
        {/* <div className="category-selection">
          <button onClick={() => handleCategory("shoes")}>Shoes</button>
        </div> */}
      <div className="main-container-form2">
        <InfiniteScroll
          style={{ textAlign: "center" }}
          dataLength={data.length}
          next={fetchProductData}
          hasMore={data.length < totalProductData}
          loader={loadingOff && data != 0 && <ProductLoading />}
        >
          <div className="productCard-container2">
            {filteredData && filteredData.length > 0 ?  (
              filteredData?.map((product) => (
                <ProductCard
                  key={product._id}
                  state={product}
                  links={`/ProductDetails/${product._id}`}
                  image={product.filename[0]}
                  brand={product.brand}
                  description={product.title}
                  formattedPrice={"₹ " + product.price}
                  rate={product.rate}
                  count={product.count}
                  likehandler={() => likehandler(product)} // Pass product object to handler
                  like={(like === product._id)} // Check if in wishlist
                >
                  <button
                    onClick={() =>
                      dispatch(
                        addToCard({
                          productId: product._id,
                          quantity: 1,
                          product: product,
                        })
                      )
                    }
                    title="Sign In"
                    className="addcart-in_btn2"
                  >
                    <span>Add cart</span>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </ProductCard>
              ))
            ):(
              <p className="result-not-found2">Result Not Found!</p>
            )}
          </div>
        </InfiniteScroll>
        <div className="filter-product-containe2r">
          <form className="filter-form-section2" onSubmit={filterSubmit}>
            <p className="filter-para2">
              <i id="filter-icon" className="fa-solid fa-filter"></i> Filter
              <span className="filter-para-result2">Results({data.length})</span>
            </p>

            <div className="category-input2">
              <p className="filter-category-heading2">Category</p>
              <input
                className="check-box2"
                type="checkbox"
                name="shoes"
                id="shoes"
                value={"shoes"}
                onChange={handleCategoryChange}
              />
              <label className="checkbox-label" htmlFor="shoes">
                Shoes
              </label>
              <br />
              <input
                className="check-box2"
                type="checkbox"
                name="shoes"
                id="T-Shirts"
                value={"t-shirts"}
                onChange={handleCategoryChange}
              />
              <label className="checkbox-label2" htmlFor="T-Shirts">
                T-Shirts
              </label>
            </div>
            <div className="brand-input2">
              <p className="filter-brand-heading2">Brand</p>
              <input
                className="check-box2"
                type="checkbox"
                name="shoes"
                id="brand"
                value={"nike"}
                onChange={handleBrandChange}
              />
              <label className="checkbox-label2" htmlFor="brand">
                Adidas
              </label>
              <br />
              <input
                className="check-box2"
                type="checkbox"
                name="shoes"
                id="Levis"
                value={"Levis"}
                onChange={handleBrandChange}
              />
              <label className="checkbox-label2" htmlFor="Levis">
                Levis
              </label>
            </div>
            <button className="filter-btn2">Filter</button>
          </form>
        </div>
      </div>
    </section>
  );
}

import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cartSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ProductLoading from "./ProductLoading";
import Search from "./Search";

const LIMIT = 5;

export default function Products() {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [loadingOff,setLoadingOff]=useState(true)
  const [activePage, setActivePage] = useState(1);
  const [totalProductData, setTotalProductData] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
      fetchProductData();
  }, []);

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

  function handleCategory(categoryItem) {
    const filterCategory = data.filter((ele) => ele.category === categoryItem);
    setData(filterCategory);
    setLoadingOff(!loadingOff)
  }
  return (
    <section className="product-section-container">
      <Search setData={setData}/>
        <div className="category-selection">
          <button onClick={() => handleCategory("shoes")}>Shoes</button>
        </div>
      <div className="main-container-form">

        <InfiniteScroll
          style={{ textAlign: "center" }}
          dataLength={data.length}
          next={fetchProductData}
          hasMore={data.length < totalProductData}
          loader={loadingOff && data != 0 && <ProductLoading />}
        >
          <div className="productCard-container">
            {data && data.length > 0 ?  (
              data?.map((product) => (
                <ProductCard
                  key={product._id}
                  state={product}
                  links={`/ProductDetails/${product._id}`}
                  image={`${import.meta.env.VITE_SERVER_LINK}/productData/${product.filename[0]}`}
                  brand={product.brand}
                  description={product.title}
                  formattedPrice={"₹ " + product.price}
                  rate={product.rate}
                  count={product.count}
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
                    className="addcart-in_btn"
                  >
                    <span>Add cart</span>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </ProductCard>
              ))
            ):(
              <p className="result-not-found">Result Not Found!</p>
            )}
          </div>
        </InfiniteScroll>
        <div className="filter-product-container">
          <form className="filter-form-section" onSubmit={filterSubmit}>
            <p className="filter-para">
              <i id="filter-icon" className="fa-solid fa-filter"></i> Filter
              <span className="filter-para-result">Results({data.length})</span>
            </p>

            <div className="category-input">
              <p className="filter-category-heading">Category</p>
              <input
                className="check-box"
                type="checkbox"
                name="shoes"
                id="shoes"
                value={"shoes"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="checkbox-label" htmlFor="shoes">
                Shoes
              </label>
              <br />
              <input
                className="check-box"
                type="checkbox"
                name="shoes"
                id="T-Shirts"
                value={"t-shirts"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="checkbox-label" htmlFor="T-Shirts">
                T-Shirts
              </label>
            </div>
            <div className="brand-input">
              <p className="filter-brand-heading">Brand</p>
              <input
                className="check-box"
                type="checkbox"
                name="shoes"
                id="brand"
                value={"Addidas"}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label className="checkbox-label" htmlFor="brand">
                Adidas
              </label>
              <br />
              <input
                className="check-box"
                type="checkbox"
                name="shoes"
                id="Levis"
                value={"Levis"}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label className="checkbox-label" htmlFor="Levis">
                Levis
              </label>
            </div>
            <button className="filter-btn">Filter</button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import ShimmerSkeleton from "./ShimmerSkeleton";

export default function ForDeveloper() {
  const url = import.meta.env.VITE_SERVER_PRODUCT_LINK;
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getProductData();
  }, []);

  // Fetch product data from server
  async function getProductData() {
    setLoading(true);
    try {
      fetch(url + "/products/productData")
        .then((response) => response.json())
        .then((data) => setProductData(data))
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
    }
  }
  const toggleReadMore = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };
  console.log(loading)
  return (
          <div className="api-container">
      {loading ? (
          <ShimmerSkeleton cards={4}/>
      ) : productData.length !== 0  ? 
        (
            <>
          <h1>For Developers</h1>
          <div className="restApi-wrapper">
            <h3 className="api-heading">Routes</h3>
            <p className="api-para">
              All HTTP methods are supported. You can use https for your
              requests.
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <b className="request res-get">GET</b>{" "}
                <a className="response-link" href={`${url}/productData`}>
                  /productData
                </a>
              </li>
              <li>
                <b className="request res-post">POST</b>{" "}
                <a className="response-link" href={`${url}/posts`}>
                  Coming Soon...
                </a>
              </li>
              <li>
                <b className="request res-put">PUT</b>{" "}
                <a className="response-link" href={`${url}/posts/1`}>
                  Coming Soon...
                </a>
              </li>
              <li>
                <b className="request res-patch">PATCH</b>{" "}
                <a className="response-link" href={`${url}/posts/1`}>
                  Coming Soon...
                </a>
              </li>
              <li>
                <b className="request res-delete">DELETE</b>{" "}
                <a className="response-link" href={`${url}/posts/1`}>
                  Coming Soon...
                </a>
              </li>
            </ul>
            <p className="api-para">
              <strong className="para-strong">Note:</strong> see guide for usage
              examples.
            </p>
          </div>
          <h2 className="api-title">Product Data</h2>
          <pre className="json-data-pre">
            {isExpanded
              ? JSON.stringify(productData, null, 2)
              : JSON.stringify(productData, null, 2).slice(0, 180) + "..."}
            <button onClick={toggleReadMore} className="read-more-btn">
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </pre>
                </>
            ):(
                <p className="api-para2"> No result Found!</p>
            )
        }
</div>
  );
}

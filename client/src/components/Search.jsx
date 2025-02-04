// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
 const [query ,setQuery] = useState('');
 const navigate = useNavigate();
  // async function search(e) {
  //   e.preventDefault();
  //   try {
  //     let response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_LINK}/productData/?search=${query}`
  //     );
  //     let result = await response.data;
  //     if (result) {
  //       setData(result.queryData);
  //     }
  //   } catch (error) {
  //     console.log(`error:${error}`);
  //   }
  // }

   function handleSearch(e){
    e.preventDefault();
    if(query.trim()){
      navigate(`/products/q?search=${encodeURIComponent(query)}`)
    }

  }
  return (
    <div>
     <form className="product-search-form" onSubmit={handleSearch}>
        <input
          className="product-search-input"
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="product-search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context/context";
import { clearCart } from "../redux/cartSlice";

const button = [
  {
    id: 1,
    category: " Women shoes",
  },
  {
    id: 2,
    category: " Women T-Shirts",
  },
  {
    id: 3,
    category: "Man shoes",
  },
  {
    id: 4,
    category: "Man T-Shirts",
  },
];

export default function NavLinks({ admin, logo, products, signIn, Addcart }) {
  const [userId, setUserId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const carts = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const isUserSignedIn = !!localStorage.getItem("token");
  const isUserGoogleSignedIn = !!localStorage.getItem("user-info");
  const { setCategoryItem } = useCategory();
  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const userData = JSON.parse(user_info);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user-info");
    dispatch(clearCart());
    navigate("/signIn");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_LINK + `/api/user`
        );
        if (response) {
          const currentUser = response.data.find(
            (user) => user.email === UserEmail || user.email === userData.email
          ); // Find user by email
          if (currentUser) {
            setUserId(currentUser._id); // Set user ID
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [UserEmail, userData]);

  const handleCategory = (category) => {
    setCategoryItem(category);
    navigate("/products");
  };

  return (
    <header className="container">
      <div className="new-nav-wrapper">
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
      <NavLink className="nav-link-text-logo" to="/">
        {logo}
      </NavLink>
      <nav className={`nav-container ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-link01">
          <ul>
            {isUserSignedIn ||
            (isUserGoogleSignedIn && UserEmail === "u9120307@gmail.com") ? (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/Admin">
                    {admin}
                  </NavLink>
                </li>
                <li>
                  <div className="paste-button">
                    <button className="btn-dropdown">
                      <p className="nav-link-product">Products</p>
                    </button>
                    <div className="dropdown-content">
                      <div className="dropdown-wrapper-for-category">
                        <NavLink className="nav-link-text2" to="/products">
                          <p className="all-products">all Products</p>
                        </NavLink>
                        {button &&
                          button?.map((ele) => (
                            <div className="btn-category-wrapper" key={ele.id}>
                              <button
                                className="nav-link-category"
                                onClick={() => handleCategory(ele.category)}
                              >
                                {ele.category}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="paste-button">
                    <button className="btn-dropdown">
                      <NavLink className="nav-link-text" to="/products">
                        {products}
                      </NavLink>
                    </button>
                    <div className="dropdown-content">
                      <div className="dropdown-wrapper-for-category">
                        {button &&
                          button?.map((ele) => (
                            <div className="btn-category-wrapper" key={ele.id}>
                              <button
                                className="nav-link-category"
                                onClick={() => handleCategory(ele.category)}
                              >
                                {ele.category}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navLink">
          <ul>
            {isUserGoogleSignedIn || (isUserSignedIn && UserEmail) ? (
              <>
                <ul>
                  <div className="menu">
                    <div className="item">
                      <span className="link">
                        {isUserGoogleSignedIn ? (
                          <img
                            className="profile-image"
                            src={userData.image}
                            alt={userData.name}
                          />
                        ) : (
                          <p>{UserEmail.split("").splice(0, 8).join("")}</p>
                        )}
                        <svg viewBox="0 0 360 360" xmlSpace="preserve">
                          <g id="SVGRepo_iconCarrier">
                            <path
                              id="XMLID_225_"
                              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <div className="submenu">
                        {isUserGoogleSignedIn ? (
                          <>
                            {/* <div className="submenu-item">
                              <a href="#" className="submenu-link">
                                <span className="dropdown-name">Name:</span>
                                {userData?.name}
                              </a>
                            </div>``
                            <div className="submenu-item">
                              <a href="#" className="submenu-link">
                                <span className="dropdown-email">Email:</span>
                                {userData?.email}
                              </a>
                            </div> */}
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/userDashboard/${userId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                  width="20" // Set width here
                                  height="20" // Set height here
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                                Profile
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/wishlist`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="{1.5} "
                                  stroke="currentColor"
                                  className="size-6"
                                  width="20" // Set width here
                                  height="20" // Set height here
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>
                                WhistList
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/UserInvoice/${userId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                  width="20" // Set width here
                                  height="20" // Set height here
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                                  />
                                </svg>
                                Invoice
                              </NavLink>
                            </div>
                            <div className="submenu-item">
                              <button
                                className="signOut"
                                onClick={handleSignOut}
                              >
                                Sign Out
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="submenu-item">
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/userDashboard/${userId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="{1.5}"
                                  stroke="currentColor"
                                  className="size-6"
                                  width="20" // Set width here
                                  height="20" // Set height here
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                                Profile
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/wishlist`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="{1.5}"
                                  stroke="currentColor"
                                  className="size-6"
                                  width="20" // Set width here
                                  height="20" // Set height here
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>
                                WhistList
                              </NavLink>
                            </div>
                            <button className="signOut" onClick={handleSignOut}>
                              Sign Out
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <li>
                    {/* <NavLink className="nav-link-text" to="/Addcart">
                      {Addcart}
                      <small className="nav-add-cart-items">
                        {carts.cartTotalQuantity === 0
                          ? false
                          : carts.cartTotalQuantity}
                      </small>
                    </NavLink> */}
                  </li>
                </ul>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/signIn">
                    {signIn}
                  </NavLink>
                </li>

                <li>
                  {/* <NavLink className="nav-link-text" to="/Addcart">
                    {Addcart}
                    <small className="nav-add-cart-items">
                      {carts.cartTotalQuantity === 0
                        ? false
                        : carts.cartTotalQuantity}
                    </small>
                  </NavLink> */}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <ul className="nav-link-cart-wrapper">
        <li className="nav-link-text-cart">
          <NavLink className="nav-link-text" to="/Addcart">
            {Addcart}
            <small className="nav-add-cart-items">
              {carts.cartTotalQuantity === 0 ? false : carts.cartTotalQuantity}
            </small>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

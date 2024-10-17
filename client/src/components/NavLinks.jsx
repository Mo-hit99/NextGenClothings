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
                                Profile
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/wishlist`}
                              >
                                WhistList
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/UserInvoice/${userId}`}
                              >
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
                                Profile
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
                                className="nav-link-text"
                                to={`/wishlist`}
                              >
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

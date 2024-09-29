import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
export default function NavLinks({ admin, logo, products, signIn, Addcart }) {
  const carts = useSelector((store) => store.cart);
  const isUserSignedIn = !!localStorage.getItem("token");
  const isUserGoogleSignedIn = !!localStorage.getItem("user-info");

  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const userData = JSON.parse(user_info);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user-info");
    navigate("/signIn");
  };

  return (
    <header className="container">
      <nav className="nav-container">
        <NavLink className="nav-link-text-logo" to="/">
          {logo}
        </NavLink>
        <div className="nav-link01">
          <ul>
            {isUserSignedIn && UserEmail === "u9120307@gmail.com" ? (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/Admin">
                    {admin}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-text" to="/products">
                    {products}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/products">
                    {products}
                  </NavLink>
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
                        {isUserGoogleSignedIn  ? (
                          <img
                            className="profile-image"
                            src={userData.image}
                            alt={userData.name}
                          />
                        ) : (
                          <p>{UserEmail.split('').splice(0,8).join('')}</p>
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
                            <div className="submenu-item">
                              <a href="#" className="submenu-link">
                                <span className="dropdown-name">Name:</span>
                                {userData?.name}
                              </a>
                            </div>
                            <div className="submenu-item">
                              <a href="#" className="submenu-link">
                                <span className="dropdown-email">Email:</span>
                                {userData?.email}
                              </a>
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
                            <button className="signOut" onClick={handleSignOut}>
                              Sign Out
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <li>
                    <NavLink className="nav-link-text" to="/Addcart">
                      {Addcart}
                      <small className="nav-add-cart-items">
                        {carts.cartTotalQuantity === 0
                          ? false
                          : carts.cartTotalQuantity}
                      </small>
                    </NavLink>
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
                  <NavLink className="nav-link-text" to="/Addcart">
                    {Addcart}
                    <small className="nav-add-cart-items">
                      {carts.cartTotalQuantity === 0
                        ? false
                        : carts.cartTotalQuantity}
                    </small>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

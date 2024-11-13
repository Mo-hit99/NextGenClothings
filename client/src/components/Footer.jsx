import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { NavLink } from "react-router-dom";
export default function Footer() {
  const [date, setDate] = useState(new Date());
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY);
  if (state.succeeded) {
    alert("successfully submit");
  }
  return (
    <footer className="sticky-footer">
      <div className="footer">
        <div className="footer-container">
          {/* <div className="col-1">
                <img src="/" alt="add image"/>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, maxime molestias sapiente labore doloribus ut animi, tenetur, aliquid quaerat praesentium obcaecati laudantium!
                </p>
            </div> */}
          <div className="col-2">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Categories</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">T-shirt</a>
              </li>
              <li>
                <a href="#">Jeans</a>
              </li>
              <li>
                <a href="#">Anime Collections</a>
              </li>
              <li>
                <a href="#">Sports gears</a>
              </li>
              <li>
                <a href="#">Shoes</a>
              </li>
              <li>
                <a href="#">Sunglasses</a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h3>Contact Us</h3>
            <form className="submission" onSubmit={handleSubmit}>
              <label className="contact-us-label" htmlFor="email">
                <i className="far fa-envelope"></i> Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <textarea
                type="text"
                placeholder="Enter the Query"
                id="message"
                name="message"
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
              <button
                type="submit"
                className="submission-btn"
                disabled={state.submitting}
              >
                <i className="fa-solid fa-paper-plane"></i> Submit
              </button>
            </form>
          </div>
        </div>
        <div className="footer-2">
          <p>© {date.getFullYear()} E-commerce Site. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="customerCare">
          <NavLink className={"customer-care"} to={"/customerCare"}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f3f3f3"
              strokeWidth={1}
              strokeLinecap="square"
              strokeLinejoin="bevel"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg> */}
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 113.98 122.88"
              style={{
                enableBackground: "new 0 0 113.98 122.88",
              }}
              xmlSpace="preserve"
            >
              <style type="text/css">
                {".st0{fill-rule:evenodd;clip-rule:evenodd;}"}
              </style>
              <g>
                <path
                  className="st0"
                  fill="#FFFFFF" // Set fill color to white
                  d="M79.21,84.71c-0.84-0.76-1.98-1.74-3.18-2.78c-2.61-2.24-5.51-4.73-6.86-6.42l-0.13,0.09 c-2.76,1.89-6.17,3.15-10.83,3.14c-4.35-0.01-7.62-1.22-10.31-3.01c-0.66-0.44-1.27-0.91-1.86-1.4c-1.33,1.74-4.59,4.51-7.49,6.97 c-1.77,1.5-3.4,2.88-4.26,3.72c-3,3.75-5.65,7.75-7.88,12.22l9.23-0.23l21.23,18.46l21.23-18.46l9.23,0.23 C85.05,92.64,82.32,88.55,79.21,84.71L79.21,84.71z M40.79,65.37c2.56,1.66,5.38,2.99,8.46,3.97c0.31-0.7,0.74-1.32,1.36-1.8 c1.86-1.44,7.31-1.3,8.99,0.09c1.41,1.17,1.43,3.85,0.39,5.25c-1.8,2.42-8.34,1.14-12.25,0.08c0.59,0.51,1.21,0.99,1.86,1.43 c2.26,1.51,5,2.53,8.62,2.53c3.92,0.01,6.79-1.05,9.12-2.64c0.43-0.3,0.85-0.61,1.26-0.95c0.13-0.22,0.33-0.4,0.58-0.5 c1.6-1.42,2.99-3.08,4.37-4.74l2.46-2.95c0.3-0.36,0.4-0.48,0.51-0.61c0.3-0.35,0.64-0.75,0.97-1.16c0.09-0.11,0.21-0.21,0.35-0.28 c0.4-1.3,0.7-2.66,0.91-4.09c0.7-4.67,0.72-8.3-1.38-12.6c-1.82-3.71-4.38-5.64-7.17-7.02c3.01,3.36,5.5,6.62,4.85,9.3 c-3.68-4.04-7.47-7.57-11.4-10.48c-8.21-4.24-13.04-9.99-15.19-16.95C36.29,33.4,34.17,47.62,38.68,63.09 c0.16,0.07,0.3,0.17,0.4,0.29L40.79,65.37L40.79,65.37z M42.86,71.17c-3.04-1.52-5.9-3.76-8.6-5.99l-4.94,0.13 c-0.68-0.78-1.25-1.68-1.73-2.69c-0.39-0.04-0.78-0.12-1.16-0.24c-4.75-1.49-8.69-12.05-7.91-17.03c0.44-2.82,1.44-3.84,3.06-4.46 c-0.08-0.23-0.12-0.47-0.12-0.73V29.53c0-4,1.2-7.93,3.15-11.49c2.13-3.91,5.17-7.4,8.49-10.04c6.78-5.41,15.56-8.09,24.29-8 c8.66,0.09,17.3,2.92,23.91,8.53c3.19,2.71,5.88,6.26,7.76,10.18c1.83,3.82,2.89,8,2.89,12.11v8.78c0,1.25-1.01,2.26-2.26,2.26 c-0.72,0-1.36-0.33-1.77-0.86c1.11,8.34,0.07,16.92-3.26,24.04h-5.63c-0.13,0.15-0.25,0.3-0.37,0.44l-0.5,0.59l-2.46,2.95 c-1.43,1.72-2.88,3.45-4.59,4.96c0.9,1.18,3.9,3.75,6.56,6.04c0.86,0.74,1.7,1.46,2.43,2.1c7.29,2.84,14.41,5.75,19.94,9.21 c4.27,2.67,6.47,4.69,8.2,7.93c2.73,5.12,4.88,10.8,5.52,17.54c0.57,6.03,0.52,5.76-5.27,5.88c-30.52,0.61-73.02-0.51-102.88,0 c-5.43,0.09-5.99,0.48-5.42-7.25c1.85-8.77,0.8-7.61,5.37-16.17c1.73-3.24,3.93-5.25,8.2-7.93c5.56-3.49,12.72-6.41,20.06-9.26 c0.9-0.8,1.99-1.73,3.14-2.71c3.2-2.72,6.87-5.83,7.28-6.75C43.76,72.15,43.3,71.67,42.86,71.17L42.86,71.17z M87.42,38.05v-7.22 c0-3.44-0.89-6.96-2.43-10.17c-1.6-3.35-3.9-6.37-6.61-8.68C72.59,7.06,64.99,4.58,57.34,4.5c-7.74-0.08-15.5,2.28-21.45,7.03 c-2.88,2.3-5.51,5.3-7.34,8.67c-1.6,2.93-2.58,6.12-2.58,9.34v9.09c2.45-11.79,7.45-20.38,15.22-25.51 c5.72-3.78,9.13-3.99,15.8-3.99c5.83,0,9.4-0.13,14.37,3.14C79.94,17.91,85.38,27.63,87.42,38.05L87.42,38.05z M49.73,104.51 l4.21-14.6l-2.06-2.26c-0.93-1.36-1.13-2.54-0.62-3.56c1.12-2.21,3.43-1.8,5.59-1.8c2.26,0,5.05-0.43,5.76,2.4 c0.24,0.95-0.06,1.94-0.72,2.96l-2.06,2.26l4.21,14.6l-7.15,5.65L49.73,104.51L49.73,104.51z"
                />
              </g>
            </svg>
            Customer support
          </NavLink>
        </div>
        <div className="forDevelopers">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>
          <NavLink to={"/forDevelopers"}>For Developers</NavLink>
        </div>
      </div>
    </footer>
  );
}

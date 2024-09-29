import { useState } from "react"
import { useForm, ValidationError } from '@formspree/react';
export default function Footer() {
    const [date,setDate]= useState(new Date);
    const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY);
     if(state.succeeded){
        alert('successfully submit')
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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Services</a></li>
                </ul>
            </div>
            <div className="col-3">
                <h3>Services</h3>
                <ul>
                    <li><a href="#">T-shirt</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Anime Collections</a></li>
                    <li><a href="#">Sports gears</a></li>
                    <li><a href="#">Shoes</a></li>
                    <li><a href="#">Sunglasses</a></li>
                </ul>
            </div>
            <div className="col-4">
                <h3>Contact Us</h3>
                <form className="submission" onSubmit={handleSubmit}>
                    <label className="contact-us-label" htmlFor="email"><i className="far fa-envelope"></i> Email</label>
                    <input type="email" id="email" placeholder="Enter your email" name="email" required />
                    <ValidationError  prefix="Email" field="email"errors={state.errors}/>
                    <textarea type="text" placeholder="Enter the Query" id="message" name="message" required />
                    <ValidationError   prefix="Message"  field="message" errors={state.errors}/>
                    <button type="submit"  className="submission-btn" disabled={state.submitting}><i className="fa-solid fa-paper-plane"></i> Submit</button>
                </form>
            </div>
        </div>
        <div className="footer-2">
            <p>© {date.getFullYear()} E-commerce Site. All Rights Reserved.</p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
        </div>
        </div>
    </footer>
)
}

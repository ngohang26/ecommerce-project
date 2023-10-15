import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="footer section-padding">
        <div className="footer-link">
          <div className="footer-link-item">
            <h4>About FootMart</h4>
            <a href='/'>
              <p>About us</p>
            </a>
            <a href='/'>
              <p>Conditions</p>
            </a>
            <a href='/'>
              <p>Careers</p>
            </a>
            <a href='/'>
              <p>Ultras Press</p>
            </a>
            <a href='/'>
              <p>Policies</p>
            </a>
            <a href='/'>
              <p>Privacy Policy</p>
            </a>
          </div>
          <div className="footer-link-item">
            <h4>Customer Service</h4>
            <a href='/'>
              <p>Help center</p>
            </a>
            <a href='/'>
              <p>How to buy</p>
            </a>
            <a href='/'>
              <p>Payment</p>
            </a>
            <a href='/'>
              <p>Shipping</p>
            </a>
            <a href='/'>
              <p>Return & Refund</p>
            </a>
            <a href='/'>
              <p>Warranty policy</p>
            </a>
          </div>
          <div className="footer-link-item">
            <h4>Payment</h4>
            <div className="payment-options">
              <img src="visa.png" alt="Visa" />
              <img src="mastercard.png" alt="Mastercard" />
              <img src="jcb.png" alt="JCB" />
              <img src="american.png" alt="American Express" />
              <img src="napas.png" alt="Napas" />
              <img src="shopeepay.png" alt="Shopee Pay" />
            </div>
            <h4>Logistics</h4>
            <div className="payment-options">
              <img src="spx.png" alt="spx" />
              <img src="ahamove.png" alt="Ahamove" />
              <img src="ghn.png" alt="giao hang nhanh" />
              <img src="ghtk.png" alt="giao hang tk" />
              <img src="j&t.png" alt="j&t" />
              <img src="viettelpost.png" alt="viettelpost" />
            </div>
          </div>
          <div className="footer-link-item">
            <h4>Follow Us</h4>
            <div className="icon-follow">
              <i class='bx bxl-facebook'></i>
              <i class='bx bxl-instagram'></i>
              <i class='bx bxl-youtube' ></i>
              <i class='bx bxl-amazon' ></i>
            </div>
            <h4>Contact Us</h4>
            <div className="icon-contact">
              <a href='/'>
                <i class='bx bx-location-plus' ></i>Thang Long University, Hanoi
              </a>
              <a href='/'>
                <i class='bx bx-envelope' ></i>thanglong@tlu.vn
              </a>
            </div>
          </div>
          <div className="footer-link-item">
            <h4>Subcribe Us</h4>

            <a href='/'>Subscribe to our newsletter to get updates about our grand offers.</a>
            <form action="#">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;


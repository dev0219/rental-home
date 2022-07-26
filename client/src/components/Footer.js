import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="FooterSection_footer">
      <div className="Container_footer">
        <div className="ColumnLeft_footer">
          <h1>Let's find your dream Home</h1>
          <div className="SocialLinks_footer">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
        <div className="ColumnRight_footer">
          <div>
            <h3>Contact Us</h3>
            <ul>
              <li>FAQs</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3>Offices</h3>
            <ul>
              <li>United States</li>
              <li>Europe</li>
              <li>Canada</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

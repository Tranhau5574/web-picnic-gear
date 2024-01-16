import React from "react";
import "./Footer.css"; // Import CSS file for custom styling
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "phosphor-react";

function Footer() {

  return (
    <footer className="custom-footer">
      <div className="container">
      
        <div className="row">
        <div className="col-md-4">
            <h3>Camping Shop</h3>
            
          </div>
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              Camping Shop - nơi phân phối các sản phẩm về du lịch, dã ngoại 
              tốt nhất thị trường 
            </p>
          </div>
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <p>Địa chỉ: 101 Đê Tô Hoàng , Quận Hai Bà Trung, thành phố Hà Nội</p>
            <p>Số điện thoại: 0987654321</p>
            <p>Email: campingshop@gmail.com</p>
          </div>
          <div className="col-md-4">
            <h3>Follow Us</h3>
            <a href="https://www.facebook.com/leuphot/" target="_blank" rel="noopener noreferrer">
              <FacebookLogo size={40} weight="fill" />
            </a>
            <a href="https://www.instagram.com/vit_chungtalamotgiadinh/" target="_blank" rel="noopener noreferrer">
              <InstagramLogo size={40} weight="fill" />
            </a>
            <a href="https://www.youtube.com/@freecodecamp" target="_blank" rel="noopener noreferrer">
            <YoutubeLogo size={40} weight="fill" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

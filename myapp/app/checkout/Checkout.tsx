'use client';
import './checkout.css';
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import imageQR from '../../public/assets/QR.png';

const Checklast = () => {
  return (
    <div className="confirm-container1">
      <div className="logo-container1">
        <Image src={logo} alt="Logo1" width={150} height={150} />
      </div>
      <h2 className="checkout-title1">CHECKOUT</h2>
      <p className="scan-title1">Scan QR to pay</p>
      <Image src={imageQR} alt="QR Code1" width={232} height={268} className="qr-image1" />
      <div className="instructions1">
        <p><strong>To proceed with your booking, please</strong></p>
        <ol>
          <li>Take a screenshot of your UPI or bank transfer payment receipt.</li>
          <li>
            Send it to us on WhatsApp at <strong>+91 9778413792</strong>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Checklast;

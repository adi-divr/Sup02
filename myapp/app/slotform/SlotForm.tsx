"use client";
import './slotform.css';
import type { NextPage } from 'next';
import { FormEvent, useState } from "react";
import logo from '../../public/assets/logo.png';
import Image from 'next/image';




const Slotform: NextPage = () => {
   const [mail, setMail] = useState("");
   const [number, setMobile] = useState("");
   const [name, setName] = useState("");
   const [weighData, setweighData] = useState('');
   const [ageData, setageData] = useState('');
 
   const [showWarning, setShowWarning] = useState(false);
   
   
   const handleChange = (value) => {
    setweighData(value);
    if (value === 'no') {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };



   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const form = { name, mail, number, weighData, ageData };
     console.log(form);

     const response = await fetch('/api/submit', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(form)
     });

     const content = await response.json();
   //  alert(content.data.tableRange);
     setMail("");
     setMobile("");
     setName("");
      setweighData("");
      setageData("");
      
   };

   return (
     <div className="container">
<Image src={logo} alt="Logo" width={100} height={100} />
<p ><strong>TELL US MORE ABOUT YOURSELF</strong></p>


<form onSubmit={handleSubmit}>
         <label htmlFor="name">Name:</label>
         <input
           type="text"
           id="name"
           name="name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           placeholder="Your name.."
           required
         />

         <label htmlFor="mailbox">Email:</label>
         <input
           type="email"
           id="mailbox"
           value={mail}
           onChange={(e) => setMail(e.target.value)}
           placeholder="Your email.."
           required
         />

         <label htmlFor="mobilenum">Mobile Number:</label>
         <input
           type="text"
           id="mobilenum"
           value={number}
           onChange={(e) => setMobile(e.target.value)}
           placeholder="Your Mobile number.."
           required
         />

<p>Do you weigh below 120kg?</p>
<div className="radio-group">
  <label>
    <input
      type="radio"
      name="weighquery"
      value="yes"
      checked={weighData === 'yes'}
      onChange={(e) => handleChange(e.target.value)}
    />
    Yes
  </label>
  <label>
    <input
      type="radio"
      name="weighquery"
      value="no"
      checked={weighData === 'no'}
      onChange={(e) => handleChange(e.target.value)}
    />
    No
  </label>
  
</div>
{showWarning && (
        <p className="warning" style={{ color: 'red', fontSize: '12px' }}>
          Warning: Contact Our Support Team
        </p>
      )}
<p>Are you over 18?</p>
<div className="radio-group">

  <label>
    <input
      type="radio"
      name="agequery"
      value="yes"
      checked={ageData === 'yes'}
      onChange={(e) => setageData(e.target.value)}
    />
    Yes
  </label>
  <label>
    <input
      type="radio"
      name="agequery"
      value="no"
      checked={ageData === 'no'}
      onChange={(e) => setageData(e.target.value)}
    />
    No
  </label>
</div>


         <button type="submit">Submit</button>
       </form>
     </div>
   );
};

export default Slotform;
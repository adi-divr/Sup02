"use client";
import './slotform.css';
import type { NextPage } from 'next';
import { FormEvent, useState, useEffect } from "react";
import logo from '../../public/assets/logo.png';
import Image from 'next/image';
import { useSearchParams } from "next/navigation"; 
import { useRouter } from "next/navigation";


interface FormItem {
  name: string;
  mail: string;
  number: string;
  weighData: string;
  ageData: string;
}


const Slotform: NextPage = () => {
   const [mail, setMail] = useState("");
   const [number, setMobile] = useState("");
   const [name, setName] = useState("");
   const [weighData, setweighData] = useState('');
   const [ageData, setageData] = useState('');
   const [currentFormIndex, setCurrentFormIndex] = useState(0);
   const [formData, setFormData] = useState<FormItem[]>([]);

   const searchParams = useSearchParams(); 
   const router = useRouter();

   const selected = searchParams?.get("selectedDate");
   const slots = Number(searchParams?.get("slots"));

   // Handle form field changes
  //  const handleChange = (value) => {
  //    setweighData(value);
  //    if (value === 'no') { // warning
       
  //    }
  //  };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     
     
     const currentForm = { name, mail, number, weighData, ageData };
     setFormData((prevFormData) => [...prevFormData, currentForm]);  // Add the current form's data to the array

     if (currentFormIndex + 1 < slots) {
       // Go to the next form
       setCurrentFormIndex(currentFormIndex + 1);
     } else {
     
       sessionStorage.setItem('formData', JSON.stringify([...formData, currentForm])); // Ensure all data is saved
       sessionStorage.setItem('slotAndDate', JSON.stringify({ selectedDate: selected, slots })); // Save the selected date and slots
       router.push(`/confirmPage`); // Navigate to the confirmation page
     }

     
     setMail("");
     setMobile("");
     setName("");
     setweighData("");
     setageData("");
   };

   useEffect(() => {
     if (formData.length > 0) {
       sessionStorage.setItem('formData', JSON.stringify(formData));
     }
   }, [formData]); 

   return (
     <div className="container">
       <Image src={logo} alt="Logo" width={100} height={100} />
       <p><strong>TELL US MORE ABOUT YOURSELF</strong></p>

       {/* Render multiple forms dynamically */}
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

         <p>Do you weigh below 100kg?</p>
         <div className="radio-group">
           <label>
             <input
               type="radio"
               name="weighquery"
               value="yes"
               checked={weighData === 'yes'}
               onChange={(e) => setweighData(e.target.value)}
             />
             Yes
           </label>
           <label>
             <input
               type="radio"
               name="weighquery"
               value="no"
               checked={weighData === 'no'}
               onChange={(e) => setweighData(e.target.value)}
             />
             No
           </label>
         </div>

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

        
         {currentFormIndex + 1 < slots ? (
           <button type="submit">Next</button>
         ) : (
           <button type="submit">Submit</button>
         )}
       </form>
     </div>
   );
};

export default Slotform;

"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Contact() {
  const [postcode, setPostcode] = useState('');

  const handleButtonClick = () => {
    if (postcode) {
      const destination = '309 Elland Road, Leeds, Yorkshire LS11 0HW';
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(postcode)}&destination=${encodeURIComponent(destination)}`;
      window.open(url, '_blank');
    } else {
      alert('Please enter a postcode.');
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-y-6 text-white p-4 md:flex md:flex-row md:justify-around">

        <div className="space-y-6 mb-4 md:mb-0">
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Get in Touch</h2>
            <p>We're here to help! Please call us, or use the form below and we will get back to you as soon as possible.</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Our Address</h2>
            <p>309 Elland Road, Leeds, Yorkshire LS11 0HW</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Get Directions</h2>
            <InputWithButton
              postcode={postcode}
              setPostcode={setPostcode}
              handleButtonClick={handleButtonClick}
            />
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Call Us</h2>
            <a href="tel:03300985256" className="hover:underline"><p>(0330) 098 5256</p></a>
          </div>
        </div>

        <div className="w-full md:max-w-md lg:max-w-lg">
          <ContactForm />
        </div>

      </div>
      <Footer />
    </main>
  );
}

function InputWithButton({ postcode, setPostcode, handleButtonClick }) {
  return (
    <div className="flex items-center border border-[#191919] rounded overflow-hidden w-full max-w-xs md:max-w-sm">
      <input
        type="text"
        placeholder="Enter your postcode.."
        className="px-4 py-2 w-full focus:outline-none bg-[#191919]"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />
      <button
        className="bg-black font-light border border-black text-white px-4 py-2"
        onClick={handleButtonClick}
      >
        Go
      </button>
    </div>
  );
}

function ContactForm() {
  return (
    <div>
      <form className="bg-[#20252f99] p-8 rounded shadow-md w-full">
        <h2 className="text-2xl mb-6 text-white">Contact Us</h2>

        <div className="mb-4">
          <label className="block text-white text-sm font-md mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-[#ffffff19] leading-tight focus:outline-none bg-[#ffffff19] focus:shadow-outline"
            id="name"
            type="text"
            placeholder=""
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-[#ffffff19] leading-tight focus:outline-none bg-[#ffffff19] focus:shadow-outline"
            id="email"
            type="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-[#ffffff19] leading-tight focus:outline-none bg-[#ffffff19] focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="07000 123123"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white border-[#ffffff19] leading-tight focus:outline-none bg-[#ffffff19] focus:shadow-outline"
            id="message"
            placeholder=""
            rows="4"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

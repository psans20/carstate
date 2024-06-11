"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="p-4 md:p-6">
      <div className="flex justify-between items-center mx-4">
        <Link href="/"><img src="https://i.ibb.co/6WpPk03/car-state-logo2-01.png" className='w-20 md:w-28 hover:cursor-pointer'/></Link>

        <button 
          className="md:hidden" 
          id="navMobile" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg viewBox="0 0 100 80" width="30" height="30" fill="#ffffff">
            <rect y="0" width="100" height="10"></rect>
            <rect y="35" width="100" height="10"></rect>
            <rect y="70" width="100" height="10"></rect>
          </svg>
        </button>

        <ul className="hidden md:flex text-white gap-x-8">
          <li>
            <a 
              href="/" 
              className={pathname === "/" ? "border-b-[3px] border-solid py-2 border-[#3a87de]" : ""}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/browse" 
              className={pathname === "/browse" ? "border-b-[3px] border-solid py-2 border-[#3a87de]" : ""}
            >
              Browse Vehicles
            </a>
          </li>
    
          <li>
            <a 
              href="/contact" 
              className={pathname === "/contact" ? "border-b-[3px] border-solid py-2 border-[#3a87de]" : ""}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <ul
        className={`md:hidden text-white bg-[#16161b] pl-4 font-md text-lg flex flex-col mt-4 transform transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <li className="py-2">
          <a 
            href="/" 
            className={pathname === "/" ? "font-bold" : ""}
          >
            Home
          </a>
        </li>
        <li className="py-2">
          <a 
            href="/browse" 
            className={pathname === "/browse" ? "font-bold" : ""}
          >
            Browse Vehicles
          </a>
        </li>
      
        <li className="py-2">
          <a 
            href="/contact" 
            className={pathname === "/contact" ? "font-bold" : ""}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

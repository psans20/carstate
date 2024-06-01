"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "./components/Navbar";
import Carad from "./components/carad";
import Footer from "./components/Footer";
import carsData from './data/cars.json';

export default function Home() {
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedModel, setSelectedModel] = useState('All');
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [isModelDisabled, setIsModelDisabled] = useState(true);
  const [filteredCars, setFilteredCars] = useState(carsData.cars);

  useEffect(() => {
    // Extract unique makes from the car data
    const uniqueMakes = [...new Set(carsData.cars.map(car => car.Make))];
    setMakes(uniqueMakes);
  }, []);

  useEffect(() => {
    // Filter models based on the selected make
    if (selectedMake === 'All') {
      setModels([]);
      setIsModelDisabled(true);
      setFilteredCars(carsData.cars);
    } else {
      const filteredModels = carsData.cars
        .filter(car => car.Make === selectedMake)
        .map(car => car.Model);
      setModels([...new Set(filteredModels)]);
      setIsModelDisabled(false);
    }
  }, [selectedMake]);

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
    setSelectedModel('All');
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = carsData.cars.filter(car => {
      const matchMake = selectedMake === 'All' || car.Make === selectedMake;
      const matchModel = selectedModel === 'All' || car.Model === selectedModel;
      return matchMake && matchModel;
    });
    setFilteredCars(filtered);
  };

  return (
    <main>
      <Navbar />
      <div className="pt-24 px-10 flex flex-col gap-y-3">
        <div className="lg:flex md:justify-around">
          <div className="flex flex-col gap-y-3 px-4">
            <h1 className="text-white text-4xl font-bold text-start md:text-6xl">Car State</h1>
            <h2 className="text-white text-xl font-semibold text-start md:text-4xl">Used Cars in Car State</h2>
            <h2 className="text-white text-sm font-md text-start md:text-lg">Your luxury, prestige & performance vehicle specialist.</h2>
            <ul className="list-disc pt-2 px-6">
              <li className="text-white text-md md:text-lg font-md text-start">Over 30 Vehicles in Stock</li>
              <li className="text-white text-md md:text-lg font-md text-start">Luxury & Performance Brands</li>
              <li className="text-white text-md md:text-lg font-md text-start">Friendly & Knowledgeable</li>
              <li className="text-white text-md md:text-lg font-md text-start">12 Months Warranty as Standard</li>
            </ul>
            <Link href="/browse"><button className="bg-[#3a87de] text-white font-semibold w-48 h-12 mt-4 rounded-md">View Our Vehicles</button></Link>
          </div>
          <img src="https://i.ibb.co/GsMc4XC/2-removebg-preview.png" className="mt-12 md:w-[750px] w-full" />
        </div>

        <div className="searchBox flex flex-col md:flex-row md:justify-around md:gap-x-4 items-center md:px-10 lg:px-7 2xl:px-60">
          <div id="search" className="flex flex-col gap-y-2 md:gap-y-0 mt-4 md:mt-0 w-full md:w-1/3">
            <label htmlFor="make" className="text-white text-sm">Make</label>
            <select id="make" className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedMake} onChange={handleMakeChange}>
              <option value="All">All</option>
              {makes.map((make, index) => (
                <option key={index} value={make}>{make}</option>
              ))}
            </select>
          </div>

          <div id="search" className="flex flex-col gap-y-2 md:gap-y-0 mt-4 md:mt-0 w-full md:w-1/3">
            <label htmlFor="model" className="text-white text-sm">Model</label>
            <select id="model" className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedModel} onChange={handleModelChange} disabled={isModelDisabled}>
              <option value="All">All</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <button
            className="bg-[#3a87de] text-white font-semibold w-full h-12 mt-4 md:mt-0 rounded-md md:relative md:top-2.5 md:w-4/6 2xl:w-3/6"
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:px-72 2xl:mr-40 gap-4 lg:gap-1 px-4">
  {filteredCars.slice(0, 3).map((car, index) => (
    <Carad key={index} car={car} index={index} />
  ))}
</div>


      </div>
      <Footer />
    </main>
  );
}

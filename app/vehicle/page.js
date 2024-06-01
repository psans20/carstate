"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IoCalendarNumberOutline, IoCalculatorOutline, IoSpeedometerOutline } from "react-icons/io5";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { PiEngine } from 'react-icons/pi';
import carsData from '../data/cars.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      style={{ display: "block", background: "rgba(0, 0, 0, 0)", right: "10px", zIndex: 1, position: "absolute", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
      onClick={onClick}
    >
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      style={{ display: "block", background: "rgba(0, 0, 0, 0)", left: "10px", zIndex: 1, position: "absolute", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
      onClick={onClick}
    >
    </div>
  );
};

export default function Vehicle() {
  const searchParams = useSearchParams();
  const index = searchParams.get('index');
  const [car, setCar] = useState(null);

  useEffect(() => {
    const carIndex = parseInt(index, 10);
    if (!isNaN(carIndex) && carIndex >= 0 && carIndex < carsData.cars.length) {
      setCar(carsData.cars[carIndex]);
    }
  }, [index]);

  function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!car) {
    return <div>Error: Car not found</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <main>
      <Navbar />
      <div className="flex flex-col justify-around items-center text-white font-semibold gap-y-6 px-4 md:px-72">
        <div id="title" className="flex flex-row justify-between mt-4 w-full">
          <h1 className="w-36 md:text-xl md:w-48">{car.Make} {car.Model}</h1>
          <h1 className='text-lg md:text-2xl'>£{comma(car.Price)}</h1>
        </div>
        <Slider {...settings} className="w-full">
          {car.Images.map((image, idx) => (
            <div key={idx}>
              <img src={image} alt={`${car.Make} ${car.Model}`} className="w-full" />
            </div>
          ))}
        </Slider>
        <button className="bg-[#3a87de] text-white font-semibold w-full md:w-96 h-12 mt-4 rounded-md">Call Us</button>
      </div>

      <div className='grid grid-cols-3 md:flex md:flex-row md:justify-around bg-[#17161c] text-white w-full gap-8 mt-8 py-6'>
        <li className='flex flex-col gap-y-2 items-center'>
          <IoCalendarNumberOutline size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>Year</h2>
            <h2 className='text-md'>{car.Year}</h2>
          </div>
        </li>
        <li className='flex flex-col gap-y-2 items-center'>
          <IoCalculatorOutline size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>Mileage</h2>
            <h2 className='text-md'>{car.Mileage}</h2>
          </div>
        </li>
        <li className='flex flex-col gap-y-2 items-center'>
          <BsFuelPump size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>Fuel Type</h2>
            <h2 className='text-md'>{car.Fuel}</h2>
          </div>
        </li>
        <li className='flex flex-col gap-y-2 items-center'>
          <TbManualGearbox size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>Transmission</h2>
            <h2 className='text-md'>{car.Transmission}</h2>
          </div>
        </li>
        <li className='flex flex-col gap-y-2 items-center'>
          <PiEngine size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>Engine Size</h2>
            <h2 className='text-md'>2.0 Litres</h2>
          </div>
        </li>
        <li className='flex flex-col gap-y-2 items-center'>
          <IoSpeedometerOutline size={30} />
          <div className='flex flex-col items-center'>
            <h2 className='text-xs'>BHP</h2>
            <h2 className='text-md'>200</h2>
          </div>
        </li>
      </div>
      <Footer />
    </main>
  );
}

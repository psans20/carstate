import { IoCalendarNumberOutline, IoCalculatorOutline } from "react-icons/io5";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import Link from 'next/link';

export default function Carad({ car, index }) {
  function k(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
  }

  const handleViewClick = () => {
    localStorage.setItem('selectedCar', JSON.stringify(car));
  };

  return (
    <div className='border border-gray-800 rounded-md max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-12 md:w-72'>
      <img src={car.Images[0]} className='rounded-t-md w-full' alt={`${car.Make} ${car.Model}`} />
      <div className='bg-[#17161c] text-white p-4'>
        <h2 className='text-sm'>{car.Make}</h2>
        <h2>{car.Model}</h2>

        <div className='pt-4'>
          <ul className='grid grid-cols-2 gap-4'>
            <li className='flex gap-x-2 text-sm items-center'>
              <IoCalendarNumberOutline size={30} />{car.Year}
            </li>
            <li className='flex gap-x-2 text-sm items-center'>
              <IoCalculatorOutline size={30} />{`${k(car.Mileage)} Mileage`}
            </li>
            <li className='flex gap-x-2 text-sm items-center'>
              <BsFuelPump size={30} />{`${car.Fuel}`}
            </li>
            <li className='flex gap-x-2 text-sm items-center'>
              <TbManualGearbox size={30} />{car.Transmission}
            </li>
          </ul>

          <div className='flex justify-center mt-4'>
            <Link href="/vehicle">
              <button className="bg-[#3a87de] text-white font-semibold w-48 h-12 mt-4 rounded-md mx-auto" onClick={handleViewClick}>
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

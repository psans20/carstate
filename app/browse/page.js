"use client";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import carsData from '../data/cars.json';
import Carad from "../components/carad";
import Footer from "../components/Footer";

export default function Browse() {
    const [selectedMake, setSelectedMake] = useState('All');
    const [selectedModel, setSelectedModel] = useState('All');
    const [models, setModels] = useState([]);
    const [makes, setMakes] = useState([]);
    const [isModelDisabled, setIsModelDisabled] = useState(true);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filteredCars, setFilteredCars] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(0);
    const [minMileage, setMinMileage] = useState(0);
    const [maxMileage, setMaxMileage] = useState(0);
    const [sortCriteria, setSortCriteria] = useState('0');

    useEffect(() => {
        const uniqueMakes = [...new Set(carsData.cars.map(car => car.Make))];
        setMakes(uniqueMakes);

        const prices = carsData.cars.map(car => car.Price);
        const minPriceRounded = Math.floor(Math.min(...prices) / 1000) * 1000;
        const maxPriceRounded = Math.ceil(Math.max(...prices) / 1000) * 1000;
        setMinPrice(minPriceRounded);
        setMaxPrice(maxPriceRounded);

        const years = carsData.cars.map(car => car.Year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setMinYear(minYear);
        setMaxYear(maxYear);

        const mileages = carsData.cars.map(car => car.Mileage);
        const minMileageRounded = Math.floor(Math.min(...mileages) / 1000) * 1000;
        const maxMileageRounded = Math.ceil(Math.max(...mileages) / 1000) * 1000;
        setMinMileage(minMileageRounded);
        setMaxMileage(maxMileageRounded);

        setFilteredCars(carsData.cars);
    }, []);

    useEffect(() => {
        if (selectedMake === 'All') {
            setModels([]);
            setIsModelDisabled(true);
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

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
        sortCars(event.target.value);
    };

    const sortCars = (criteria) => {
        let sortedCars = [...filteredCars];
        switch (criteria) {
            case 'Mileage':
                sortedCars.sort((a, b) => a.Mileage - b.Mileage);
                break;
            case 'Year':
                sortedCars.sort((a, b) => a.Year - b.Year);
                break;
            case 'Price(Lowest)':
                sortedCars.sort((a, b) => a.Price - b.Price);
                break;
            case 'Price(Highest)':
                sortedCars.sort((a, b) => b.Price - a.Price);
                break;
            default:
                break;
        }
        setFilteredCars(sortedCars);
    };

    const handleSearchButtonClick = () => {
        const filtered = carsData.cars.filter(car => {
            const matchMake = selectedMake === 'All' || car.Make === selectedMake;
            const matchModel = selectedModel === 'All' || car.Model === selectedModel;
            const matchPrice = car.Price >= minPrice && car.Price <= maxPrice;
            const matchYear = car.Year >= minYear && car.Year <= maxYear;
            const matchMileage = car.Mileage >= minMileage && car.Mileage <= maxMileage;
            return matchMake && matchModel && matchPrice && matchYear && matchMileage;
        });
        setFilteredCars(filtered);
        setIsSearchVisible(false);
        sortCars(sortCriteria);
    };

    const carCount = filteredCars.length;

    const generatePriceOptions = () => {
        const options = [];
        for (let i = minPrice; i <= maxPrice; i += 1000) {
            options.push(i);
        }
        return options;
    };

    const generateYearOptions = () => {
        const options = [];
        for (let i = minYear; i <= maxYear; i++) {
            options.push(i);
        }
        return options;
    };

    const generateMileageOptions = () => {
        const options = [];
        for (let i = minMileage; i <= maxMileage; i += 5000) {
            options.push(i);
        }
        return options;
    };

    return (
        <main className="md:px-24">
            <Navbar />
            <div className="flex flex-col items-center p-4">
                {!isSearchVisible && (
                    <button
                        className="bg-[#3a87de] text-white font-semibold h-12 mt-4 rounded-md w-full md:hidden"
                        onClick={() => setIsSearchVisible(true)}
                    >
                        Show Search
                    </button>
                )}

                <div className={`searchBox ${isSearchVisible ? 'flex' : 'hidden'} flex-col md:grid md:grid-cols-3 md:gap-4 md:items-center w-full md:px-2`}>
                    <div id="search" className="flex flex-col gap-y-2 mt-4 md:mt-0 w-full">
                        <label htmlFor="make" className="text-white text-sm">Make</label>
                        <select
                            id="make"
                            className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={selectedMake}
                            onChange={handleMakeChange}
                        >
                            <option value="All">All</option>
                            {makes.map((make, index) => (
                                <option key={index} value={make}>{make}</option>
                            ))}
                        </select>
                    </div>

                    <div id="search" className="flex flex-col gap-y-2 mt-4 md:mt-0 w-full">
                        <label htmlFor="model" className="text-white text-sm">Model</label>
                        <select
                            id="model"
                            className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={selectedModel}
                            onChange={handleModelChange}
                            disabled={isModelDisabled}
                        >
                            <option value="All">All</option>
                            {models.map((model, index) => (
                                <option key={index} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div id="price" className="flex flex-col gap-y-2 mt-4 md:mt-0 w-full">
                        <label htmlFor="price" className="text-white text-sm">Price</label>
                        <div className="flex flex-row gap-x-2 w-full">
                            <div id="search" className="relative w-full">
                                <select
                                    id="min-price"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                >
                                    {generatePriceOptions().map((price, index) => (
                                        <option key={index} value={price}>{`£${price.toLocaleString()}`}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                            <div id="search" className="relative w-full">
                                <select
                                    id="max-price"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                >
                                    {generatePriceOptions().map((price, index) => (
                                        <option key={index} value={price}>{`£${price.toLocaleString()}`}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="year" className="flex flex-col gap-y-2 mt-4 md:mt-0 w-full">
                        <label htmlFor="year" className="text-white text-sm">Year</label>
                        <div className="flex flex-row gap-x-2 w-full">
                            <div id="search" className="relative w-full">
                                <select
                                    id="min-year"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMinYear(Number(e.target.value))}
                                >
                                    {generateYearOptions().map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                            <div id="search" className="relative w-full">
                                <select
                                    id="max-year"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMaxYear(Number(e.target.value))}
                                >
                                    {generateYearOptions().map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="mileage" className="flex flex-col gap-y-2 mt-4 md:mt-0 w-full">
                        <label htmlFor="mileage" className="text-white text-sm">Mileage</label>
                        <div className="flex flex-row gap-x-2 w-full">
                            <div id="search" className="relative w-full">
                                <select
                                    id="min-mileage"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMinMileage(Number(e.target.value))}
                                >
                                    {generateMileageOptions().map((mileage, index) => (
                                        <option key={index} value={mileage}>{`${mileage.toLocaleString()} miles`}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                            <div id="search" className="relative w-full">
                                <select
                                    id="max-mileage"
                                    className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setMaxMileage(Number(e.target.value))}
                                >
                                    {generateMileageOptions().map((mileage, index) => (
                                        <option key={index} value={mileage}>{`${mileage.toLocaleString()} miles`}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        className="bg-[#3a87de] text-white font-semibold w-full h-12 mt-4 md:mt-6 md:row-span-1 md:col-span-1 md:col-start-3 md:row-start-2"
                        onClick={handleSearchButtonClick}
                    >
                        Search Vehicles
                    </button>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center p-4">
                <h2 className="text-white font-light text-sm">{carCount} results</h2>
                <div id="result-select" className="relative w-2/6 md:w-1/6">
                    <select
                        id="result"
                        className="bg-[#ffffff19] border-[#ffffff19] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={sortCriteria}
                        onChange={handleSortChange}
                    >
                        <option value="0">Sort By</option>
                        <option value="Mileage">Mileage</option>
                        <option value="Year">Year</option>
                        <option value="Price(Lowest)">Price (Lowest)</option>
                        <option value="Price(Highest)">Price (Highest)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 2xl:gap-x-12 gap-4 p-4">
                {filteredCars.map((car, index) => (
                    <Carad key={index} car={car} index={index} />
                ))}
            </div>
            <Footer/>
        </main>
    );
}

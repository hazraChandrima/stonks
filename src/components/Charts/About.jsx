"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const About = ({ id }) => {
    const [cryptoData, setCryptoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                const data = await response.json();
                setCryptoData(data);
            } catch (err) {
                console.error("Error fetching crypto data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700">Loading...</p>
            </div>
        );
    }

    if (error || !cryptoData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700">Failed to load data.</p>
            </div>
        );
    }

    const {
        name,
        market_data: {
            current_price,
            total_volume,
            high_24h,
            low_24h,
            price_change_percentage_24h,
            max_supply,
            circulating_supply,
        },
    } = cryptoData;

    return (
        <div className="min-h-screen p-12">

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About {name}</h1>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">What is {name}?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    {name}'s price today is <strong>${current_price.usd.toLocaleString()}</strong>, with a 24-hour trading volume of <strong>${total_volume.usd.toLocaleString()}</strong>. {name} is{" "}
                    <strong>{price_change_percentage_24h > 0 ? "+" : ""}{price_change_percentage_24h.toFixed(2)}%</strong> in the last 24 hours.
                    It has a circulating supply of <strong>{circulating_supply.toLocaleString()}</strong> {name} and a max supply of{" "}
                    {max_supply ? <strong>{max_supply.toLocaleString()}</strong> : "unlimited"}.
                </p>
                <div className="border-b border-gray-400 w-full my-4"></div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lorem ipsum dolor sit amet</h2>
                <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna
                    et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien
                    morbi sodales odio sed rhoncus.
                    <br />
                    Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna
                    et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien
                    morbi sodales odio sed rhoncus.
                    Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna
                    et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien
                    morbi sodales odio sed rhoncus.
                </p>

                <div className="border-b border-gray-400 w-full my-4"></div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Already Holding {name}?</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className=" bg-gradient-to-b from-teal-400 to-cyan-700 p-6 rounded-lg flex items-center shadow-md">
                            <div className="mr-4">
                                <Image
                                    className="h-32 w-32 object-cover rounded-lg"
                                    src="/investing.png"
                                    width={128}
                                    height={128}
                                    alt="investing"
                                />
                            </div>
                            <div className="text-gray-100">
                                <h3 className="text-xl font-semibold ">Calculate your Profits</h3>
                                <button className=" font-medium mt-2 flex items-center">
                                    Check Now →
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-orange-400 to-red-700 p-6 rounded-lg flex items-center shadow-md">
                            <div className="mr-4">
                                <Image
                                    className="h-32 w-32 object-cover rounded-lg"
                                    src="/liability.png"
                                    width={128}
                                    height={128}
                                    alt="liability"
                                />
                            </div>
                            <div className="text-gray-100">
                                <h3 className="text-xl font-semibold">Calculate your Tax Liability</h3>
                                <button className="font-medium mt-2 flex items-center">
                                    Check Now →
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-400 w-full my-4"></div>
                    <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna
                        et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien
                        morbi sodales odio sed rhoncus.</p>
                </div>
            </div>

            
        </div>
    );
};

export default About;

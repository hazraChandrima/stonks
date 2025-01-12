"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const CoinCard = ({ coin }) => {
    const isPriceUp = coin.price_change_percentage_24h >= 0;
    const priceChangeColor = isPriceUp ? 'text-green-500' : 'text-red-500';
    const bgColor = isPriceUp ? 'bg-green-100' : 'bg-red-100';

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col justify-between h-44">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <h3 className="text-sm font-semibold">{coin.name}</h3>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${bgColor} ${priceChangeColor}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </div>
            <div className="text-xl mt-2">${coin.current_price.toFixed(2)}</div>
            <Image
                src={coin.sparkline_url}
                alt={`${coin.name} sparkline`}
                className="mt-2 w-full h-12"
                width={80}
                height={20}
            />
        </div>
    );
};

const YouMayAlsoLike = () => {
    const [coins, setCoins] = useState([]);
    const [reverseCoins, setReverseCoins] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
            const data = await response.json();
            const formattedData = data.coins.map((item) => ({
                name: item.item.name,
                image: item.item.small,
                current_price: item.item.data.price,
                sparkline_url: item.item.data.sparkline,
                price_change_percentage_24h: item.item.data.price_change_percentage_24h.usd,
            }));
            const reverseFormattedData = [...formattedData].reverse();
            setCoins(formattedData);
            setReverseCoins(reverseFormattedData);
        };

        fetchCoins();
    }, []);

    const arr = [
        {
            title: "You May Also Like",
            array: reverseCoins,
            prev: "custom-prev1",
            next: "custom-next1",
        },
        {
            title: "Trending Coins",
            array: coins,
            prev: "custom-prev2",
            next: "custom-next2",
        },
    ];

    return (
        <div className='bg-white rounded-lg mb-4 shadow-sm'>
            {arr.map((item, index) => (
                <div
                    key={index}
                    className="relative px-4 py-6 lg:px-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                    <div className="relative">

                        <button className={`${item.prev} absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 text-gray-500 hover:text-gray-700`}>
                            <ChevronLeftIcon className="w-6 h-6 " />
                        </button>
                        <button className={`${item.next} absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 text-gray-500 hover:text-gray-700`}>
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>

                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1.5}
                            navigation={{
                                prevEl: `.${item.prev}`,
                                nextEl: `.${item.next}`,
                            }}
                            breakpoints={{
                                600: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                            modules={[Navigation]}
                        >
                            {item.array.map((coin, index) => (
                                <SwiperSlide key={index}>
                                    <CoinCard coin={coin} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default YouMayAlsoLike;

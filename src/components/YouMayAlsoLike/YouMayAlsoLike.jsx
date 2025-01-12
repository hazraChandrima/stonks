"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

const CoinCard = ({ coin }) => {
    const isPriceUp = coin.price_change_percentage_24h >= 0;
    const priceChangeColor = isPriceUp ? 'text-green-500' : 'text-red-500';
    const bgColor = isPriceUp ? 'bg-green-100' : 'bg-red-100';

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col justify-between h-fit">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <h3 className="text-sm font-semibold">{coin.name}</h3>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${bgColor} ${priceChangeColor}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </div>
            <div className="text-2xl font-bold mt-2">${coin.current_price.toFixed(2)}</div>
            <Image
                src={coin.sparkline_url}
                alt={`${coin.name} sparkline`}
                className="mt-2 w-full"
                width={128}
                height={80}
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
            const reverseFormattedData = data.coins.reverse().map((item) => ({
                name: item.item.name,
                image: item.item.small,
                current_price: item.item.data.price, 
                sparkline_url: item.item.data.sparkline, 
                price_change_percentage_24h: item.item.data.price_change_percentage_24h.usd, 
            }));
            setCoins(formattedData);
            setReverseCoins(reverseFormattedData);
        };

        fetchCoins();
    }, []);

    return (
        <>
        <div className="px-4 py-8 lg:px-16">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                }}
                modules={[Navigation]}
            >
                {reverseCoins.map((coin, index) => (
                    <SwiperSlide key={index}>
                        <CoinCard coin={coin} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
            <div className="px-4 py-8 lg:px-16">
                <h2 className="text-2xl font-bold mb-4">Trending Coins</h2>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 5 },
                    }}
                    modules={[Navigation]}
                >
                    {coins.map((coin, index) => (
                        <SwiperSlide key={index}>
                            <CoinCard coin={coin} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default YouMayAlsoLike;

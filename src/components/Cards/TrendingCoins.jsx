"use client"
import React, { useEffect, useState } from "react";

function TrendingCoinsCard() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // Fetch trending coins from CoinGecko API
        const fetchTrendingCoins = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/search/trending"
                );
                const data = await response.json();
                // Extract top 3 coins
                const topThreeCoins = data.coins.slice(0, 3);
                setCoins(topThreeCoins);
            } catch (error) {
                console.error("Error fetching trending coins:", error);
            }
        };

        fetchTrendingCoins();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
            <ul>
                {coins.map((coin, index) => (
                    <li
                        key={coin.item.id}
                        className="flex justify-between items-center py-2 border-b last:border-none"
                    >
                        {/* Coin Info */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={coin.item.thumb}
                                alt={coin.item.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium">{`${coin.item.name} (${coin.item.symbol.toUpperCase()})`}</span>
                        </div>
                        {/* Percentage Change */}
                        <span
                            className={`font-semibold ${coin.item.data.price_change_percentage_24h.usd > 0 ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {`${coin.item.data.price_change_percentage_24h.usd > 0 ? "+" : ""}${(
                                coin.item.data.price_change_percentage_24h.usd
                            ).toFixed(2)}%`}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TrendingCoinsCard;

"use client";
import React, { useEffect, useState } from "react";
const dotenv = require("dotenv");
dotenv.config();

function PriceWidget({id}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "https://api.coingecko.com/api/v3/simple/price";
            const params = {
                ids: `${id}`,
                vs_currencies: "inr,usd",
                include_24hr_change: "true",
            };
            const queryString = new URLSearchParams(params).toString();

            try {
                const response = await fetch(`${apiUrl}?${queryString}`, {
                    // mode: "no-cors",
                    headers: {
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const coinData = data[id];
    return (
        <div className="p-4 bg-white">
            <div className="mt-5">
                <span className="text-3xl font-semibold">${coinData.usd}</span>
                <span className="font-medium text-sm ml-4 text-gray-700">
                    <span
                        className={
                            coinData.usd_24h_change > 0
                                ? "text-green-500 bg-green-50 p-2 rounded-md"
                                : "text-red-500 bg-red-50 p-2 rounded-md"
                        }
                    >
                        {coinData.usd_24h_change.toFixed(2)}%
                    </span> (24H)
                </span>
                <p className="text-gray-700 text-md font-semibold">₹{coinData.inr}</p>
                
            </div>
        </div>
    );
}

export default PriceWidget;
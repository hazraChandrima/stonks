"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import PriceWidget from "../Price/Price";

function TradingViewWidget({ id }) {
    const containerRef = useRef();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchidData = async () => {
            const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
            try {
                const response = await fetch(apiUrl);
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

        fetchidData();
    }, [id]);

    const idSymbol = data?.symbol?.toUpperCase();

    useEffect(() => {
        if (containerRef.current && idSymbol) {
            const script = document.createElement("script");
            script.src =
                "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "width": 320,
          "height": 500,
          "symbol": "COINBASE:${idSymbol}USD",
          "timezone": "Asia/Kolkata",
          "theme": "light",
          "style": "2",
          "locale": "en",
          "range": "7D",
          "allow_symbol_change": false,
          "calendar": false,
          "hide_volume": true
        }
      `;
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [idSymbol]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-white p-5 w-full rounded-lg shadow-md">

            <div className="flex items-center gap-4">
                <img
                    src={data?.image?.large || "default-image-url.png"}
                    alt={`${data?.name || "Crypto"} Logo`}
                    className="w-10 h-10"
                />
                <div>
                    <span className="text-lg font-bold">{data?.name || "Crypto"} {data?.symbol?.toUpperCase()}</span>
                    <span className="bg-gray-500 text-gray-100 text-sm p-2 rounded-lg mx-4">
                        Rank #{data?.market_cap_rank || "N/A"}
                    </span>
                </div>
            </div>

            <PriceWidget id={id} />

            <div className="mt-5">
                <div
                    className="tradingview-widget-container w-full max-w-4xl mx-auto"
                    ref={containerRef}
                    style={{ height: "500px" }}
                ></div>
            </div>

        </div>
    );
}

export default memo(TradingViewWidget);

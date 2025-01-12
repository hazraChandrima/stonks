"use client";
import React, { useEffect, useState } from "react";


const DashboardChart = ({ id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [weekHighLow, setWeekHighLow] = useState({ high: null, low: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coinData, marketChartData] = await Promise.all([
                    fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => res.json()),
                    fetch(
                        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
                    ).then((res) => res.json()),
                ]);

                const prices = marketChartData.prices.map(([_, price]) => price);
                const high = Math.max(...prices);
                const low = Math.min(...prices);

                setWeekHighLow({ high, low });
                setData(coinData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <LoadingMessage />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className="py-12 px-4">
            <div className="mx-auto max-w-5xl bg-white shadow-md rounded-xl p-8">
                <div className="flex flex-col gap-8">
                    <PerformanceSection data={data} weekHighLow={weekHighLow} />
                    <FundamentalsSection data={data} />
                </div>
            </div>
        </div>
    );
};

const LoadingMessage = () => (
    <div className="bg-gray-100 flex items-center justify-center h-40">
        <p className="text-gray-700 text-lg">Loading...</p>
    </div>
);

const ErrorMessage = () => (
    <div className="bg-gray-100 flex items-center justify-center h-40">
        <p className="text-gray-700 text-lg">Failed to load data.</p>
    </div>
);

const PerformanceSection = ({ data, weekHighLow }) => {
    const {
        market_data: { current_price, high_24h, low_24h },
    } = data;

    const formatCurrency = (value) => `$${value.toLocaleString()}`;
    const calculateProgress = (current, low, high) => ((current - low) / (high - low)) * 100;

    return (
        <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Performance</h1>
            <ProgressBar
                labelLow="Today's Low"
                valueLow={formatCurrency(low_24h.usd)}
                labelHigh="Today's High"
                valueHigh={formatCurrency(high_24h.usd)}
                progress={calculateProgress(current_price.usd, low_24h.usd, high_24h.usd)}
            />
            <ProgressBar
                labelLow="52W Low"
                valueLow={formatCurrency(weekHighLow.low)}
                labelHigh="52W High"
                valueHigh={formatCurrency(weekHighLow.high)}
                progress={calculateProgress(current_price.usd, weekHighLow.low, weekHighLow.high)}
            />
        </div>
    );
};

const FundamentalsSection = ({ data }) => {
    const {
        market_data: {
            current_price,
            market_cap,
            high_24h,
            low_24h,
            market_cap_rank,
            total_volume,
            market_cap_change_percentage_24h,
            ath,
            ath_date,
            atl,
            atl_date,
        },
    } = data;

    const formatCurrency = (value) => `$${value.toLocaleString()}`;
    const formatPercentage = (value) => `${value.toFixed(2)}%`;
    const formatDate = (date) => new Date(date).toLocaleDateString();

    const fundamentals = [
        { label: "Bitcoin Price", value: formatCurrency(current_price.usd) },
        { label: "Market Cap", value: formatCurrency(market_cap.usd) },
        { label: "24h Low / 24h High", value: `${formatCurrency(low_24h.usd)} / ${formatCurrency(high_24h.usd)}` },
        { label: "Market Cap Dominance", value: formatPercentage(market_cap_change_percentage_24h) },
        { label: "Trading Volume", value: formatCurrency(total_volume.usd) },
        { label: "Market Cap Rank", value: `#${market_cap_rank}` },
        { label: "All-Time High", value: `${formatCurrency(ath.usd)} (${formatDate(ath_date.usd)})` },
        { label: "All-Time Low", value: `${formatCurrency(atl.usd)} (${formatDate(atl_date.usd)})` },
    ];

    return (
        <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-700 mb-6">Fundamentals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                {fundamentals.map((item, index) => (
                    <div key={index} className="mr-8">
                        <div className="flex justify-between" key={index}>
                            <p className="text-gray-500">{item.label}</p>
                            <p className="font-medium">{item.value}</p>
                        </div>
                        <div className="border-b border-gray-400 w-full my-2 md:my-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProgressBar = ({ labelLow, valueLow, labelHigh, valueHigh, progress }) => (
    <div className="flex flex-col space-y-2 mb-4">
        <div className="flex justify-between text-sm">
            <p className="text-gray-500">{labelLow}</p>
            <p className="text-gray-500">{labelHigh}</p>
        </div>
        <div className="relative h-2 bg-gray-300 rounded-full">
            <div
                className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
        <div className="flex justify-between text-sm">
            <p className="text-gray-800">{valueLow}</p>
            <p className="text-gray-800">{valueHigh}</p>
        </div>
    </div>
);

export default DashboardChart;

"use client"
import React, { useState } from "react";
import HeroChart from "@/components/Charts/HeroChart"
import { useParams } from "next/navigation";
import DashboardChart from "@/components/Charts/DashboardChart";
import Sentiments from "@/components/Charts/Sentiments";
import About from "@/components/Charts/About";
import Tokenomics from "@/components/Charts/Tokenomics";
import Teams from "@/components/Charts/Teams";
import KoinXCard from "@/components/Cards/KoinXCard";
import TrendingCoinsCard from "@/components/Cards/TrendingCoins";


const CompanyWisePage = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const router = useParams();
    const { id } = router;

    const renderContent = () => {
        switch (activeTab) {
            case "Overview":
                return <DashboardChart id={id} />
            case "Sentiments":
                return <Sentiments />
            case "News Insights":
                return <About id={id} />;
            case "Teams":
                return <Teams />;
            case "Tokenomics":
                return <Tokenomics />;
            default:
                return <DashboardChart id={id} />;
        }
    };

    console.log(id);
    return (
        <div className="bg-[#EFF2F5]">
            <p className="mt-12 text-gray-600">Cryptocurrencies {" >> "} <span className="text-black font-semibold">{id}</span></p>
            <div className="flex mt-6 space-x-4 justify-center">
                <HeroChart id={id} />
                <div className="flex flex-col space-y-5 justify-between">
                    <KoinXCard />
                    <TrendingCoinsCard />
                </div>
            </div>
            
            <div className="border-b border-gray-700 overflow-x-scroll">
                {["Overview", "Sentiments", "News Insights", "Tokenomics", "Teams"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`mt-10 px-6 py-2 text-sm font-medium ${activeTab === tab
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-800 hover:text-blue-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div>{renderContent()}</div>
        </div>

    );
}

export default CompanyWisePage;
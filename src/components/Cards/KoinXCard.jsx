import React from "react";
import Image from "next/image";

function KoinXCard() {
    return (
        <div className="bg-[#0052FE] h-fit rounded-lg text-white p-6 flex flex-col items-center space-y-6 w-full mx-auto shadow-lg">

            <h1 className="text-xl font-bold text-center">
                Get Started with KoinX <br /> for FREE
            </h1>

            <p className="text-center text-sm text-white/90">
                With our range of features that you can equip for free, KoinX
                allows you to be more educated and aware of your tax reports.
            </p>

            <Image
                src="/get-started.png"
                alt="KoinX illustration"
                width={150}
                height={100}
                priority
            />

            <button className="bg-white text-black px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition flex items-center space-x-2">
                <span>Get Started for FREE</span>
                <span className="text-lg">→</span>
            </button>
        </div>
    );
}

export default KoinXCard;

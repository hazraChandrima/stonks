import React from "react";


const Tokenomics = () => {
    return (
        <div className="font-sans bg-white mt-12 rounded-xl shadow-md p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-5">Tokenomics</h2>
            <h3 className="text-lg font-bold mb-3">Initial Distribution</h3>
            <div className="flex items-center mb-5">
                <div
                    className="relative w-36 h-36 rounded-full mr-5"
                    style={{
                        background: `conic-gradient(
              #007bff 0% 80%,
              #ffcc00 80% 100%
            )`,
                    }}
                ></div>
                <div>
                    <p className="text-md mb-1">
                        <span className="text-blue-500 font-bold">●</span> Crowdsale investors: 80%
                    </p>
                    <p className="text-md">
                        <span className="text-yellow-500 font-bold">●</span> Foundation: 20%
                    </p>
                </div>
            </div>
            <p className="text-md font-semibold text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc
                dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus
                orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa
                habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet
                aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere
                facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu
                ac risus.
            </p>
        </div>
    );
};

export default Tokenomics;

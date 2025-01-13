import React from "react";
import { PieChart, Pie, Cell } from 'recharts';


const Tokenomics = () => {
    const data = [
        { name: 'Crowdsale investors', value: 80 },
        { name: 'Foundation', value: 20 },
    ];

    const colours = ['#0082FF', '#FAA002'];

    return (
        <div className="font-sans bg-white mt-12 rounded-xl shadow-md p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5">Tokenomics</h2>
            <h3 className="text-lg font-semibold mb-3">Initial Distribution</h3>
            <div className="flex items-center mb-5 md:space-x-5">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
                        ))}
                    </Pie>
                </PieChart>
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

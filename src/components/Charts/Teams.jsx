"use client";
import React from "react";
import Image from "next/image";

const Teams = () => {
    const teamMembers = [
        { id: 1, name: "John Smith", designation: "Designation here", image: "/johnsmith.png" },
        { id: 2, name: "Elina Williams", designation: "Designation here", image: "/elina.png" },
        { id: 3, name: "John Smith", designation: "Designation here", image: "/john2.png" },
    ];

    return (
        <div className="max-w-5xl px-8 py-8 bg-white rounded-xl mt-12 shadow-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Team</h2>
            <p className="text-gray-600 mb-8 text-sm">
                Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in
                mi integer sit egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.
            </p>
            <div className="flex flex-col space-y-6">
                {teamMembers.map((member) => (
                    <div
                        className="bg-[#e8f6ff] px-5 py-4 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
                        key={member.id}
                    >

                        <div className="flex-shrink-0">
                            <Image
                                src={member.image}
                                alt={member.name}
                                className="h-24 w-24 rounded-lg object-center"
                                height={96}
                                width={96}
                            />
                            <h3 className="text-md text-center font-semibold">{member.name}</h3>
                            <p className="text-xs text-center text-gray-500">{member.designation}</p>
                        </div>
                            <p className="text-gray-800 text-sm">
                                Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut
                                libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis
                                maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra.
                                Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida
                                ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida
                                praesent interdum.
                                Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut
                                libero hendrerit id.
                            </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;

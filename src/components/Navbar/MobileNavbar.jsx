"use client"
import React, { useState } from 'react';
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link"
import Image from 'next/image';

const MobileNavbar = () => {

    const sections = [
        {
            name: 'Crypto Taxes',
            link: '/#',
        },
        {
            name: 'Free Tools',
            link: '/#',
        },
        {
            name: 'Resource Center',
            link: '/#',
        },
    ]

    const [isOpen, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    }


    return (
        <div
            className="z-40 fixed md:hidden block top-0 left-0 h-20 z-50 w-screen border-b shadow-lg bg-white">
            <div className="h-full flex items-center justify-between text-sm pl-8 pr-4">
                <Image
                    src="/koinx.png"
                    alt="KoinX logo"
                    width={100}
                    height={50}
                    priority
                />

                <span className="mx-3 flex items-center justify-center">
                    <Hamburger toggled={isOpen} size={40} toggle={setOpen} />
                </span>
            </div>


            {isOpen && (
                <div>
                    <div className="bg-gradient-to-b from-blue-600 to-[#0045d6] shadow-lg w-screen max-w-md">
                        <div className="divide-y divide-gray-200">
                            {sections.map((key, index) => (
                                <div key={index}>
                                    <h2 className="text-lg font-medium text-white p-4 hover:bg-gray-100">
                                        <Link
                                            href={`/${key.link}`}
                                            onClick={handleLinkClick}
                                            className="block w-full"
                                        >
                                            {key.name}
                                        </Link>
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};

export default MobileNavbar;
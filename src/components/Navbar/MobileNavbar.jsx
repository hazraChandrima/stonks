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
            className="z-40 fixed md:hidden block top-0 left-0 h-20 z-50 w-screen bborder-b shadow-lg bg-white pl-8 pr-4">
            <div className="h-full flex items-center justify-between text-sm">
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


            {isOpen &&
                <div
                    className="fixed w-screen overflow-y-scroll h-screen top-20 p-5 pt-0 bg-black opacity-100 flex items-center justify-center"
                >
                    <div
                        className="overflow-y-scroll font-sans mb-10 pb-8 text-slate-200 text-center flex flex-col justify-between h-[52%] w-full max-w-3xl">
                        {sections.map((key, index) => (
                            <div key={index}
                                className="mb-6"
                            >

                                <h2 className="text-[2.2rem] font-light text-gray-200 opacity-90 mb-2 hover:text-violet-300">
                                    <Link href={`/${key.link}`} onClick={handleLinkClick}
                                        className="my-5"
                                    >
                                        {key.name}</Link>
                                </h2>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </div>

    );
};

export default MobileNavbar;
"use client"
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="hidden md:block bg-white z-50 fixed top-0 left-0 w-screen h-16 shadow-md border-b border-gray-300">
            <div className="px-12 h-full flex items-center justify-between text-sm">
                <Image
                    src="/koinx.png"
                    alt="KoinX logo"
                    width={100}
                    height={50}
                    priority
                /> 
                <ul className="flex justify-center items-center space-x-8 font-bold">
                    <li>Crypto Taxes</li>
                    <li>Free Tools</li>
                    <li>Resource center</li>
                    <li>
                        <button className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-800 rounded-md">
                            Get Started
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
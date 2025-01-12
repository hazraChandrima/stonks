import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Sentiments = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sentiment</h2>

            <div className="mb-8 relative">
                <div className="flex space-x-4 items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Key Events</h3>
                    <i className="text-gray-400 cursor-pointer" title="Information">ℹ️</i>
                </div>

                <button
                    ref={prevRef}
                    className="absolute z-30 top-1/2 -left-6 transform -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute z-30 top-1/2 -right-6 transform -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                </button>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.update();
                    }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                    }}
                    className="w-full"
                >
                    {Array(4)
                        .fill("")
                        .map((_, index) => (
                            <SwiperSlide key={index} className="w-full">
                                <div className="bg-blue-50 p-4 rounded-xl w-full">
                                    <div className="flex items-start mb-2">
                                        <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-full">
                                            📄
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="font-semibold text-blue-900 mb-1">
                                                Lorem ipsum dolor sit amet consectetur. Dui vel quis
                                                dignissim mattis enim tincidunt.
                                            </h4>
                                            <p className="text-gray-700 text-sm">
                                                Lorem ipsum dolor sit amet consectetur. Ac phasellus
                                                risus est faucibus metus quis. Amet sapien quam viverra
                                                adipiscing condimentum.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Analyst Estimates</h3>
                    <i className="text-gray-400 cursor-pointer" title="Information">ℹ️</i>
                </div>
                <div className="flex items-center gap-8">

                    <div className="relative w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
                        <span className="text-green-600 text-xl font-bold">76%</span>
                    </div>

                    <div className="w-3/4">
                        <div className="flex justify-between text-sm mb-2">
                            <p className="text-green-600">Buy</p>
                            <p className="text-green-600">76%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full mb-4">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "76%" }} />
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <p className="text-gray-600">Hold</p>
                            <p className="text-gray-600">8%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full mb-4">
                            <div className="h-full bg-gray-400 rounded-full" style={{ width: "8%" }} />
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <p className="text-red-600">Sell</p>
                            <p className="text-red-600">16%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "16%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sentiments;

// this page is used as Sankalpa V1 Page
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

export default function ProductPage() {
    return (
        <>
            <Helmet>
                <title>Sankalpa v1 - RAD KRING AVIATION</title>
                <meta name="description" content="Explore the Sankalpa v1, our flagship eVTOL. Discover its features, design, and cutting-edge technology." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-background-grid flex items-center justify-center px-4 py-12"
            >
                <div className="max-w-6xl w-full bg-jet-black/80 rounded-3xl shadow-2xl p-10 backdrop-blur-2xl border border-gray-800">
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                        <img src="/images/evtol-mock-hero.png" alt="Sankalpa v1 Hero" className="w-full md:w-1/2 rounded-2xl shadow-2xl border border-gray-700 object-cover" />
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-glacier-white mb-4 tracking-tight drop-shadow-lg">Sankalpa v1</h1>
                            <h2 className="text-2xl font-semibold text-electric-orange mb-6">Flagship eVTOL Vehicle</h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                                Sankalpa v1 redefines urban air mobility. Engineered for performance, safety, and sustainability, it combines advanced aerodynamics, next-gen battery technology, and a luxurious cabin experience. Glide above the city in style and comfort, powered by innovation.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-bold text-electric-orange mb-2">Key Specifications</h3>
                                    <ul className="text-gray-200 text-base list-disc pl-5">
                                        <li>Speed: 300 km/h</li>
                                        <li>Range: 500 km</li>
                                        <li>Number of Passengers: 4</li>
                                        <li>Noise Level: 65 dB</li>
                                        <li>MTOW: 2,100 kg</li>
                                        <li>Carbon Emission: 0 %</li>
                                        <li>Fully Electric: 100 %</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-bold text-electric-orange mb-2">Use Cases</h3>
                                    <ul className="text-gray-200 text-base list-disc pl-5">
                                        <li>Urban Air Taxi</li>
                                        <li>Corporate & VIP Transport</li>
                                        <li>Medical Emergency Response</li>
                                        <li>Tourism & Sightseeing</li>
                                        <li>Regional Commuter</li>
                                        <li>Special Events & Charters</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-bold text-electric-orange mb-2">Cabin & Comfort</h3>
                                    <ul className="text-gray-200 text-base list-disc pl-5">
                                        <li>Spacious cabin for 4 passengers</li>
                                        <li>Panoramic glass roof</li>
                                        <li>Active noise cancellation</li>
                                        <li>Climate control & ambient lighting</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-lg">
                                    <h3 className="text-xl font-bold text-electric-orange mb-2">Safety & Tech</h3>
                                    <ul className="text-gray-200 text-base list-disc pl-5">
                                        <li>Autonomous flight systems</li>
                                        <li>Redundant flight controls</li>
                                        <li>360° obstacle detection</li>
                                        <li>Emergency ballistic parachute</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center mt-8">
                        <img src="/images/evtol-mock-1.png" alt="Sankalpa v1 Mock 1" className="w-full rounded-xl shadow-xl border border-gray-700 object-cover" />
                        <img src="/images/evtol-mock-2.png" alt="Sankalpa v1 Mock 2" className="w-full rounded-xl shadow-xl border border-gray-700 object-cover" />
                        <img src="/images/evtol-mock-3.png" alt="Sankalpa v1 Mock 3" className="w-full rounded-xl shadow-xl border border-gray-700 object-cover" />
                    </div>
                    <div className="mt-12 text-gray-300 text-lg leading-relaxed">
                        <h2 className="text-2xl font-bold text-glacier-white mb-4">Why Sankalpa v1?</h2>
                        <p>
                            Sankalpa v1 is more than a vehicle—it's a leap into the future of flight. Every detail is crafted for reliability, luxury, and environmental responsibility. Whether for city commutes or regional hops, Sankalpa v1 delivers a seamless, exhilarating journey above the ordinary.
                        </p>
                        <ul className="list-disc pl-6 mt-4">
                            <li>Zero emissions, zero compromise</li>
                            <li>Advanced safety and autonomous features</li>
                            <li>Premium comfort for every passenger</li>
                            <li>Designed and built in India for the world</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About Us - RAD KRING AVIATION</title>
                <meta name="description" content="Learn about RAD KRING AVIATION – the team shaping the future of immersive aerospace experiences." />
            </Helmet>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen w-full px-6 md:px-16 py-20 text-white"
            >
                {/* Intro */}
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                        Made in India. Built for the World.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                        RAD KRING AVIATION is a deep-tech startup engineering the future of aviation with Mixed Reality, intelligent design, and purpose-built experiences.
                    </p>
                </div>

                {/* Sections */}
                <div className="mt-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="font-orbitron text-2xl md:text-3xl text-orange-500 mb-4">Our Philosophy</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            We believe aviation isn't just about travel—it's about human experience. At RAD KRING, we blend advanced engineering with immersive technology to bring powerful, emotional, and intuitive flight experiences to life.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-orbitron text-2xl md:text-3xl text-orange-500 mb-4">Innovation in Every Pixel</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            Our proprietary MR flight interfaces, immersive cockpit environments, and real-time simulation systems are designed to push the boundaries of how humans interact with aircraft—from learning to piloting to exploration.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-orbitron text-2xl md:text-3xl text-orange-500 mb-4">Built by Visionaries</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            We are a crew of engineers, designers, and dreamers — united by the ambition to reimagine the future of aerospace. Every system we build is born out of collaboration, curiosity, and conviction.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-orbitron text-2xl md:text-3xl text-orange-500 mb-4">Global Outlook</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            While proudly rooted in India, our technology is built for global impact. From simulation training to next-gen passenger experiences, RAD KRING is charting a path that transcends borders.
                        </p>
                    </div>
                </div>

                {/* Founders Section */}
                <div className="mt-32 max-w-6xl mx-auto text-center px-4">
                    <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
                        Meet the Founders
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                        Behind RAD KRING AVIATION is a duo of relentless innovators with a shared vision: to engineer the most immersive and intelligent aviation experiences of tomorrow. Their leadership drives our mission to blend aerospace with emerging tech.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Founder 1 */}
                        <div className="bg-orange-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="src/images/chaitanya.jpg"
                                alt="Chaitanya Mehta"
                                className="w-full rounded-2xl object-cover h-[400px]"
                            />
                            <div className="mt-4 px-2 text-center">
                                <h3 className="text-black text-xl font-semibold font-orbitron">CHAITANYA MEHTA</h3>
                                <p className="text-black text-sm font-semibold mt-1">Founder & CTO</p>
                                <div className="mt-2">
                                    <a
                                        href="https://www.linkedin.com/in/chaitanya-mehta-0019b02b2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-black hover:text-blue-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 
                                            1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 
                                            12.248V6.169H2.542v7.225h2.401zm-1.2-8.21c.837 
                                            0 1.358-.554 1.358-1.248-.015-.71-.521-1.248-1.342-1.248-.821 
                                            0-1.358.538-1.358 1.248 0 .694.521 1.248 
                                            1.327 1.248h.015zm4.908 8.21h2.4v-4.016c0-.214.016-.428.079-.58.173-.428.568-.872 
                                            1.232-.872.869 0 1.217.658 1.217 1.623v3.845h2.4V9.4c0-2.025-1.082-2.964-2.526-2.964-1.165 
                                            0-1.688.645-1.977 1.096h.016v-0.939h-2.4c.031.606 
                                            0 7.225 0 7.225z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="bg-orange-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src='src/images/harsh.jpg'
                                alt="Harsh Mehta"
                                className="w-full rounded-2xl object-cover h-[400px]"
                            />
                            <div className="mt-4 px-2 text-center">
                                <h3 className="text-black text-xl font-semibold font-orbitron">HARSH MEHTA</h3>
                                <p className="text-black text-sm font-semibold mt-1">Co-Founder & CEO</p>
                                <div className="mt-2">
                                    <a
                                        href="https://www.linkedin.com/in/harsh--mehta"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-black hover:text-blue-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 
                                            1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 
                                            12.248V6.169H2.542v7.225h2.401zm-1.2-8.21c.837 
                                            0 1.358-.554 1.358-1.248-.015-.71-.521-1.248-1.342-1.248-.821 
                                            0-1.358.538-1.358 1.248 0 .694.521 1.248 
                                            1.327 1.248h.015zm4.908 8.21h2.4v-4.016c0-.214.016-.428.079-.58.173-.428.568-.872 
                                            1.232-.872.869 0 1.217.658 1.217 1.623v3.845h2.4V9.4c0-2.025-1.082-2.964-2.526-2.964-1.165 
                                            0-1.688.645-1.977 1.096h.016v-0.939h-2.4c.031.606 
                                            0 7.225 0 7.225z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <h3 className="font-orbitron text-2xl md:text-3xl text-white mb-4">
                        Ready to Revolutionize Aerospace?
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                        We’re building something extraordinary — and we’re just getting started.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block font-semibold text-white bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition duration-200"
                    >
                        Contact Us
                    </a>
                </div>
            </motion.section>
        </>
    );
}

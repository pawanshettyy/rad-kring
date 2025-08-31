import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PreOrderPage() {
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>Pre-Order Sankalpa v1 - RAD KRING AVIATION</title>
                <meta name="description" content="Pre-order the Sankalpa v1 eVTOL and be part of the future of urban air mobility. See requirements and experience the vehicle before you buy!" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-background-grid flex items-center justify-center px-4 py-12"
            >
                <div className="max-w-2xl w-full bg-jet-black/80 rounded-3xl shadow-2xl p-8 backdrop-blur-2xl border border-gray-800 text-center">
                    <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-glacier-white mb-4">Pre-Order Sankalpa v1</h1>
                    <p className="text-lg text-gray-300 mb-6">Secure your spot to own the future of flight. Pre-order the Sankalpa v1 eVTOL and join the revolution in urban air mobility.</p>
                    <div className="bg-white/10 rounded-xl p-6 mb-8 border border-gray-700 text-left">
                        <h2 className="text-xl font-bold text-electric-orange mb-2">Pre-Order Requirements</h2>
                        <ul className="list-disc pl-6 text-gray-200 text-base">
                            <li>Minimum age: 21 years</li>
                            <li>Valid government-issued ID</li>
                            <li>Proof of funds for down payment</li>
                            <li>Agreement to terms and conditions</li>
                            <li>Completion of basic flight safety orientation</li>
                            <li>Willingness to participate in pilot program</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <p className="text-lg text-gray-300">Want to know more about Sankalpa v1 before you pre-order?</p>
                        <button
                            className="mt-4 px-6 py-3 bg-electric-orange text-white font-bold rounded-md shadow-lg hover:bg-orange-600 transition-colors text-lg"
                            onClick={() => navigate('/mr-experience')}
                        >
                            Opt for MR Experience
                        </button>
                        <p className="mt-4 text-gray-400 text-sm">We recommend experiencing the vehicle in Mixed Reality before making your decision.</p>
                    </div>
                    <button
                        className="w-full py-3 px-6 bg-neon-blue text-white font-bold rounded-md shadow-lg hover:bg-blue-700 transition-colors text-lg"
                        onClick={() => navigate('/contact')}
                    >
                        Contact Us for Pre-Order
                    </button>
                </div>
            </motion.div>
        </>
    );
}
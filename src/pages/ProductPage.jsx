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
                className="container mx-auto px-4 py-16 text-center"
            >
                <h1 className="font-orbitron text-4xl md:text-6xl font-bold">Sankalpa v1</h1>
                <p className="mt-4 text-xl text-gray-400">This page is under construction. Check back soon for more details!</p>
            </motion.div>
        </>
    );
}
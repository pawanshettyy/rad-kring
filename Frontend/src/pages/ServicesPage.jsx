import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

export default function ServicesPage() {
    return (
        <>
            <Helmet>
                <title>Our Services - RAD KRING AVIATION</title>
                <meta name="description" content="From air taxis to medical transport, explore the range of services offered by RAD KRING AVIATION." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 py-16 text-center"
            >
                <h1 className="font-orbitron text-4xl md:text-6xl font-bold">Our Services</h1>
                <p className="mt-4 text-xl text-gray-400">This page is under construction. Check back soon for more details!</p>
            </motion.div>
        </>
    );
}
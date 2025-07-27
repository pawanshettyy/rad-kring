import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>404 Not Found - RAD KRING AVIATION</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
            >
                <h1 className="font-orbitron text-8xl md:text-9xl font-extrabold text-electric-orange">404</h1>
                <h2 className="mt-4 font-montserrat text-2xl md:text-4xl font-bold text-glacier-white">Page Not Found</h2>
                <p className="mt-4 max-w-md text-gray-400">
                    Oops! The page you're looking for seems to have taken a flight to an unknown destination.
                </p>
                <Button asChild className="mt-8 gradient-orange glow-orange font-bold">
                    <Link to="/">Return to Home Base</Link>
                </Button>
            </motion.div>
        </>
    );
}
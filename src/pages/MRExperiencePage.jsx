import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import MRExperienceScreen from '@/components/MRExperienceScreen'; // Re-using the mobile component for now

export default function MRExperiencePage() {
    // This is a dummy navigator function. In a real scenario, this would be handled by react-router.
    const mockNavigate = (path) => {
        console.log(`Navigating to ${path}`);
    };
    return (
        <>
            <Helmet>
                <title>Mixed Reality Experience - RAD KRING AVIATION</title>
                <meta name="description" content="Book your immersive Mixed Reality flight experience and feel the future of aviation today." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 py-8"
            >
                {/* We can reuse the detailed component created for mobile view for now */}
                {/* It will need styling adjustments to fit a full page layout later */}
                <div className="max-w-4xl mx-auto">
                     <MRExperienceScreen onNavigate={mockNavigate} />
                </div>
            </motion.div>
        </>
    );
}
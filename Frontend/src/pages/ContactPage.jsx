import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, Clock, MapPin, CheckCircle, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        preferredTime: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.name || !formData.email || !formData.contactNo || !formData.preferredTime) {
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            contactNo: '',
            preferredTime: '',
            message: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    };

    const timeOptions = [
        { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
        { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
        { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
        { value: 'anytime', label: 'Anytime' }
    ];

    return (
        <div className="min-h-screen  text-white">
            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-6 py-16"
            >
                {/* Hero Section */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ready to take flight with RAD KRING AVIATION? Get in touch with our team for inquiries, partnerships, or support.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-white">Get In Touch</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Phone</h3>
                                        <p className="text-gray-400">+91 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Email</h3>
                                        <p className="text-gray-400">contact@radkringaviation.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                                        <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Location</h3>
                                        <p className="text-gray-400">Aviation Hub, India</p>
                                        <p className="text-gray-400">Made in India, Built for the World.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
                            <h2 className="text-3xl font-bold mb-8 text-white">Send us a Message</h2>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contactNo" className="block text-sm font-medium text-gray-300 mb-2">
                                            Contact Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="contactNo"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-2">
                                            Preferred Contact Time *
                                        </label>
                                        <select
                                            id="preferredTime"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white transition-all duration-300"
                                        >
                                            <option value="" className="bg-black">Select preferred time</option>
                                            {timeOptions.map(option => (
                                                <option key={option.value} value={option.value} className="bg-black">
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message (Optional)
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>

                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-8 right-8 bg-orange-600 text-white p-6 rounded-lg shadow-2xl border border-black z-50 max-w-sm"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 p-2 rounded-full">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Message Sent!</h3>
                                <p className="text-green-100 text-sm">
                                    We got your details and will contact you shortly.
                                </p>
                            </div>
                        </div>
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-white rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
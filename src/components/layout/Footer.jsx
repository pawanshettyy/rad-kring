import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function Footer() {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Subscribed! 🚀",
            description: "Thanks for joining our newsletter. Look out for future updates!",
        });
        e.target.reset();
    };

    return (
        <footer className="bg-jet-black/80 border-t border-white/10 mt-20 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand and Socials */}
                    <div className="space-y-4">
                         <Link to="/" className="text-3xl font-orbitron font-black text-glacier-white">
                            RAD <span className="text-electric-orange">KRING</span>
                        </Link>
                        <p className="text-gray-400 text-sm">Made in India, Built for the World.</p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://www.linkedin.com/company/rad-kring" 
                                className="text-gray-400 hover:text-electric-orange transition-colors" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <Linkedin />
                            </a>
                            {/* <a href="#" className="text-gray-400 hover:text-electric-orange transition-colors"><Instagram /></a>
                            <a href="#" className="text-gray-400 hover:text-electric-orange transition-colors"><Youtube /></a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="font-orbitron font-bold text-glacier-white tracking-wider uppercase">Quick Links</p>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/product" className="text-gray-400 hover:text-electric-orange transition-colors">Sankalpa v1</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-electric-orange transition-colors">Services</Link></li>
                            <li><Link to="/booking" className="text-gray-400 hover:text-electric-orange transition-colors">Book a Flight</Link></li>
                            <li><Link to="/mr-experience" className="text-gray-400 hover:text-electric-orange transition-colors">MR Experience</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="font-orbitron font-bold text-glacier-white tracking-wider uppercase">Company</p>
                        <ul className="mt-4 space-y-3">
                            <li><Link to="/team" className="text-gray-400 hover:text-electric-orange transition-colors">About Us</Link></li>
                            <li><Link to="/news" className="text-gray-400 hover:text-electric-orange transition-colors">News & Media</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-electric-orange transition-colors">Contact</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-electric-orange transition-colors cursor-pointer">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p className="font-orbitron font-bold text-glacier-white tracking-wider uppercase">Join the Revolution</p>
                        <form className="mt-4 space-y-2" onSubmit={handleNewsletterSubmit}>
                            <div className="relative">
                                <input type="email" placeholder="your.email@example.com" required className="w-full bg-gray-900/50 border border-white/20 rounded-md py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange transition-all"/>
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-electric-orange transition-colors">
                                    <Send className="w-5 h-5"/>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Get the latest on our launches and offers.</p>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} RAD KRING AVIATION Pvt. Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
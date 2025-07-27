import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Users, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  const features = [
    { icon: Cpu, title: "Level 5 Autonomy", description: "Advanced AI for the safest, most reliable flights." },
    { icon: Users, title: "6 Passenger Capacity", description: "Spacious interiors for a comfortable journey." },
    { icon: Zap, title: "Electric Propulsion", description: "20 silent EDFs for a zero-emission experience." },
    { icon: Shield, title: "Ballistic Parachute", description: "Ultimate safety with a whole-aircraft parachute system." },
  ];

  return (
    <>
      <Helmet>
        <title>RAD KRING AVIATION - Revolutionizing Urban Mobility</title>
        <meta name="description" content="Welcome to RAD KRING AVIATION. We are revolutionizing urban mobility with affordable, sustainable, and accessible eVTOL aircraft." />
      </Helmet>
      <div className="overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center text-center text-white"
        >
          <div className="absolute inset-0 bg-black overflow-hidden">
            <img 
              alt="Futuristic eVTOL flying over a smart city skyline at dusk"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
             src="https://images.unsplash.com/photo-1635749045239-abe854bcec47" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet-black via-jet-black/70 to-transparent"></div>
          </div>
          <div className="relative z-10 p-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-orbitron text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-wider"
            >
              Fly Above <span className="text-electric-orange">Traffic</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 max-w-3xl mx-auto font-roboto text-lg md:text-xl text-gray-300"
            >
              Revolutionizing Urban Mobility—Affordable, Sustainable, Accessible.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="font-montserrat font-bold gradient-orange glow-orange text-white w-full sm:w-auto">
                <Link to="/booking">Book Your Flight <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-montserrat font-bold border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue glow-blue w-full sm:w-auto">
                <Link to="/product">Explore the eVTOL</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20 bg-jet-black/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-orbitron text-3xl md:text-5xl font-bold">The Future of Flight is Here</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-400">Discover the innovative technology behind the Sankalpa v1.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-8 rounded-2xl text-center transform hover:-translate-y-2"
                >
                  <div className="inline-block p-4 bg-electric-orange/10 rounded-full mb-4 ring-2 ring-electric-orange/20">
                    <feature.icon className="h-8 w-8 text-electric-orange" />
                  </div>
                  <h3 className="font-orbitron text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MR Experience CTA */}
        <section className="relative py-24 my-20">
            <div className="absolute inset-0 bg-black overflow-hidden">
                <img  
                    alt="Person wearing a VR headset experiencing a flight simulation"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                 src="https://images.unsplash.com/photo-1552871419-81ba9b1aa9c9" />
                <div className="absolute inset-0 bg-gradient-to-r from-jet-black via-transparent to-jet-black"></div>
            </div>
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="font-orbitron text-3xl md:text-5xl font-bold">Experience the Flight Before You Fly</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-300">Our Mixed Reality centers let you experience the thrill of eVTOL flight in a stunningly realistic simulation.</p>
                <Button asChild size="lg" className="mt-8 font-montserrat font-bold text-black bg-neon-blue hover:bg-neon-blue/80 glow-blue">
                    <Link to="/mr-experience">Book Your MR Session <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </section>

      </div>
    </>
  );
}
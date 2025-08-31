import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

export default function CareersPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle the form submission (e.g., send to backend)
  };

  return (
    <>
      <Helmet>
        <title>Careers at RAD KRING AVIATION</title>
        <meta name="description" content="Join the RAD KRING team! Apply for open positions and help shape the future of urban air mobility." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background-grid flex items-center justify-center px-4 py-12"
      >
        <div className="max-w-2xl w-full bg-jet-black/80 rounded-3xl shadow-2xl p-8 backdrop-blur-2xl border border-gray-800">
          <h1 className="text-4xl font-extrabold text-glacier-white mb-4 text-center tracking-tight">Careers at RAD KRING</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">We're looking for passionate innovators to join our mission. Apply below to be part of the future of aviation!</p>
          {submitted ? (
            <div className="text-center text-electric-orange text-xl font-bold py-8">Thank you for applying! We'll be in touch soon.</div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Position Applied For</label>
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  placeholder="e.g. Software Engineer, Pilot, Designer"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Resume (PDF)</label>
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-electric-orange"
                  placeholder="Tell us why you want to join RAD KRING..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-electric-orange text-white font-bold rounded-md shadow-lg hover:bg-orange-600 transition-colors text-lg"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </>
  );
}

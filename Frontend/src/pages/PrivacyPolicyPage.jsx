import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Mail, MapPin, Eye, Lock, Users, FileText, Clock, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      icon: <Eye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We collect the following categories of personal information when you use our platform:
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-orange-400 mb-3">a. Information You Provide:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Full name</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Email address</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Phone number</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Location (for pickup/drop-off or MR experience center booking)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Payment and billing details (processed via secure gateways)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Feedback, queries, and support requests</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-400 mb-3">b. Automatically Collected Data:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>IP address</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Device type and browser info</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Cookies and tracking data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Usage behavior (clicks, scrolls, booking attempts)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Information",
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 mb-4">We use your data to:</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Process eVTOL or MR bookings</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Communicate booking confirmations and updates</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Improve website and app functionality</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Send marketing updates, newsletters (only with your consent)</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Monitor usage to ensure security and platform integrity</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Comply with legal and regulatory requirements</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "sharing-data",
      title: "3. Sharing of Data",
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 mb-4">
            We do not sell your data to third parties. Your information may be shared with:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Payment processors (e.g., Razorpay, Stripe)</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Authorized service providers (e.g., Vighnesh Inc. for MR Experience integration)</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Government or legal entities upon lawful request</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Internal team members under strict confidentiality policies</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "data-security",
      title: "4. Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: (
        <p className="text-gray-300">
          We follow industry-standard security measures (SSL encryption, firewalls, role-based access controls) 
          to safeguard your data from unauthorized access, disclosure, or misuse.
        </p>
      )
    },
    {
      id: "cookies",
      title: "5. Cookies",
      icon: <AlertCircle className="w-6 h-6" />,
      content: (
        <p className="text-gray-300">
          We use cookies for functionality and analytics purposes. You can control cookie settings via your browser. 
          Continued use of the website implies consent to cookie usage.
        </p>
      )
    },
    {
      id: "your-rights",
      title: "6. Your Rights",
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 mb-4">As a user, you have the right to:</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Access your data</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Request corrections or deletion</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Withdraw consent for marketing communication</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Request export of your stored data</span>
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            To exercise your rights, contact us at{' '}
            <a href="mailto:privacy@radkring.com" className="text-orange-400 hover:text-orange-300 transition-colors">
              privacy@radkring.com
            </a>
          </p>
        </div>
      )
    },
    {
      id: "third-party-links",
      title: "7. Third-Party Links",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <p className="text-gray-300">
          Our website may include links to third-party platforms (e.g., Google Maps, MR experience partners). 
          We are not responsible for the privacy practices of those websites.
        </p>
      )
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      icon: <Clock className="w-6 h-6" />,
      content: (
        <p className="text-gray-300">
          We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, 
          unless a longer retention period is required by law.
        </p>
      )
    },
    {
      id: "policy-updates",
      title: "9. Updates to This Policy",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <p className="text-gray-300">
          We may update this Privacy Policy to reflect operational, legal, or regulatory changes. 
          We will notify users of any material updates via email or our platform.
        </p>
      )
    },
    {
      id: "contact-us",
      title: "10. Contact Us",
      icon: <Mail className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 mb-4">For questions or concerns, reach out to:</p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-orange-400" />
              <a href="mailto:privacy@radkring.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                privacy@radkring.com
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>RAD KRING AVIATION Pvt. Ltd., Mumbai, India</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - RAD KRING AVIATION</title>
        <meta name="description" content="Learn how RAD KRING AVIATION protects your privacy and handles your personal data. Our commitment to data security and transparency." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-orange-400 mr-4" />
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold">
              <span className="text-white">Privacy</span>
              <span className="text-orange-400"> Policy</span>
            </h1>
          </div>
          <div className="space-y-2 text-gray-400 mb-8">
            {/* <p><strong>Effective Date:</strong> [26/07/2025]</p> */}
            <p><strong>Last Updated:</strong> [26/07/2025]</p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            RAD KRING AVIATION Pvt. Ltd. ("we," "us," or "our") is committed to protecting your privacy 
            and ensuring that your personal data is handled responsibly. This Privacy Policy outlines how we 
            collect, use, store, and protect your data when you visit our website, use our applications, 
            or interact with our services.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center w-12 h-12 bg-orange-400/10 rounded-lg mr-4"
                  >
                    <div className="text-orange-400">
                      {section.icon}
                    </div>
                  </motion.div>
                  <h2 className="font-orbitron text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="text-gray-300 leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
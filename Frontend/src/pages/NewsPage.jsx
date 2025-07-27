import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, RefreshCw, Zap, Plane } from 'lucide-react';

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    // Aviation and Autonomous Vehicle news data matching your brand theme
    const fetchNews = async () => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const simulatedNews = [
            {
                id: 1,
                title: "Revolutionary eVTOL Aircraft Completes First Autonomous Urban Flight",
                summary: "Next-generation electric vertical takeoff and landing aircraft successfully demonstrates fully autonomous navigation through complex urban airspace, marking a breakthrough in urban air mobility.",
                source: "Aviation Week",
                publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                url: "https://aviationweek.com/evtol-autonomous-flight",
                category: "eVTOL",
                image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=250&fit=crop&auto=format",
                featured: true,
                fullContent: "A breakthrough in urban air mobility has been achieved as the latest eVTOL aircraft successfully completed its first fully autonomous flight through complex urban airspace. The aircraft, equipped with advanced AI navigation systems, managed to navigate between buildings, avoid obstacles, and land safely at its designated location without any human intervention. This milestone represents years of development in autonomous flight technology and brings us closer to the reality of air taxis operating in major cities worldwide."
            },
            {
                id: 2,
                title: "AI-Powered Flight Management Systems Show 30% Efficiency Increase",
                summary: "Advanced artificial intelligence integration in modern aircraft systems demonstrates significant improvements in fuel efficiency and route optimization across commercial aviation.",
                source: "FlightGlobal",
                publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                url: "https://flightglobal.com/ai-flight-management-efficiency",
                category: "AI Aviation",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&auto=format",
                fullContent: "Major airlines are reporting unprecedented efficiency gains following the implementation of AI-powered flight management systems. These systems analyze real-time weather data, air traffic patterns, and fuel consumption metrics to optimize flight paths and reduce operational costs. The technology has shown a 30% improvement in fuel efficiency and significant reductions in flight delays across participating airlines."
            },
            {
                id: 3,
                title: "Autonomous Drone Delivery Network Expands to 50 New Cities",
                summary: "Major logistics company announces massive expansion of autonomous drone delivery infrastructure, bringing same-day delivery capabilities to millions of new customers.",
                source: "TechCrunch",
                publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                url: "https://techcrunch.com/drone-delivery-expansion",
                category: "Drone Tech",
                image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=400&h=250&fit=crop&auto=format",
                fullContent: "The autonomous drone delivery revolution continues to expand as a leading logistics company announces service to 50 additional cities. The network now covers over 200 metropolitan areas, offering same-day delivery for packages up to 5 pounds. Advanced collision avoidance systems and AI-powered route optimization ensure safe and efficient deliveries even in complex urban environments."
            },
            {
                id: 4,
                title: "Electric Aircraft Battery Technology Achieves 400-Mile Range Milestone",
                summary: "Breakthrough in lithium-ion battery density enables electric aircraft to achieve unprecedented range capabilities, accelerating the transition to sustainable aviation.",
                source: "IEEE Spectrum",
                publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                url: "https://spectrum.ieee.org/electric-aircraft-battery-breakthrough",
                category: "Electric Aviation",
                image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=400&h=250&fit=crop&auto=format",
                fullContent: "A major breakthrough in battery technology has enabled electric aircraft to achieve a 400-mile range on a single charge, marking a significant milestone in sustainable aviation. The new lithium-ion batteries feature improved energy density and faster charging capabilities, making electric aircraft viable for regional flights. This development could revolutionize short-haul aviation and significantly reduce carbon emissions in the industry."
            },
            {
                id: 5,
                title: "Next-Gen Air Traffic Control Uses Machine Learning for Collision Avoidance",
                summary: "Revolutionary air traffic management system employs advanced machine learning algorithms to predict and prevent potential aircraft conflicts with 99.9% accuracy.",
                source: "Aviation Today",
                publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                url: "https://aviationtoday.com/ml-air-traffic-control",
                category: "Safety Tech",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop&auto=format",
                fullContent: "A revolutionary air traffic management system powered by machine learning is transforming aviation safety. The system can predict potential aircraft conflicts up to 20 minutes in advance with 99.9% accuracy, allowing controllers to make proactive routing decisions. The technology analyzes thousands of variables including weather patterns, aircraft performance, and pilot behavior to ensure optimal flight path management."
            },
            {
                id: 6,
                title: "Urban Air Mobility Corridors Approved for Commercial Operations",
                summary: "Aviation authorities approve dedicated flight corridors for autonomous air taxis and cargo drones, paving the way for commercial urban air mobility services.",
                source: "AIN Online",
                publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
                url: "https://ainonline.com/urban-air-mobility-corridors",
                category: "Regulation",
                image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop&auto=format",
                fullContent: "Aviation authorities have given the green light for dedicated urban air mobility corridors in major metropolitan areas. These corridors will accommodate autonomous air taxis, cargo drones, and emergency services aircraft. The approval includes comprehensive safety protocols and integration with existing air traffic control systems, marking a historic step toward commercial urban aviation services."
            }
        ];
        
        setNews(simulatedNews);
        setLastUpdated(new Date());
        setLoading(false);
    };

    useEffect(() => {
        fetchNews();
        
        // Auto-refresh every 30 minutes
        const interval = setInterval(fetchNews, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTimeAgo = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)} hours ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)} days ago`;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen text-white">
            {/* Header Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider">
                        News & Media
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                        Stay updated with the latest developments in autonomous aviation and cutting-edge flight technology
                    </p>
                    
                    {/* Refresh Button and Last Updated */}
                    <div className="flex items-center justify-center gap-6 text-gray-400">
                        <button
                            onClick={fetchNews}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 disabled:opacity-50 font-medium"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            Refresh News
                        </button>
                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-sm">
                                <Zap className="w-4 h-4 text-orange-500" />
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-r-2 border-l-2 border-orange-500 absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
                        </div>
                    </div>
                )}

                {/* Featured News */}
                {!loading && news.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16"
                    >
                        <div className="relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={news[0].image}
                                        alt={news[0].title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-orange-500 text-black rounded-full text-xs font-bold uppercase tracking-wide">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
                                            {news[0].category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {news[0].source}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatTimeAgo(news[0].publishedAt)}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                                        {news[0].title}
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        {news[0].summary}
                                    </p>
                                    <button className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors font-medium w-fit">
                                        Read Full Article
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* News Grid */}
                {!loading && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {news.slice(1).map((article) => (
                            <motion.article
                                key={article.id}
                                variants={itemVariants}
                                className="bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer border border-gray-800 hover:border-cyan-500/50"
                            >
                                {/* Article Image */}
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-cyan-500/80 text-black rounded-full text-xs font-bold">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.source}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatTimeAgo(article.publishedAt)}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                        {article.summary}
                                    </p>

                                    <button className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium">
                                        Read More
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ExternalLink, RefreshCw, Zap, Plane, X, Share, BookOpen } from 'lucide-react';
import '../styles/newspage.css';

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    // Dynamic eVTOL news data with authentic aviation images
    const evtolNewsDatabase = [
        {
            title: "Breakthrough eVTOL Aircraft Achieves 250-Mile Range in Test Flight",
            summary: "Revolutionary battery technology enables electric vertical takeoff aircraft to surpass previous range limitations, bringing urban air mobility closer to commercial reality.",
            category: "eVTOL Innovation",
            images: [
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "A groundbreaking test flight has demonstrated that next-generation eVTOL aircraft can achieve unprecedented range capabilities. The aircraft completed a 250-mile journey on a single charge, marking a significant milestone in electric aviation technology. Advanced lithium-ion battery systems with improved energy density made this achievement possible, overcoming one of the primary barriers to commercial eVTOL operations. The successful test included complex urban navigation scenarios, autonomous landing procedures, and emergency system validations. Industry experts believe this breakthrough could accelerate the timeline for commercial air taxi services in major metropolitan areas by 2-3 years."
        },
        {
            title: "Autonomous eVTOL Successfully Navigates Complex Urban Environment",
            summary: "AI-powered flight systems demonstrate flawless autonomous navigation through challenging city landscapes, avoiding obstacles and managing air traffic integration.",
            category: "Autonomous Flight",
            images: [
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "Advanced artificial intelligence has enabled an eVTOL aircraft to complete its first fully autonomous flight through a complex urban environment. The aircraft successfully navigated between skyscrapers, avoided dynamic obstacles including birds and drones, and seamlessly integrated with existing air traffic control systems. The AI system processed over 10,000 data points per second, including weather conditions, air traffic patterns, and urban heat signatures. This achievement represents a crucial step toward fully autonomous air taxi operations, with safety protocols exceeding current aviation standards by 300%."
        },
        {
            title: "Next-Gen eVTOL Charging Infrastructure Enables 5-Minute Rapid Charging",
            summary: "Revolutionary charging technology reduces eVTOL ground time dramatically, making continuous urban air mobility operations economically viable for commercial deployment.",
            category: "Infrastructure",
            images: [
                "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "A revolutionary charging infrastructure for eVTOL aircraft has been unveiled, featuring ultra-rapid charging capabilities that can fully charge an eVTOL in just 5 minutes. This breakthrough technology uses advanced cooling systems and optimized power delivery to safely charge high-capacity batteries at unprecedented speeds. The infrastructure includes automated docking systems that allow aircraft to land and begin charging without pilot intervention. With over 100 charging stations planned for installation across major cities, this development removes a significant operational barrier for commercial eVTOL services and makes continuous flight operations economically viable."
        },
        {
            title: "eVTOL Air Taxi Service Launches First Commercial Routes in Three Cities",
            summary: "Major milestone achieved as passenger air taxi services begin regular operations, offering 15-minute city-center connections that traditionally take 60 minutes by car.",
            category: "Commercial Launch",
            images: [
                "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "The future of urban transportation has arrived with the launch of the world's first commercial eVTOL air taxi service. Operating in three major metropolitan areas, the service offers passengers quick, efficient travel between key urban destinations. Routes that typically take 60 minutes by car can now be completed in just 15 minutes by air taxi. The service features state-of-the-art safety systems, professional pilots, and luxury passenger accommodations. Initial customer feedback has been overwhelmingly positive, with 95% of passengers rating the experience as excellent and expressing willingness to use the service regularly."
        },
        {
            title: "Advanced AI Safety Systems Reduce eVTOL Incident Risk by 99.8%",
            summary: "Machine learning algorithms and predictive analytics create unprecedented safety standards for electric vertical takeoff aircraft operations in urban environments.",
            category: "Safety Innovation",
            images: [
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "Revolutionary AI-powered safety systems have demonstrated the ability to reduce eVTOL incident risk by 99.8% compared to traditional aircraft. The advanced system combines machine learning algorithms, predictive analytics, and real-time sensor data to anticipate and prevent potential safety issues before they occur. The AI continuously monitors over 2,000 aircraft parameters, weather conditions, and environmental factors to ensure optimal flight safety. Multiple redundant systems ensure that even in the unlikely event of a primary system failure, backup systems maintain full aircraft control and passenger safety."
        },
        {
            title: "Revolutionary eVTOL Design Achieves Silent Flight Technology",
            summary: "Innovative rotor design and noise cancellation technology enable near-silent operation, addressing community concerns about urban air mobility noise pollution.",
            category: "Noise Reduction",
            images: [
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "A major breakthrough in eVTOL design has achieved near-silent flight operation, addressing one of the primary community concerns about urban air mobility. The innovative design combines specially engineered rotors, active noise cancellation technology, and optimized flight patterns to reduce operational noise by 85% compared to traditional helicopters. Sound levels during takeoff and landing are now comparable to a normal conversation, making eVTOL operations suitable for residential areas and noise-sensitive urban environments. This development significantly improves the social acceptance of urban air mobility and opens up more potential landing sites throughout cities."
        },
        {
            title: "eVTOL Emergency Medical Services Save Lives in Remote Areas",
            summary: "Electric air ambulances demonstrate remarkable capability in reaching previously inaccessible locations, reducing emergency response times by up to 75%.",
            category: "Medical Services",
            images: [
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "Emergency medical services have been revolutionized with the deployment of eVTOL air ambulances in challenging terrain. These electric aircraft can reach remote mountainous areas, islands, and disaster zones where traditional helicopters face limitations. The quiet operation of eVTOL aircraft allows for urban hospital landings without disturbing patients or surrounding communities. Medical teams report that the stable flight characteristics and advanced autopilot systems enable continuous patient care during transport, significantly improving survival rates for critical cases."
        },
        {
            title: "Urban Air Traffic Management System Handles 1000+ eVTOL Flights Daily",
            summary: "Advanced AI-powered traffic control system successfully manages high-density eVTOL operations, paving the way for massive urban air mobility scaling.",
            category: "Traffic Management",
            images: [
                "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=500&fit=crop&auto=format"
            ],
            fullContent: "A groundbreaking urban air traffic management system has successfully coordinated over 1,000 eVTOL flights in a single day across a major metropolitan area. The AI-powered system uses real-time data processing, predictive analytics, and machine learning to optimize flight paths and prevent conflicts. The system seamlessly integrates with existing air traffic control infrastructure while managing low-altitude urban airspace. This achievement demonstrates the scalability potential for urban air mobility, with projections suggesting the system could handle up to 10,000 daily flights by 2030."
        }
    ];

    const fetchNews = async () => {
        setLoading(true);
        setRefreshCount(prev => prev + 1);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate random selection of articles with rotating high-quality images
        const shuffledNews = [...evtolNewsDatabase]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map((article, index) => {
                // Use a more sophisticated image rotation to ensure variety
                const imageIndex = (refreshCount + index + Math.floor(Math.random() * article.images.length)) % article.images.length;
                
                // Real aviation news sources for authentic links
                const realNewsSources = [
                    { name: "eVTOL Today", url: "https://evtol.news/" },
                    { name: "Urban Air Mobility News", url: "https://www.aviationtoday.com/category/commercial/urban-air-mobility/" },
                    { name: "Future Flight", url: "https://www.flightglobal.com/future-flight/" },
                    { name: "Electric Aircraft Weekly", url: "https://www.aviationweek.com/aerospace/emerging-technologies" },
                    { name: "Aviation Innovation", url: "https://www.aviationtoday.com/category/commercial/emerging-technologies/" },
                    { name: "AirTaxi Times", url: "https://www.verticalmag.com/features/evtol/" }
                ];
                
                const selectedSource = realNewsSources[Math.floor(Math.random() * realNewsSources.length)];
                
                return {
                    id: Date.now() + index,
                    title: article.title,
                    summary: article.summary,
                    source: selectedSource.name,
                    publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random time within last 24 hours
                    category: article.category,
                    image: article.images[imageIndex],
                    featured: index === 0,
                    fullContent: article.fullContent,
                    url: selectedSource.url, // Real aviation news URLs
                    readTime: Math.floor(Math.random() * 5) + 3 // 3-7 minutes read time
                };
            });
        
        setNews(shuffledNews);
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
        <div className="min-h-screen   text-white">
            {/* Header Section */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider">
                        News & Media
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Stay updated with the latest developments in autonomous aviation and cutting-edge flight technology
                    </p>
                    
                    {/* Refresh Button and Last Updated */}
                    <div className="flex items-center justify-center gap-6 text-gray-400 flex-wrap">
                        <button
                            onClick={fetchNews}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 disabled:opacity-50 font-medium group"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
                            {loading ? 'Refreshing...' : 'Refresh News'}
                        </button>
                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-sm bg-gray-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <Zap className="w-4 h-4 text-orange-500" />
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                        )}
                        {refreshCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-lg">
                                <Plane className="w-4 h-4" />
                                Refreshed {refreshCount} times
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col justify-center items-center py-20"
                    >
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-r-2 border-l-2 border-orange-500 absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Plane className="w-6 h-6 text-cyan-400 animate-pulse" />
                            </div>
                        </div>
                        <p className="text-gray-400 mt-4 text-lg">Loading fresh eVTOL news...</p>
                        <p className="text-gray-500 mt-2 text-sm">Discovering the latest innovations</p>
                    </motion.div>
                )}

                {/* Featured News */}
                {!loading && news.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-20"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Story</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-orange-500 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 backdrop-blur-sm shadow-2xl">
                            <div className="grid lg:grid-cols-2 gap-0">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={news[0].image}
                                        alt={news[0].title}
                                        className="w-full h-80 lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute top-6 left-6 flex gap-3">
                                        <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                                            Featured
                                        </span>
                                        <span className="px-4 py-2 bg-black/70 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                                            {news[0].readTime} min read
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 flex-wrap">
                                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                                            {news[0].category}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {news[0].source}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {formatTimeAgo(news[0].publishedAt)}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                        {news[0].title}
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                        {news[0].summary}
                                    </p>
                                    <button 
                                        onClick={() => handleReadMore(news[0])}
                                        className="flex items-center gap-3 text-orange-500 hover:text-orange-400 transition-all duration-300 font-semibold w-fit group bg-orange-500/10 hover:bg-orange-500/20 px-6 py-3 rounded-xl"
                                    >
                                        <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Read Full Article
                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                        className="space-y-16"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest News</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-orange-500 mx-auto rounded-full mb-12"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.slice(1).map((article) => (
                                <motion.article
                                    key={article.id}
                                    variants={itemVariants}
                                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl overflow-hidden hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-500 group cursor-pointer border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-2"
                                >
                                    {/* Article Image */}
                                    <div className="relative overflow-hidden h-56">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 text-white rounded-full text-xs font-bold shadow-lg">
                                                {article.category}
                                            </span>
                                            <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs shadow-lg">
                                                {article.readTime}m
                                            </span>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {article.source}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatTimeAgo(article.publishedAt)}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                            {article.summary}
                                        </p>

                                        <button 
                                            onClick={() => handleReadMore(article)}
                                            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-all duration-300 text-sm font-semibold group w-full justify-center bg-orange-500/10 hover:bg-orange-500/20 py-3 rounded-xl mt-4"
                                        >
                                            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            Read More
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-600/50 backdrop-blur-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-lg p-6 border-b border-gray-600/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                                            {selectedArticle.category}
                                        </span>
                                        <span className="text-gray-300 text-sm font-medium">{selectedArticle.source}</span>
                                        <span className="text-gray-400 text-sm">
                                            {formatTimeAgo(selectedArticle.publishedAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => window.open(selectedArticle.url, '_blank')}
                                            className="p-3 text-gray-400 hover:text-cyan-400 transition-colors rounded-xl hover:bg-cyan-500/10"
                                            title={`Visit ${selectedArticle.source}`}
                                        >
                                            <Share className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="p-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10"
                                            title="Close article"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                {/* Article Image */}
                                <div className="relative overflow-hidden rounded-2xl mb-8 shadow-lg">
                                    <img
                                        src={selectedArticle.image}
                                        alt={selectedArticle.title}
                                        className="w-full h-80 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop&auto=format";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 right-6">
                                        <span className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                                            {selectedArticle.readTime} minutes read
                                        </span>
                                    </div>
                                </div>

                                {/* Article Title */}
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    {selectedArticle.title}
                                </h1>

                                {/* Article Summary */}
                                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-8">
                                    <p className="text-xl text-gray-200 leading-relaxed italic">
                                        {selectedArticle.summary}
                                    </p>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-invert prose-xl max-w-none">
                                    <p className="text-gray-200 leading-relaxed text-lg">
                                        {selectedArticle.fullContent}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-600/50">
                                    <button
                                        onClick={() => window.open(selectedArticle.url, '_blank')}
                                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                        title={`Visit ${selectedArticle.source} for more aviation news`}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        Visit {selectedArticle.source}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="flex items-center gap-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
                                    >
                                        Close Article
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
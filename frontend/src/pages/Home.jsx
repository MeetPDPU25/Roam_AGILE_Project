// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await API.get('/api/data/cities');
                setCities(response.data.slice(0, 6));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching cities:", err);
                setError('Could not load cities. Please try again later.');
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section className="h-[100vh] flex items-center justify-center text-center text-white bg-[linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url('/images/intro.jpg')] bg-cover bg-center relative overflow-hidden">
                <div className="z-10 px-6">
                    <p className="text-sm font-bold tracking-[0.3em] uppercase text-gold-300 mb-4">
                        ✦ Land of Kings & Colours ✦
                    </p>
                    <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-6 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.6)] leading-tight">
                        Roam Rajasthan
                    </h1>
                    <p className="text-xl md:text-2xl font-light drop-shadow-[1px_1px_4px_rgba(0,0,0,0.5)] text-gray-200 max-w-xl mx-auto leading-relaxed">
                        Discover forts, deserts, palaces and flavours of the most royal state in India
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/cities" className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-900/40 text-base">
                            Explore Cities
                        </Link>
                        <Link to="/itineraries" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold rounded-full backdrop-blur-sm transition-all duration-300 text-base">
                            View Itineraries
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="bg-brand-600 py-8">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                    {[
                        { num: '6+', label: 'Cities Covered' },
                        { num: '20+', label: 'Heritage Sites' },
                        { num: '15+', label: 'Local Cuisines' },
                        { num: '12+', label: 'Shopping Bazaars' },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-4xl font-display font-extrabold text-gold-300">{s.num}</p>
                            <p className="text-sm font-medium text-white/80 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cities Section */}
            <section className="py-20 px-6 bg-[#fdf8f5]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3">
                            Where to Go
                        </p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                            Explore the Cities
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                            From the Pink City of Jaipur to the golden sands of Jaisalmer — every city in Rajasthan tells a story.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {cities.map((city) => {
                                const image = city.image_url ? `/${city.image_url}` : '/images/jaipur/hawaMahal.jpg';
                                return (
                                    <Link
                                        to={`/cities/${city.city_id}`}
                                        key={city._id}
                                        className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brand-600/10 transition-all duration-400 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={image}
                                                alt={city.city_name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-xl font-display font-bold">{city.city_name}</h3>
                                                {city.name && <p className="text-xs text-gold-300 font-medium mt-0.5">{city.name}</p>}
                                            </div>
                                            {city.best_time && (
                                                <div className="absolute top-3 right-3 bg-brand-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                                                    🗓 {city.best_time.split(' ').slice(0,3).join(' ')}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                {city.description
                                                    ? `${city.description.substring(0, 110)}...`
                                                    : 'Experience the rich culture and heritage...'}
                                            </p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-brand-600 font-bold text-sm group-hover:text-brand-500 transition-colors">
                                                    View City Guide →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* View All Button */}
                    <div className="text-center mt-14">
                        <Link
                            to="/cities"
                            className="inline-block px-10 py-4 bg-brand-600 text-white rounded-full font-bold text-base transition-all duration-300 hover:bg-brand-500 hover:scale-105 shadow-lg shadow-brand-600/30"
                        >
                            View All Cities
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Rajasthan Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3">Why Visit</p>
                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-16">
                        The Magic of Rajasthan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: '🏰', title: 'Majestic Forts', desc: 'Over 100 historic forts and palaces that narrate centuries of Rajput bravery and royal grandeur.' },
                            { icon: '🌅', title: 'Desert Sunsets', desc: 'Watch the golden sun melt into the Thar Desert at Jaisalmer — a spectacle unlike any other.' },
                            { icon: '🍛', title: 'Royal Cuisine', desc: 'Dal Baati Churma, Laal Maas, Ghewar — the flavours of Rajasthan are as rich as its history.' },
                        ].map((f) => (
                            <div key={f.title} className="p-8 rounded-2xl bg-[#fff8f5] border border-brand-100 hover:border-brand-300 hover:shadow-lg transition-all duration-300 group">
                                <div className="text-5xl mb-5">{f.icon}</div>
                                <h3 className="font-display font-bold text-gray-900 text-xl mb-3 group-hover:text-brand-600 transition-colors">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

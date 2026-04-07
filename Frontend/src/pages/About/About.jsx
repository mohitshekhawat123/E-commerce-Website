import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
    { name: "Emma Watson", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "James Carter", role: "Head of Design", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Sophia Lee", role: "Lead Developer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const values = [
    { title: "Minimalism", desc: "Less is more. We focus on clean lines, removing the unnecessary to leave only what matters." },
    { title: "Quality", desc: "Every stitch counts. We source premium materials to ensure our garments stand the test of time." },
    { title: "Sustainability", desc: "Crafting fashion that respects our planet through responsible sourcing and ethical production." },
    { title: "Comfort", desc: "Style should never compromise ease. Our fits are designed for your everyday life." }
];

export default function About() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-black selection:text-white pb-24">

            {/* Hero Section */}
            <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/40" />

                <div className={`relative z-10 text-center px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 uppercase">
                        CRAG
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light tracking-widest uppercase">
                        Redefining Minimal Fashion
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">

                {/* Our Story & Mission Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
                    <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block">Our Story</h2>
                        <h3 className="text-3xl md:text-4xl font-light text-black mb-6 leading-tight">
                            Born from a desire for modern simplicity.
                        </h3>
                        <p className="text-gray-500 leading-relaxed font-light text-lg mb-6">
                            At CRAG, we believe that true elegance lies in simplicity. Founded with a vision to strip away the excess, our designs celebrate modern fashion through clean silhouettes, muted tones, and impeccable craftsmanship.
                        </p>
                        <p className="text-gray-500 leading-relaxed font-light text-lg">
                            We create pieces that aren't just worn for a season, but cherished for years. Every garment tells a story of intentional design, where less truly becomes more.
                        </p>
                    </div>

                    <div className={`relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                            alt="Fashion aesthetic"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Our Mission (Centered) */}
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block">Our Mission</h2>
                    <p className="text-2xl md:text-4xl font-light text-black leading-relaxed">
                        "To deliver high-quality, affordable, and stylish clothing that empowers individuals to express themselves effortlessly."
                    </p>
                </div>

                {/* Values Section */}
                <div className="mb-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <h4 className="text-xl font-medium text-black mb-4">{val.title}</h4>
                                <p className="text-gray-500 font-light leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us & Testimonial */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    <div className="bg-black text-white p-12 rounded-3xl flex flex-col justify-center">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block">Why Choose Us</h2>
                        <h3 className="text-3xl font-light mb-10">The CRAG Difference</h3>
                        <ul className="space-y-6">
                            {[
                                "Premium Quality Materials",
                                "Modern, Timeless Designs",
                                "Affordable luxury Pricing",
                                "Fast, Reliable Delivery"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-gray-300 font-light text-lg">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col justify-center bg-gray-100 p-12 rounded-3xl">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4 block">Customer Stories</h2>
                        <h3 className="text-2xl font-light italic text-black mb-8 leading-relaxed">
                            "CRAG completely transformed my wardrobe. Their pieces are the foundation of all my outfits now—minimal, comfortable, and undeniably stylish."
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Customer" />
                            </div>
                            <div>
                                <p className="text-black font-medium text-sm">Sarah Jenkins</p>
                                <p className="text-gray-500 text-sm">Verified Buyer</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section (Bonus) */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 block">The Faces Behind CRAG</h2>
                        <h3 className="text-3xl md:text-4xl font-light text-black">Meet Our Team</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                                    <img src={member.image} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h4 className="text-xl font-medium text-black mb-1">{member.name}</h4>
                                <p className="text-gray-500 font-light">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center max-w-3xl mx-auto py-16 border-t border-gray-200">
                    <h2 className="text-4xl font-light text-black mb-6">Join Our Journey</h2>
                    <p className="text-gray-500 text-lg font-light mb-10">
                        Be part of the minimal fashion revolution. Discover pieces that elevate your everyday style.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link to="/products" className="px-10 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-gray-800 transition-colors shadow-lg active:scale-95 duration-200">
                            Shop Now
                        </Link>
                    </div>

                    {/* Social Links (UI only) */}
                    <div className="mt-16 flex justify-center gap-8 text-gray-400">
                        <a href="#" className="hover:text-black transition-colors uppercase text-sm font-bold tracking-widest">Instagram</a>
                        <a href="#" className="hover:text-black transition-colors uppercase text-sm font-bold tracking-widest">Twitter</a>
                        <a href="#" className="hover:text-black transition-colors uppercase text-sm font-bold tracking-widest">Pinterest</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

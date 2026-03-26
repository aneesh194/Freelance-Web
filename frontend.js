import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import {
    ArrowUpRight,
    Code2,
    Cpu,
    Check,
    MessageCircle,
    Linkedin,
    Instagram,
    MoveDown,
    Zap,
    ShieldCheck,
    Rocket,
    Plus,
    Minus,
    Star,
    Quote,
    ChevronRight,
    Globe,
    Layout,
    Layers,
    ShoppingBag,
    Smartphone
} from 'lucide-react';

// --- Components ---

const MagneticButton = ({ children, className = "", variant = "primary", onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const baseStyles = "relative flex items-center justify-center transition-colors duration-300";
    const variants = {
        primary: "bg-black text-white hover:bg-indigo-600",
        secondary: "bg-zinc-100 text-black hover:bg-zinc-200",
        outline: "border border-zinc-200 text-black hover:border-black"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-zinc-100' : 'py-8'}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
                <motion.div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="text-xl font-black tracking-tighter text-black">Aneesh<span className="text-indigo-600">.in</span></span>
                </motion.div>

                <div className="hidden md:flex items-center gap-10">
                    {['Works', 'About', 'Pricing', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[12px] font-bold tracking-widest uppercase text-zinc-500 hover:text-black transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <MagneticButton className="px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfMNqz0t_qiHHIQcrjdeDG5_ofEXOEcbP3s4pYgYh19zrvq7Q/viewform?usp=publish-editor', '_blank')}>
                        Start a Project
                    </MagneticButton>
                </div>

                <div className="md:hidden">
                    <button className="bg-black text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfMNqz0t_qiHHIQcrjdeDG5_ofEXOEcbP3s4pYgYh19zrvq7Q/viewform?usp=publish-editor', '_blank')}>
                        Start Project
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    const handleBuildNow = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfMNqz0t_qiHHIQcrjdeDG5_ofEXOEcbP3s4pYgYh19zrvq7Q/viewform?usp=publish-editor', '_blank');
    };

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white px-6">
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white z-10" />
                <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
                    alt="Background"
                    className="w-full h-[120%] object-cover opacity-[0.08] grayscale"
                />
            </motion.div>

            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 text-center max-w-5xl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Available for new projects</span>
                </motion.div>

                <h1 className="text-[12vw] md:text-[110px] font-black leading-[0.9] tracking-tighter text-black mb-10">
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            CRAFTING
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-indigo-600 italic font-serif pr-4"
                        >
                            WEBSITES
                        </motion.span>
                    </span>
                </h1>

                <p className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed font-medium tracking-tight">
                    Engineering high-performance digital experiences <br className="hidden md:block" /> where logic meets visual excellence.
                </p>

                <div className="flex justify-center items-center">
                    <MagneticButton
                        className="px-12 py-5 rounded-full font-black text-xs tracking-[0.3em] uppercase group overflow-hidden"
                        onClick={handleBuildNow}
                    >
                        <span className="relative z-10 flex items-center">
                            Build Now
                            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </MagneticButton>
                </div>
            </motion.div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-300 z-20">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <MoveDown size={20} />
                </motion.div>
            </div>
        </section>
    );
};

const CapabilitiesMarquee = () => {
    const items = [
        { label: "SaaS Platforms", icon: <Layers size={14} /> },
        { label: "Portfolio Sites", icon: <Layout size={14} /> },
        { label: "E-Commerce", icon: <ShoppingBag size={14} /> },
        { label: "AI Dashboards", icon: <Cpu size={14} /> },
        { label: "Corporate Landing Pages", icon: <Globe size={14} /> },
        { label: "Mobile Web Apps", icon: <Smartphone size={14} /> },
    ];

    return (
        <div className="py-20 bg-white border-b border-zinc-100 overflow-hidden select-none">
            <div className="text-center mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 block mb-4">Versatility</span>
                <h2 className="text-2xl font-black text-black">We can craft any sort of website like this.</h2>
            </div>
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex gap-10 items-center"
                >
                    {[...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-zinc-50 border border-zinc-100 px-8 py-4 rounded-full">
                            <span className="text-indigo-600">{item.icon}</span>
                            <span className="text-sm font-black text-black uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const AboutSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section id="about" ref={containerRef} className="py-32 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] md:aspect-square bg-zinc-200 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
                            <motion.img
                                style={{ y }}
                                src="./profile.jpeg"
                                alt="Aneesh"
                                className="w-full h-[120%] object-cover absolute top-[-10%]"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl border border-zinc-100 hidden md:block z-10">
                            <div className="text-3xl font-black text-indigo-600">3+</div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Years Experience</div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-8 tracking-tight">Behind the Code.</h2>
                        <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
                            Hi, I'm Aneesh. I am a full-stack developer and designer dedicated to creating clean, impactful digital solutions. My journey started with a curiosity for how things work on the internet, which evolved into a professional career building for clients worldwide.
                        </p>
                        <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                            I specialize in React, Next.js, and modern CSS frameworks, ensuring that every website I build is not just beautiful, but lightning-fast and search-engine optimized.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-black font-black mb-2 uppercase text-xs tracking-widest">Stack</div>
                                <div className="text-zinc-500 text-sm">React, Next.js, Node, Tailwind, Figma</div>
                            </div>
                            <div>
                                <div className="text-black font-black mb-2 uppercase text-xs tracking-widest">Focus</div>
                                <div className="text-zinc-500 text-sm">SaaS, Portfolios, E-commerce, Brands, Suprise websites(For gifting)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectSmall = ({ title, category, img, link }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => link && window.open(link, '_blank')}
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 mb-6">
                <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black tracking-tight text-black">{title}</h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowUpRight size={20} />
                </div>
            </div>
        </motion.div>
    );
};

const Pricing = () => {
    const tiers = [
        {
            name: "Basic",
            price: "₹999",
            desc: "Perfect for single page landing sites.",
            features: ["Single Page Layout", "Responsive Design", "Basic SEO", "Contact Form", "Standard Support"],
            icon: <Zap className="text-orange-500" />,
            popular: false
        },
        {
            name: "Standard",
            price: "₹1,499",
            desc: "Comprehensive web presence for growing brands.",
            features: ["Up to 5 Pages", "Custom Animations", "Advanced SEO", "WhatsApp Integration", "Priority Support"],
            icon: <Rocket className="text-indigo-600" />,
            popular: true
        },
        {
            name: "Customised",
            price: "Tailored",
            desc: "Complex apps and unique architectures.",
            features: ["Unlimited Pages", "Admin Dashboard", "Backend Support", "Strategic Consulting", "Life-time Support"],
            icon: <ShieldCheck className="text-emerald-500" />,
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4">Investment Tiers</h2>
                    <p className="text-zinc-500">Premium engineering priced for accessibility.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <div key={i} className={`p-10 rounded-3xl border ${tier.popular ? 'border-indigo-600 bg-zinc-50 shadow-2xl' : 'border-zinc-100 bg-white'}`}>
                            <div className="mb-6">{tier.icon}</div>
                            <h3 className="text-2xl font-black text-black mb-2">{tier.name}</h3>
                            <div className="text-4xl font-black text-black mb-6">{tier.price}</div>
                            <div className="space-y-4 mb-10">
                                {tier.features.map((f, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm font-medium text-zinc-600"><Check size={16} className="text-green-500" />{f}</div>
                                ))}
                            </div>
                            <MagneticButton variant={tier.popular ? "primary" : "outline"} className="w-full py-4 rounded-xl font-black text-[10px] tracking-widest uppercase" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfMNqz0t_qiHHIQcrjdeDG5_ofEXOEcbP3s4pYgYh19zrvq7Q/viewform?usp=publish-editor', '_blank')}>Get Started</MagneticButton>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Reviews = () => {
    const reviews = [
        { name: "Rahul", role: "Startup Founder", text: "Aneesh transformed our vision into a beautiful, functional reality. Highly professional and fast." },
        { name: "Priya V", role: "Creative Director", text: "The attention to detail in the animations and mobile performance is world-class. Best developer we've worked with." },
        { name: "Aditya", role: "E-comm Owner", text: "Simplified our workflow and gave us a site that actually converts visitors into customers. Highly recommended!" }
    ];

    return (
        <section className="py-32 bg-zinc-950 text-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center mb-16">
                <div className="inline-flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#fbbf24" className="text-amber-400" />)}
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">What Clients Say</h2>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-8">
                {reviews.map((r, i) => (
                    <div key={i} className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 relative">
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed italic">{r.text}</p>
                        <div>
                            <div className="font-bold text-white">{r.name}</div>
                            <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{r.role}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FAQ = () => {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: "Why choose Aneesh.in?", a: "I don't just write code; I design solutions. Unlike big agencies, you get direct communication, personalized attention, and premium quality at local pricing." },
        { q: "How long does a project take?", a: "Typical landing pages take 3-5 days. Complex Professional sites take 7-10 days depending on the scope and features required." },
        { q: "Do you offer revisions?", a: "Yes, I provide unlimited revisions on the Professional tier to ensure the final product perfectly matches your vision." },
        { q: "Will my site be mobile friendly?", a: "Absolutely. I follow a mobile-first approach. Your site will look and function flawlessly on smartphones, tablets, and desktops." },
        { q: "Do you handle hosting and domain?", a: "I can guide you through the process of purchasing a domain and setting up hosting, or I can manage it for you as part of an add-on service." }
    ];

    return (
        <section className="py-32 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-black text-black mb-16 text-center tracking-tight">FAQs</h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="border border-zinc-100 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? -1 : i)}
                                className="w-full p-6 flex justify-between items-center bg-white hover:bg-zinc-50 transition-colors text-left"
                            >
                                <span className="font-bold text-black">{f.q}</span>
                                {open === i ? <Minus size={18} /> : <Plus size={18} />}
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed"
                                    >
                                        {f.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BookingForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', details: '' });

    const handleSend = () => {
        if (!formData.name || !formData.email || !formData.details) {
            alert("Please fill in all fields before sending.");
            return;
        }
        const text = `Hi Aneesh, I would like to start a project.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Project Details:*\n${formData.details}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/916369952728?text=${encodedText}`, '_blank');
    };

    return (
        <section id="contact" className="py-32 bg-zinc-50 border-t border-zinc-100">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black text-black mb-10 tracking-tight">Get in <br /> touch <span className="text-indigo-600">now.</span></h2>
                        <div className="flex gap-4">
                            <a href="http://linkedin.com/in/aneesh-kumar194" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-black hover:text-white transition-colors cursor-pointer"><Linkedin size={20} /></a>
                            <a href="https://wa.me/916369952728" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-green-500 hover:text-white transition-colors cursor-pointer"><MessageCircle size={20} /></a>
                            <a href="https://www.instagram.com/_.aneeshh__" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"><Instagram size={20} /></a>
                        </div>
                    </div>
                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-4 bg-white border border-zinc-200 rounded-xl outline-none focus:border-indigo-600"
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-4 bg-white border border-zinc-200 rounded-xl outline-none focus:border-indigo-600"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <textarea
                            rows={4}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full p-4 bg-white border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 resize-none"
                            placeholder="Project details..."
                            required
                        />
                        <MagneticButton className="w-full py-5 rounded-xl font-black text-[10px] tracking-[0.3em] uppercase" onClick={(e) => { e.preventDefault(); handleSend(); }}>Send Message</MagneticButton>
                    </form>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-12 bg-white border-t border-zinc-100 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-lg font-black tracking-tighter text-black">Aneesh<span className="text-indigo-600">.in</span></div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">Crafting ideas into websites.</div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">© 2024 Aneesh — Coimbatore, India</div>
        </div>
    </footer>
);

const App = () => {
    const projects = [
        { title: "Portfolio", category: "Personal Website", img: "/project1.png", link: "https://aneeshportfolio.netlify.app/" },
        { title: "Gym Demo", category: "Gym website", img: "/project2.png", link: "https://gym-demo-eta.vercel.app/" },
        { title: "Suprising Website", category: "website for suprising", img: "/project3.png", link: "https://suprise-demo.netlify.app/" },
        { title: "E commerce Website", category: "Online shopping website", img: "/project4.png", link: "https://pasumaiecommerce-demo.netlify.app/" },
    ];

    return (
        <div className="bg-white text-black selection:bg-indigo-600 selection:text-white overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <CapabilitiesMarquee />
                <section id="works" className="py-32 bg-white px-6 md:px-10">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-16">Selected Works</h2>
                        <div className="grid md:grid-cols-2 gap-16">
                            {projects.map((p, i) => <ProjectSmall key={i} index={i} {...p} />)}
                        </div>
                    </div>
                </section>
                <AboutSection />
                <Pricing />
                <Reviews />
                <FAQ />
                <BookingForm />
            </main>
            <Footer />

            <style>{`
        @media (max-width: 768px) {
          nav a { display: none; }
          nav .md\\:flex { display: none; }
        }
      `}</style>
        </div>
    );
};

export default App;
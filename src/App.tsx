/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Zap,
  Flame,
  Wind,
  ShieldCheck,
  ArrowLeft,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { FLAVORS, Flavor, MASCOT_IMAGE, GROUP_IMAGE } from './constants';

type AppView = 'home' | 'product' | 'cart';

interface CartItem extends Flavor {
  quantity: number;
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState<Flavor>(FLAVORS[0]);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addToCart = (flavor: Flavor) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === flavor.id);
      if (existing) {
        return prev.map(item => item.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...flavor, quantity: 1 }];
    });
    setCurrentView('cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (3.99 * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              key={activeFlavor.id + 'text'}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase rounded-sm">NEW ARRIVAL</span>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              
              <h1 className="text-[clamp(4rem,15vw,12rem)] font-display mb-6 leading-[0.85] text-white uppercase italic tracking-tighter">
                {activeFlavor.name === 'Cream & Onion Pudina' ? 'PUDINA' : activeFlavor.name}
                <span className="block text-[clamp(2rem,8vw,5rem)] font-serif italic text-white/60">FLASH MAGIC</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-lg text-white/90 leading-relaxed font-medium">
                {activeFlavor.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                {activeFlavor.features.map((feature, idx) => (
                  <motion.div 
                    key={feature} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    {idx === 0 && <Flame size={16} className="text-yellow-400" />}
                    {idx === 1 && <Zap size={16} className="text-yellow-400" />}
                    {idx === 2 && <ShieldCheck size={16} className="text-yellow-400" />}
                    <span className="text-sm font-bold text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => setCurrentView('product')}
                  className="px-12 py-6 bg-yellow-400 text-black font-display text-xl uppercase italic tracking-widest hover:scale-105 transition-transform rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 group"
                >
                  Grab A Pack <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => { setCurrentView('product'); setShowIngredients(true); }}
                  className="px-12 py-6 border-4 border-white text-white font-display text-xl uppercase italic tracking-widest hover:bg-white hover:text-black transition-all rounded-sm flex items-center justify-center gap-3"
                >
                  Ingredients
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Product Showcase */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFlavor.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -15, y: 50 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 15, y: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative z-10"
              >
                {/* Glowing background behind image */}
                <div 
                  className="absolute inset-0 blur-[100px] opacity-40 rounded-full"
                  style={{ backgroundColor: activeFlavor.color.accent }}
                />
                <img 
                  src={activeFlavor.image} 
                  alt={activeFlavor.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[450px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] z-20 relative cursor-pointer"
                  onClick={() => setCurrentView('product')}
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Mascot */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 z-30 pointer-events-none"
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={MASCOT_IMAGE} alt="Floating Mascot" referrerPolicy="no-referrer" className="w-full h-full object-contain filter drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flavor Selector Sticky Section */}
      <motion.section 
        className="py-20 px-6 transition-colors duration-700 border-y border-white/10"
        animate={{ 
          backgroundColor: activeFlavor.color.secondary,
          borderColor: activeFlavor.id === 'pudina' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 px-4 border-l-8 border-yellow-400`}>
            <div>
              <h2 className="text-sm font-black text-yellow-400 tracking-[0.4em] mb-4 uppercase">CHOOSE YOUR VIBE</h2>
              <h3 className={`text-[clamp(2.5rem,6vw,5rem)] font-display uppercase italic leading-none transition-colors duration-700 ${
                activeFlavor.id === 'pudina' ? 'text-black' : 'text-white'
              }`}>
                EXPLORE FLAVORS
              </h3>
            </div>
            <div className="hidden md:block">
              <p className={`max-w-sm text-right text-xs uppercase tracking-tighter font-bold transition-colors duration-700 ${
                activeFlavor.id === 'pudina' ? 'text-black/40' : 'text-white/40'
              }`}>
                ARTISAN BLENDS • SMALL BATCHES • PREMIUM QUALITY • UNLEASH THE MAGIC •
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => setActiveFlavor(flavor)}
                className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden text-left ${
                  activeFlavor.id === flavor.id 
                    ? 'border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-[1.02]' 
                    : (activeFlavor.id === 'pudina' ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10')
                }`}
                style={{ 
                  backgroundColor: activeFlavor.id === flavor.id ? flavor.color.primary : undefined,
                  color: activeFlavor.id === flavor.id ? flavor.color.text : (activeFlavor.id === 'pudina' ? '#111' : '#fff')
                }}
              >
                <div className="relative z-10">
                  <span className={`text-[10px] font-black tracking-widest uppercase mb-1 block transition-colors ${
                    activeFlavor.id === flavor.id ? 'opacity-80' : 'opacity-40'
                  }`}>
                    {flavor.tagline}
                  </span>
                  <h4 className="text-3xl font-display uppercase italic leading-tight">
                    {flavor.name}
                  </h4>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className={`text-sm font-bold opacity-70`}>
                      $3.99 / Pack
                    </span>
                    <div 
                      onClick={(e) => { e.stopPropagation(); setActiveFlavor(flavor); setCurrentView('product'); }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
                      activeFlavor.id === flavor.id 
                        ? (activeFlavor.id === 'pudina' ? 'bg-black text-white' : 'bg-white text-black')
                        : (activeFlavor.id === 'pudina' ? 'bg-black text-white' : 'bg-white text-black')
                    }`}>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Dynamic background shape for active state */}
                {activeFlavor.id === flavor.id && (
                  <motion.div 
                    layoutId="active-flavor-bg"
                    className="absolute inset-0 z-0"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Subtle Pattern */}
                <img 
                  src={MASCOT_IMAGE} 
                  alt="" 
                  referrerPolicy="no-referrer"
                  className={`absolute -right-8 -bottom-8 w-32 transition-all duration-700 scale-150 rotate-[-20deg] pointer-events-none ${
                     activeFlavor.id === flavor.id ? 'opacity-10 brightness-0' : 'opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* The Whole Lineup */}
      <section className={`py-40 bg-zinc-100 dark:bg-black px-6 overflow-hidden relative`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-display uppercase italic leading-none mb-8 dark:text-white">
              THE WHOLE <br />
              <span className="text-yellow-400">LINEUP</span>
            </h2>
            <p className="text-xl text-zinc-500 mb-12 max-w-md font-medium leading-relaxed">
              From the fiery kick of Chilli to the cooling zest of Pudina, our artisan range is designed to unleash the flavor magic. Why settle for one when you can have the full experience?
            </p>
            <div className="flex gap-4">
               <button 
                onClick={() => setCurrentView('product')}
                className="px-8 py-4 bg-black dark:bg-white dark:text-black text-white font-display uppercase italic tracking-[0.2em] rounded-sm shadow-xl"
               >
                 Shop Everything
               </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-yellow-400 rotate-3 -z-10 rounded-3xl opacity-10" />
            <img 
              src={GROUP_IMAGE} 
              alt="All flavors lineup" 
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative z-10 rounded-2xl" 
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-32 px-6 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <Wind />, title: "Air Tight", desc: "Freshness locked in every pack for ultimate crunch." },
            { icon: <Zap />, title: "Artisan Made", desc: "Crafted in small batches with premium ingredients." },
            { icon: <Flame />, title: "Zero Trans Fat", desc: "Maximum flavor magic, zero guilt." },
            { icon: <ShieldCheck />, title: "100% Veg", desc: "A pure snack for everyone to enjoy." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center text-black shadow-lg">
                {item.icon}
              </div>
              <h5 className={`text-xl font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {item.title}
              </h5>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social / IG Preview */}
      <section className="py-20 bg-black text-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl font-black text-white/5 uppercase italic mb-8 select-none">#UNLEASHTHEMAGIC</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-zinc-800 relative group overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-yellow-400/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="font-black text-black uppercase italic">VIEW POST</span>
                </div>
                <img 
                  src={MASCOT_IMAGE} 
                  alt="Social feed mockup" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderProductDetail = () => (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => { setCurrentView('home'); setShowIngredients(false); }}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-12 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          <ArrowLeft size={20} /> Back To Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative">
               <div 
                 className="absolute inset-0 blur-[120px] opacity-30 rounded-full"
                 style={{ backgroundColor: activeFlavor.color.accent }}
               />
               <img 
                 src={activeFlavor.image} 
                 alt={activeFlavor.fullName} 
                 referrerPolicy="no-referrer"
                 className="w-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] rounded-3xl"
               />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <h1 className="text-6xl font-display uppercase italic mb-2">{activeFlavor.name}</h1>
            <p className="text-xl text-white/60 mb-8 font-bold italic">{activeFlavor.tagline}</p>
            
            <div className="text-4xl font-display text-yellow-400 mb-8">$3.99</div>

            <p className="text-lg text-white/80 leading-relaxed mb-12 font-medium">
              {activeFlavor.description}
            </p>

            <button 
              onClick={() => addToCart(activeFlavor)}
              className="w-full py-6 bg-yellow-400 text-black font-display text-2xl uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all rounded-sm flex items-center justify-center gap-4 mb-12"
            >
              Add To Cart <Plus size={24} />
            </button>

            <div className="space-y-8">
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-display uppercase italic mb-4 text-yellow-400">Nutritional Info (Per Serving)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(activeFlavor.nutrition).map(([key, val]) => (
                    <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="text-[10px] uppercase font-black text-white/40 mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-lg font-display text-white">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`border-t border-white/10 pt-8 transition-opacity duration-500 ${showIngredients ? 'opacity-100' : 'opacity-60'}`}>
                <h3 className="text-xl font-display uppercase italic mb-4 text-yellow-400">Ingredients</h3>
                <p className="text-white/60 font-medium leading-relaxed">
                  {activeFlavor.ingredients.join(', ')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderCart = () => (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-display text-white uppercase italic mb-12">Your Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <ShoppingBag size={64} className="mx-auto text-white/20 mb-6" />
            <p className="text-xl text-white/60 font-bold uppercase italic mb-8">Your bag is empty magic-less</p>
            <button 
              onClick={() => setCurrentView('home')}
              className="px-10 py-4 bg-yellow-400 text-black font-display uppercase italic tracking-[0.2em] rounded-sm"
            >
              Go Shop Magic
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center gap-6"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-xl bg-black/20" />
                <div className="flex-1">
                  <h3 className="text-xl font-display text-white uppercase italic">{item.name}</h3>
                  <p className="text-yellow-400 font-bold">$3.99</p>
                </div>
                <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-white/10">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-white hover:text-yellow-400 transition-colors"><Minus size={16} /></button>
                  <span className="text-white font-display text-xl w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-white hover:text-yellow-400 transition-colors"><Plus size={16} /></button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 text-white/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}

            <div className="pt-12 border-t border-white/10 mt-12">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-display text-white/60 uppercase italic">Subtotal</span>
                <span className="text-4xl font-display text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full py-6 bg-white text-black font-display text-2xl uppercase italic tracking-[0.3em] shadow-2xl hover:bg-yellow-400 transition-colors rounded-sm">
                Checkout Now
              </button>
              <button 
                onClick={() => setCurrentView('home')}
                className="w-full mt-4 py-4 text-white/40 font-bold uppercase italic hover:text-white transition-colors"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark' : ''}`}>
      {/* Dynamic Background Layer */}
      <motion.div 
        className="fixed inset-0 -z-10 transition-colors duration-1000"
        animate={{ backgroundColor: isDarkMode ? '#111' : activeFlavor.color.primary }}
      />
      
      {/* Decorative Mascot Background */}
      <div className="fixed inset-0 -z-5 opacity-5 pointer-events-none overflow-hidden">
        <motion.img 
          src={MASCOT_IMAGE} 
          alt="Mascot Pattern" 
          referrerPolicy="no-referrer"
          className="absolute -right-20 -top-20 w-[600px] rotate-12 filter brightness-100 grayscale contrast-125"
          animate={{ rotate: [12, 15, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/10 backdrop-blur-md shadow-lg dark:bg-black/20' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <motion.img 
              src={MASCOT_IMAGE} 
              alt="OHO Mascot" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain brightness-0 invert"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-2xl font-display tracking-widest text-white uppercase italic">OHO CHIPS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12 font-bold italic tracking-tighter">
             <button onClick={() => setCurrentView('home')} className={`text-sm tracking-widest uppercase italic border-b-2 transition-all ${currentView === 'home' ? 'text-white border-yellow-400' : 'text-white/60 border-transparent hover:text-white'}`}>FLAVORS</button>
             <NavLink label="OUR STORY" />
             <NavLink label="LOCATE STORE" />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              id="theme-toggle"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setCurrentView('cart')}
              className={`relative p-2 rounded-full transition-colors text-white ${currentView === 'cart' ? 'bg-yellow-400 text-black' : 'hover:bg-white/20'}`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">{cartCount}</span>
              )}
            </button>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <NavLink label="FLAVORS" mobile onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} />
            <NavLink label="OUR STORY" mobile onClick={() => setIsMenuOpen(false)} />
            <NavLink label="LOCATE STORE" mobile onClick={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {currentView === 'home' && renderHome()}
        {currentView === 'product' && renderProductDetail()}
        {currentView === 'cart' && renderCart()}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={MASCOT_IMAGE} alt="Logo" referrerPolicy="no-referrer" className="w-8 h-8 brightness-0 invert" />
                <span className="text-2xl font-black tracking-tighter">OHO CHIPS</span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed">
                Premium artisan snacks crafted for the bold. We believe in flavor magic, quality ingredients, and the perfect crunch. Join the OHO movement today.
              </p>
            </div>
            <div>
              <h6 className="font-black mb-6 uppercase text-yellow-400">Products</h6>
              <ul className="flex flex-col gap-4 text-white/60 text-sm font-bold">
                <li onClick={() => setCurrentView('home')} className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">Flavours</li>
                <li className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">New Arrivals</li>
                <li className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">Gift Packs</li>
              </ul>
            </div>
            <div>
              <h6 className="font-black mb-6 uppercase text-yellow-400">Support</h6>
              <ul className="flex flex-col gap-4 text-white/60 text-sm font-bold">
                <li className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">Store Locator</li>
                <li className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">Faq</li>
                <li className="hover:text-white cursor-pointer transition-colors uppercase italic font-display">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-white/20">
            <p>© 2026 OHO CHIPS ARTISAN SNACKS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ label, active = false, mobile = false, onClick }: { label: string, active?: boolean, mobile?: boolean, onClick?: () => void }) {
  return (
    <a 
      href={`#${label.toLowerCase().replace(' ', '-')}`} 
      onClick={onClick}
      className={`${
        mobile ? 'text-4xl' : 'text-sm'
      } font-black tracking-widest transition-all uppercase italic group relative ${
        active ? 'text-white' : 'text-white/60 hover:text-white'
      }`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </a>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { t, lang, toggleLanguage, isRTL } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t.nav.home, href: '#hero' },
    { key: 'about', label: t.nav.about, href: '#about' },
    { key: 'units', label: t.nav.units, href: '#units' },
    { key: 'gallery', label: t.nav.gallery, href: '#gallery' },
    { key: 'location', label: t.nav.location, href: '#location' },
    { key: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (key: string, href: string) => {
    setActiveSection(key);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gold/20 shadow-2xl shadow-black/50'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('home', '#hero')}
              className="flex flex-col items-start group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center max-w-[120px] overflow-hidden">
  <img
    src="/images/logo.png"
    alt="Logo"
    className="w-full h-auto object-contain"
  />
</div>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key, item.href)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 group',
                    isRTL ? 'font-cairo' : '',
                    activeSection === item.key ? 'text-gold' : 'text-white/70 hover:text-white'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gold transition-all duration-300',
                      activeSection === item.key ? 'w-full' : 'w-0 group-hover:w-4'
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 text-gold text-xs font-medium hover:bg-gold/10 transition-all duration-300"
              >
                <Globe size={13} />
                <span>{lang === 'ar' ? 'EN' : 'عر'}</span>
              </motion.button>

              {/* CTA */}
              <motion.a
                href={`https://wa.me/966556278284?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، أود الاستفسار عن مشروع لندن هومز' : 'Hello, I want to inquire about London Homes')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-black text-xs font-bold hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
              >
                <span className={isRTL ? 'font-cairo' : ''}>{isRTL ? 'واتساب' : 'WhatsApp'}</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 text-white/70 hover:text-gold transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-gold/20 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.key, item.href)}
                  className={cn(
                    'text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200',
                    isRTL ? 'font-cairo text-right' : '',
                    activeSection === item.key
                      ? 'text-gold bg-gold/10'
                      : 'text-white/70 hover:text-gold hover:bg-white/5'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

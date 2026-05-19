import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronUp, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const WHATSAPP_NUMBER = '966556278284';

export default function FloatingButtons() {
  const { lang, toggleLanguage, isRTL } = useLang();
  const [showScroll, setShowScroll] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const waMessage = lang === 'ar'
    ? 'مرحباً، أود الاستفسار عن مشروع لندن هومز'
    : 'Hello, I want to inquire about London Homes project';

  return (
    <div className={cn(
      'fixed bottom-6 z-50 flex flex-col gap-3',
      isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
    )}>
      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition-all duration-300 shadow-lg backdrop-blur-sm"
        title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
      >
        <Globe size={16} />
      </motion.button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition-all duration-300 shadow-lg"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <div className="relative">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
              className={cn(
                'absolute bottom-1/2 translate-y-1/2 whitespace-nowrap',
                isRTL ? 'right-14' : 'left-14'
              )}
            >
              <div className={cn(
                'bg-emerald-900/90 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-3 py-2 text-emerald-300 text-xs shadow-xl',
                isRTL ? 'font-cairo' : ''
              )}>
                {lang === 'ar' ? 'تواصل معنا الآن!' : 'Chat with us now!'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5, stiffness: 200 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative"
        >
          {/* Ping animation */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
          <MessageCircle size={24} className="text-white relative z-10" fill="white" />
        </motion.a>
      </div>
    </div>
  );
}

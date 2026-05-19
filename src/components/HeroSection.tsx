import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import CountUp from 'react-countup';
export default function HeroSection() {
  const { t, isRTL } = useLang();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector('#about');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-110"
        style={{
         backgroundImage: "url('/images/hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Multi-layered Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.6)_100%)]" />

      {/* Gold shimmer lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm text-gold text-xs tracking-widest uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className={cn(isRTL ? 'font-cairo' : '')}>{t.hero.badge}</span>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-4"
        >
          {isRTL ? (
  <>
    <div className="flex flex-col items-center">
      <h1 className="font-cairo text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight whitespace-nowrap">
        لندن هومز 2
      </h1>

      <p className="font-playfair text-lg sm:text-2xl text-gold italic mt-3 tracking-[6px]">
        London Homes 2
      </p>
    </div>
  </>
) : (
  <>
    <div className="flex flex-col items-center">
      <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight whitespace-nowrap">
        London Homes 2
      </h1>

      <p className="font-cairo text-lg sm:text-2xl text-gold mt-3 tracking-[4px]">
        لندن هومز 2
      </p>
    </div>
  </>
)}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <MapPin size={14} className="text-gold" />
          <span className={cn('text-white/60 text-sm tracking-wide', isRTL ? 'font-cairo' : '')}>
            {t.hero.subtitle}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={cn(
            'text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed',
            isRTL ? 'font-cairo' : 'font-cormorant'
          )}
        >
          {t.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => {
              const el = document.querySelector('#contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201, 168, 76, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            className={cn(
  'px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-base tracking-wide border border-[#E5C158] hover:bg-[#e0bb45] transition-all duration-300 shadow-xl',
  isRTL ? 'font-cairo' : ''
)}
          >
            {t.hero.ctaPrimary}
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.querySelector('#units');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(201,168,76,0.8)' }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base backdrop-blur-sm hover:bg-white/10 transition-all duration-300',
              isRTL ? 'font-cairo' : ''
            )}
          >
            {t.hero.ctaSecondary}
          </motion.button>
        </motion.div>

       {/* Floating Stats */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.4 }}
  className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-12"
>
  {[
    { label: isRTL ? 'مبان' : 'Buildings', value: '5' },
    { label: isRTL ? 'وحدة سكنية' : 'Units', value: '15' },
    { label: isRTL ? 'طوابق' : 'Floors', value: '3' },
    { label: isRTL ? 'غرف' : 'Bedrooms', value: '3' },
  ].map((stat) => (
    <div key={stat.label} className="text-center group">
      
      <div className="text-4xl sm:text-5xl font-bold text-gold font-playfair group-hover:scale-110 transition-transform">
        <CountUp
          end={Number(stat.value)}
          duration={3}
          separator=","
        />
      </div>

      <div className={cn('text-white/40 text-base mt-1', isRTL ? 'font-cairo' : '')}>
        {stat.label}
      </div>

    </div>
  ))}
</motion.div>
</div>

{/* Scroll Down */}
<motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors group"
      >
        <span className={cn('text-xs tracking-widest uppercase', isRTL ? 'font-cairo' : '')}>
          {t.hero.scrollDown}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}

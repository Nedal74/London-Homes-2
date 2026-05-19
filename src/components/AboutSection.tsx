import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Award } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';

export default function AboutSection() {
  const { t, isRTL } = useLang();
  const { ref, inView } = useInView(0.15);

  const cards = [
    {
      icon: Building2,
      label: t.about.developerName,
      sublabel: t.about.developer,
      color: 'from-gold/20 to-amber-900/10',
    },
    {
      icon: Users,
      label: t.about.marketingName,
      sublabel: t.about.marketing,
      color: 'from-emerald-800/20 to-emerald-900/10',
    },
    {
      icon: MapPin,
      label: t.about.locationName,
      sublabel: t.about.location,
      color: 'from-blue-800/20 to-blue-900/10',
    },
    {
      icon: Award,
      label: isRTL ? 'تصميم أوروبي فاخر' : 'Luxury European Design',
      sublabel: isRTL ? 'المعمار' : 'Architecture',
      color: 'from-purple-800/20 to-purple-900/10',
    },
  ];

  const stats = [
    { value: '5', label: t.about.buildingsLabel },
    { value: '15', label: t.about.unitsLabel },
    { value: '3', label: t.about.floorsLabel },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-[url('/images/about.jpg')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase',
              isRTL ? 'font-cairo' : ''
            )}>
              <span className="w-1 h-1 rounded-full bg-gold" />
              {t.about.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className={cn(
              'text-center text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}
          >
            {isRTL ? (
              <>حيث يلتقي <span className="text-gold">الرقي</span> بالأصالة</>
            ) : (
              <>Where <span className="text-gold italic">Elegance</span> Meets Excellence</>
            )}
          </motion.h2>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-12">
            {/* Left - Image & Stats */}
            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/aboutus.jpg"
                  alt="London Homes Building"
                  className="w-full h-80 lg:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Overlay Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="text-center bg-black/60 backdrop-blur-md rounded-xl p-3 border border-gold/20"
                      >
                        <div className="text-xl font-bold text-gold font-playfair">{s.value}</div>
                        <div className={cn('text-white/60 text-xs mt-0.5', isRTL ? 'font-cairo' : '')}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/60 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/60 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold/60 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/60 rounded-br-lg" />
              </div>
            </motion.div>

            {/* Right - Text */}
            <motion.div variants={fadeUp} className="space-y-6">
              <p className={cn(
                'text-white/70 text-lg leading-relaxed',
                isRTL ? 'font-cairo text-right' : 'font-cormorant text-left'
              )}>
                {t.about.description1}
              </p>
              <p className={cn(
                'text-white/50 text-base leading-relaxed',
                isRTL ? 'font-cairo text-right' : 'font-cormorant text-left'
              )}>
                {t.about.description2}
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <div className="flex-1 h-px bg-gradient-to-l from-gold/40 to-transparent" />
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                {cards.map((card) => (
                  <motion.div
                    key={card.sublabel}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(201,168,76,0.4)' }}
                    className={cn(
                      'relative p-4 rounded-xl border border-white/10 bg-gradient-to-br overflow-hidden cursor-default transition-all duration-300',
                      card.color
                    )}
                  >
                    <card.icon size={20} className="text-gold mb-2 opacity-80" />
                    <div className={cn('text-white font-semibold text-sm leading-snug', isRTL ? 'font-cairo' : '')}>
                      {card.label}
                    </div>
                    <div className={cn('text-white/40 text-xs mt-0.5', isRTL ? 'font-cairo' : '')}>
                      {card.sublabel}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href={`https://wa.me/966556278284?text=${encodeURIComponent(isRTL ? 'مرحباً، أود معرفة المزيد عن لندن هومز' : 'Hello, I would like to know more about London Homes')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all duration-300 text-sm font-medium',
                  isRTL ? 'font-cairo' : ''
                )}
              >
                {isRTL ? 'تواصل معنا عبر واتساب' : 'Contact Us on WhatsApp'}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

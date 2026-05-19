import { motion } from 'framer-motion';
import { MapPin, Navigation, School, ShoppingBag, Heart, Building2, TreePine, Route } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/MBw7YZc6shRmUFnQ8';
const EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.8!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwNDgnMDAuMCJF!5e0!3m2!1sen!2ssa!4v1234567890';

export default function LocationSection() {
  const { t, isRTL } = useLang();
  const { ref, inView } = useInView(0.1);

  const nearbyFeatures = [
  {
    icon: School,
    labelAr: 'جامعة الأميرة نورة',
    labelEn: 'Princess Nourah University',
    distance: '18 دقيقة'
  },
  {
    icon: ShoppingBag,
    labelAr: 'واجهة روشن والمراكز التجارية',
    labelEn: 'Roshn Front & Shopping Centers',
    distance: '10-15 دقيقة'
  },
  {
    icon: Heart,
    labelAr: 'مستشفيات ومراكز طبية',
    labelEn: 'Hospitals & Medical Centers',
    distance: '5-10 دقائق'
  },
  {
    icon: Building2,
    labelAr: 'مطار الملك خالد الدولي',
    labelEn: 'King Khalid International Airport',
    distance: '12 دقيقة'
  },
  {
    icon: TreePine,
    labelAr: 'حدائق ومرافق ترفيهية',
    labelEn: 'Parks & Recreation',
    distance: '5-8 دقائق'
  },
  {
    icon: Route,
    labelAr: 'طريق الدمام',
    labelEn: 'Dammam Road',
    distance: '3 دقائق'
  },
];

  return (
    <section id="location" className="relative py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase mb-4',
              isRTL ? 'font-cairo' : ''
            )}>
              <span className="w-1 h-1 rounded-full bg-gold" />
              {t.location.badge}
            </span>
            <h2 className={cn(
              'text-3xl sm:text-5xl font-bold text-white mb-3',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}>
              {t.location.title}
            </h2>
            <p className={cn('text-white/40 text-sm', isRTL ? 'font-cairo' : '')}>
              {t.location.subtitle}
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Info Panel */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              {/* Address Card */}
              <div className="p-5 rounded-2xl border border-gold/20 bg-gold/5">
                <div className={cn('flex items-start gap-3', isRTL ? 'flex-row-reverse' : '')}>
                  <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className={cn('text-white font-semibold text-sm mb-1', isRTL ? 'font-cairo text-right' : '')}>
                      {isRTL ? 'العنوان' : 'Address'}
                    </div>
                    <div className={cn('text-white/60 text-sm leading-relaxed', isRTL ? 'font-cairo text-right' : '')}>
                      {t.location.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions */}
              <motion.a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-2 justify-center w-full py-3 rounded-xl bg-gold text-black font-bold text-sm transition-all duration-300 hover:bg-gold/90 shadow-lg shadow-gold/20',
                  isRTL ? 'font-cairo flex-row-reverse' : ''
                )}
              >
                <Navigation size={15} />
                {t.location.getDirections}
              </motion.a>

              {/* Nearby Features */}
              <div>
                <div className={cn('text-white/40 text-xs uppercase tracking-widest mb-3', isRTL ? 'font-cairo text-right' : '')}>
                  {isRTL ? 'المرافق القريبة' : 'Nearby Amenities'}
                </div>
                <div className="space-y-2.5">
                  {nearbyFeatures.map((feat) => (
                    <motion.div
                      key={feat.labelEn}
                      whileHover={{ x: isRTL ? -4 : 4 }}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/3 hover:border-gold/20 transition-all duration-200',
                        isRTL ? 'flex-row-reverse' : ''
                      )}
                    >
                      <div className={cn('flex items-center gap-2.5', isRTL ? 'flex-row-reverse' : '')}>
                        <feat.icon size={15} className="text-gold/70" />
                        <span className={cn('text-white/70 text-sm', isRTL ? 'font-cairo' : '')}>
                          {isRTL ? feat.labelAr : feat.labelEn}
                        </span>
                      </div>
                      <span className="text-gold/60 text-xs font-medium">{feat.distance}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-3 relative h-[520px] rounded-3xl overflow-hidden border border-gold/20 group shadow-2xl"
            >
              <div className="absolute inset-0 border-2 border-gold/20 rounded-2xl z-10 pointer-events-none group-hover:border-gold/40 transition-colors duration-500" />

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-gold/60 z-20 rounded-tl" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-gold/60 z-20 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-gold/60 z-20 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-gold/60 z-20 rounded-br" />

              <iframe
  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4294.647505070225!2d46.79325000000001!3d24.846249999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDUwJzQ2LjUiTiA0NsKwNDcnMzUuNyJF!5e1!3m2!1sen!2ssa!4v1778762060450!5m2!1sen!2ssa"
  className="w-full h-full border-0"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

              {/* Map Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-gold/20',
                  isRTL ? 'font-cairo float-right' : 'float-left'
                )}>
                  <MapPin size={14} className="text-gold" />
                  <span className="text-white text-xs font-medium">
                    {isRTL ? 'حي الرمال – مخطط البابطين، الرياض' : 'Al-Ramal District, Riyadh'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

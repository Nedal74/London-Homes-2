import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations';
import { GALLERY_IMAGES } from '../lib/mockData';

type Category = 'all' | 'exterior' | 'interior' | 'amenities';

export default function GallerySection() {
  const { t, isRTL } = useLang();
  const { ref, inView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
  { value: 'all', label: 'الكل', labelEn: 'All' },
];

  const filtered = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase mb-4',
              isRTL ? 'font-cairo' : ''
            )}>
              <span className="w-1 h-1 rounded-full bg-gold" />
              {t.gallery.badge}
            </span>
            <h2 className={cn(
              'text-3xl sm:text-5xl font-bold text-white mb-3',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}>
              {t.gallery.title}
            </h2>
            <p className={cn('text-white/40 text-sm', isRTL ? 'font-cairo' : '')}>
              {t.gallery.subtitle}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={fadeUp} className="flex justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                  isRTL ? 'font-cairo' : '',
                  activeCategory === cat.value
                    ? 'bg-gold text-black border-gold'
                    : 'border-white/15 text-white/50 hover:border-gold/40 hover:text-gold'
                )}
              >
                {isRTL ? cat.label : cat.labelEn}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(idx)}
                  className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-gold/30 transition-all duration-300"
                  style={{ marginBottom: '1rem' }}
                >
                  <img
                    src={img.src}
                    alt={isRTL ? img.altAr : img.alt}
                    className={cn(
                      'w-full object-cover transition-transform duration-700 group-hover:scale-105',
                      idx % 3 === 0 ? 'h-64' : idx % 3 === 1 ? 'h-48' : 'h-56'
                    )}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                      <ZoomIn size={16} className="text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className={cn('text-white text-xs font-medium', isRTL ? 'font-cairo text-right' : '')}>
                      {isRTL ? img.altAr : img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filtered[lightboxIndex].src}
              alt={isRTL ? filtered[lightboxIndex].altAr : filtered[lightboxIndex].alt}
              className="max-w-5xl w-full max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

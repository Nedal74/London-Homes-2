import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';
import type { Building } from '../types';

const BUILDINGS: Building[] = ['A', 'B', 'C', 'D', 'E'];

const buildingInfo: Record<Building, { nameAr: string; nameEn: string; floors: number; units: string; desc: string; descEn: string }> = {
  A: {
    nameAr: 'المبنى أ',
    nameEn: 'Building A',
    floors: 3,
    units: '+250',
    desc: 'المبنى الرئيسي بإطلالة على الحديقة المركزية',
    descEn: 'Main building with central garden view',
  },
  B: {
    nameAr: 'المبنى ب',
    nameEn: 'Building B',
    floors: 3,
    units: '+250',
    desc: 'وحدات فاخرة مع شرفات واسعة',
    descEn: 'Luxury units with spacious balconies',
  },
  C: {
    nameAr: 'المبنى ج',
    nameEn: 'Building C',
    floors: 3,
    units: '+250',
    desc: 'موقع مميز بإطلالة بانورامية',
    descEn: 'Premium location with panoramic views',
  },
  D: {
    nameAr: 'المبنى د',
    nameEn: 'Building D',
    floors: 3,
    units: '+250',
    desc: 'قريب من المرافق والمداخل الرئيسية',
    descEn: 'Close to amenities and main entrances',
  },
  E: {
    nameAr: 'المبنى هـ',
    nameEn: 'Building E',
    floors: 3,
    units: '+250',
    desc: 'الموقع الأهدأ في المجمع السكني',
    descEn: 'The quietest location in the complex',
  },
};

interface BuildingsExplorerProps {
  selectedBuilding: Building | 'all';
  onBuildingSelect: (building: Building | 'all') => void;
}

export default function BuildingsExplorer({ selectedBuilding, onBuildingSelect }: BuildingsExplorerProps) {
  const { isRTL } = useLang();
  const { ref, inView } = useInView(0.2);

  return (
    <section id="buildings" className="relative py-16 lg:py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.04)_0%,_transparent_60%)]" />

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
              {isRTL ? 'استكشف المباني' : 'Explore Buildings'}
            </span>
            <h2 className={cn(
              'text-2xl sm:text-4xl font-bold text-white',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}>
              {isRTL ? 'اختر مبناك' : 'Choose Your Building'}
            </h2>
          </motion.div>

          {/* Building Selector */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
            {/* All Buildings Button */}
            <motion.button
              onClick={() => onBuildingSelect('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border',
                isRTL ? 'font-cairo' : '',
                selectedBuilding === 'all'
                  ? 'bg-gold text-black border-gold shadow-lg shadow-gold/30'
                  : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-gold'
              )}
            >
              {isRTL ? 'جميع المباني' : 'All Buildings'}
            </motion.button>

            {BUILDINGS.map((b) => (
              <motion.button
                key={b}
                onClick={() => onBuildingSelect(b)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 border relative group',
                  selectedBuilding === b
                    ? 'bg-gold text-black border-gold shadow-lg shadow-gold/30'
                    : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-gold bg-white/5'
                )}
              >
                {b}
                {/* Tooltip */}
                <div className={cn(
                  'absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10',
                )}>
                  <div className="bg-[#1a1a1a] border border-gold/20 rounded-lg px-3 py-1.5 text-xs text-white/80 whitespace-nowrap">
                    {isRTL ? buildingInfo[b].nameAr : buildingInfo[b].nameEn}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Building Info Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {BUILDINGS.map((b) => {
              const info = buildingInfo[b];
              const isSelected = selectedBuilding === b || selectedBuilding === 'all';
              return (
                <motion.button
                  key={b}
                  variants={fadeUp}
                  onClick={() => onBuildingSelect(b)}
                  whileHover={{ y: -4 }}
                  className={cn(
                    'relative p-4 rounded-xl border text-left transition-all duration-300 group',
                    isRTL ? 'text-right' : '',
                    isSelected && selectedBuilding === b
                      ? 'border-gold/50 bg-gold/10'
                      : selectedBuilding === 'all'
                      ? 'border-white/10 bg-white/3 hover:border-gold/30'
                      : 'border-white/5 bg-white/2 opacity-40 hover:opacity-70 hover:border-white/20'
                  )}
                >
                  {/* Building letter */}
                  <div
  className={cn(
    'text-6xl font-bold font-playfair mb-3 tracking-widest transition-all duration-500 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,215,0,0.45)]',
    isSelected && selectedBuilding === b
      ? 'scale-110'
      : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'
  )}
>
  {b}
</div>
                  <div className={cn('text-white text-xs font-semibold mb-1', isRTL ? 'font-cairo' : '')}>
                    {isRTL ? info.nameAr : info.nameEn}
                  </div>
                  <div className={cn('text-white/40 text-xs leading-snug', isRTL ? 'font-cairo' : '')}>
                    {isRTL ? info.desc : info.descEn}
                  </div>
                  <div className="flex gap-3 mt-3">
                    <span className="text-xs text-white/30">
                      <span className="text-gold/70">{info.floors}</span>{' '}
                      {isRTL ? 'أدوار' : 'fl'}
                    </span>
                    <span className="text-xs text-white/30">
                      <span className="text-gold/70">{info.units}</span>{' '}
                      {isRTL ? 'م²' : 'un'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

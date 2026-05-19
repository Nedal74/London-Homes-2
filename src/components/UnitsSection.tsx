import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, RefreshCw, AlertCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';
import UnitCard from './UnitCard';
import BuildingsExplorer from './BuildingsExplorer';
import type { Unit, UnitStatus, Building } from '../types';

interface UnitsSectionProps {
  units: Unit[];
  loading: boolean;
  error: string | null;
  onRefetch: () => void;
  onInquire: (unit: Unit) => void;
}

const ITEMS_PER_PAGE = 12;

export default function UnitsSection({ units, loading, error, onRefetch, onInquire }: UnitsSectionProps) {
  const { t, isRTL } = useLang();
  const { ref, inView } = useInView(0.1);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<UnitStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'area' | 'floor'>('price');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...units];
    if (selectedBuilding !== 'all') result = result.filter((u) => u.building === selectedBuilding);
    if (selectedStatus !== 'all') result = result.filter((u) => u.status === selectedStatus);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((u) =>
        u.id.toLowerCase().includes(q) ||
        u.building.toLowerCase().includes(q) ||
        String(u.area).includes(q) ||
        String(u.floor).includes(q) ||
        String(u.bedrooms).includes(q) ||
        u.features.some((f) => f.toLowerCase().includes(q))
      );
    }
    result.sort((a, b) => {
      const v = sortDir === 'asc' ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * v;
    });
    return result;
  }, [units, selectedBuilding, selectedStatus, searchQuery, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);

  const handleBuildingSelect = useCallback((b: Building | 'all') => {
    setSelectedBuilding(b);
    setPage(1);
  }, []);

  const handleLoadMore = () => setPage((p) => p + 1);

  const statuses: { value: UnitStatus | 'all'; label: string; labelEn: string }[] = [
    { value: 'all', label: 'الكل', labelEn: 'All' },
    { value: 'available', label: 'متاحة', labelEn: 'Available' },
    { value: 'reserved', label: 'محجوزة', labelEn: 'Reserved' },
    { value: 'sold', label: 'مباعة', labelEn: 'Sold' },
  ];

  const sortOptions: { value: typeof sortBy; label: string; labelEn: string }[] = [
    { value: 'price', label: 'السعر', labelEn: 'Price' },
    { value: 'area', label: 'المساحة', labelEn: 'Area' },
    { value: 'floor', label: 'الطابق', labelEn: 'Floor' },
  ];

  return (
    <>
      <BuildingsExplorer
        selectedBuilding={selectedBuilding}
        onBuildingSelect={handleBuildingSelect}
      />

      <section id="units" className="relative py-16 lg:py-24 bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.03)_0%,_transparent_70%)]" />

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
                {t.units.badge}
              </span>
              <h2 className={cn(
                'text-3xl sm:text-5xl font-bold text-white mb-3',
                isRTL ? 'font-cairo' : 'font-playfair'
              )}>
                {t.units.title}
              </h2>
              <p className={cn('text-white/40 text-sm', isRTL ? 'font-cairo' : '')}>
                {t.units.subtitle}
              </p>
            </motion.div>

            {/* Filters Bar */}
            <motion.div variants={fadeUp} className="space-y-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 text-white/30',
                    isRTL ? 'right-4' : 'left-4'
                  )}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  placeholder={t.units.searchPlaceholder}
                  className={cn(
                    'w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/8 transition-all duration-300',
                    isRTL ? 'font-cairo text-right pr-10 pl-4' : 'text-left pl-10 pr-4'
                  )}
                />
              </div>

              {/* Filter Row */}
              <div className={cn('flex flex-wrap gap-3 items-center', isRTL ? 'flex-row-reverse' : '')}>
                {/* Status Filter */}
                <div className={cn('flex items-center gap-2', isRTL ? 'flex-row-reverse' : '')}>
                  <SlidersHorizontal size={14} className="text-white/40" />
                  <div className="flex gap-1.5">
                    {statuses.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => { setSelectedStatus(s.value); setPage(1); }}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                          isRTL ? 'font-cairo' : '',
                          selectedStatus === s.value
                            ? 'bg-gold text-black border-gold'
                            : 'border-white/15 text-white/50 hover:border-gold/40 hover:text-gold'
                        )}
                      >
                        {isRTL ? s.label : s.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 ms-auto">
                  {sortOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => {
                        if (sortBy === o.value) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
                        else { setSortBy(o.value); setSortDir('asc'); }
                        setPage(1);
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border flex items-center gap-1',
                        isRTL ? 'font-cairo' : '',
                        sortBy === o.value
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'border-white/10 text-white/40 hover:text-white/70'
                      )}
                    >
                      {isRTL ? o.label : o.labelEn}
                      {sortBy === o.value && (
                        <span className="text-gold">{sortDir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ))}

                  <button
                    onClick={onRefetch}
                    className="p-2 rounded-full border border-white/10 text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-200"
                    title="Refresh"
                  >
                    <RefreshCw size={13} />
                  </button>
                </div>
              </div>

              {/* Results count */}
              <div className={cn('text-xs text-white/30', isRTL ? 'font-cairo text-right' : '')}>
                {isRTL
                  ? `${filtered.length} وحدة ${selectedBuilding !== 'all' ? `في المبنى ${selectedBuilding}` : ''}`
                  : `${filtered.length} units ${selectedBuilding !== 'all' ? `in Building ${selectedBuilding}` : ''}`
                }
              </div>
            </motion.div>

            {/* Loading */}
            {loading && (
              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
                ))}
              </motion.div>
            )}

            {/* Error */}
            {error && !loading && (
              <motion.div variants={fadeUp} className="text-center py-20">
                <AlertCircle size={40} className="text-rose-400 mx-auto mb-4" />
                <p className={cn('text-white/50 mb-4', isRTL ? 'font-cairo' : '')}>{t.units.error}</p>
                <button
                  onClick={onRefetch}
                  className={cn(
                    'px-6 py-2.5 rounded-full bg-gold text-black text-sm font-semibold hover:bg-gold/90 transition-colors',
                    isRTL ? 'font-cairo' : ''
                  )}
                >
                  {t.units.retry}
                </button>
              </motion.div>
            )}

            {/* Units Grid */}
            {!loading && !error && (
              <>
                {paginated.length === 0 ? (
                  <motion.div variants={fadeUp} className="text-center py-20">
                    <div className="text-5xl mb-4">🏢</div>
                    <p className={cn('text-white/50 text-lg mb-2', isRTL ? 'font-cairo' : '')}>
                      {t.units.noUnits}
                    </p>
                    <p className={cn('text-white/30 text-sm', isRTL ? 'font-cairo' : '')}>
                      {t.units.noUnitsDesc}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedBuilding}-${selectedStatus}-${searchQuery}`}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {paginated.map((unit) => (
                          <UnitCard key={unit.id} unit={unit} onInquire={onInquire} />
                        ))}
                      </motion.div>
                    </AnimatePresence>

                    {/* Load More */}
                    {page < totalPages && (
                      <motion.div variants={fadeUp} className="text-center mt-8">
                        <motion.button
                          onClick={handleLoadMore}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            'px-8 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300 text-sm font-medium',
                            isRTL ? 'font-cairo' : ''
                          )}
                        >
                          {isRTL ? `عرض المزيد (${filtered.length - paginated.length})` : `Load More (${filtered.length - paginated.length})`}
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

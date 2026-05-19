import { motion } from 'framer-motion';
import { TrendingUp, Home, Clock, BarChart3 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';
import { cn, formatNumber, formatPrice } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';
import type { Stats } from '../types';

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  color: string;
  iconColor: string;
  format?: 'number' | 'price';
  lang: 'ar' | 'en';
  start: boolean;
}

function StatCard({ icon: Icon, value, label, color, iconColor, format = 'number', lang, start }: StatCardProps) {
  const count = useCounter(value, 2000, start);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        'relative p-6 lg:p-8 rounded-2xl border border-white/10 bg-gradient-to-br overflow-hidden group cursor-default transition-all duration-300',
        color
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/5 to-transparent" />

      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', iconColor)}>
        <Icon size={22} className="text-current" />
      </div>

      {/* Value */}
      <div className={cn(
        'text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums font-playfair',
      )}>
        {format === 'price'
          ? formatPrice(count, lang).replace(/[^\d,٠-٩]/g, '').replace(/[,]/g, ',')
          : formatNumber(count, lang)}
        {format === 'price' && (
          <span className={cn('text-sm text-gold ms-1', lang === 'ar' ? 'font-cairo' : '')}>
            {lang === 'ar' ? 'ريال' : 'SAR'}
          </span>
        )}
      </div>

      {/* Label */}
      <div className={cn('text-white/50 text-sm', lang === 'ar' ? 'font-cairo' : '')}>
        {label}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const { t, lang, isRTL } = useLang();
  const { ref, inView } = useInView(0.2);

  const cards = [
    {
      icon: Home,
      value: stats.available,
      label: t.stats.available,
      color: 'from-emerald-900/40 to-emerald-950/20',
      iconColor: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      icon: Clock,
      value: stats.reserved,
      label: t.stats.reserved,
      color: 'from-amber-900/40 to-amber-950/20',
      iconColor: 'bg-amber-500/20 text-amber-400',
    },
    {
      icon: BarChart3,
      value: stats.sold,
      label: t.stats.sold,
      color: 'from-rose-900/40 to-rose-950/20',
      iconColor: 'bg-rose-500/20 text-rose-400',
    },
    {
      icon: TrendingUp,
      value: stats.avgPrice,
      label: t.stats.avgPrice,
      color: 'from-gold/10 to-amber-950/20',
      iconColor: 'bg-gold/20 text-gold',
      format: 'price' as const,
    },
  ];

  const now = new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section id="stats" className="relative py-20 lg:py-28 bg-[#080808] overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />

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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.stats.badge}
            </span>

            <h2 className={cn(
              'text-3xl sm:text-5xl font-bold text-white mb-3',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}>
              {t.stats.title}
            </h2>
            <p className={cn('text-white/40 text-sm', isRTL ? 'font-cairo' : '')}>
              {t.stats.subtitle}
            </p>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className={cn('text-emerald-400 text-xs', isRTL ? 'font-cairo' : '')}>
                {t.stats.lastUpdate}: {now}
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {cards.map((card) => (
              <StatCard
                key={card.label}
                {...card}
                lang={lang}
                start={inView}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div variants={fadeUp} className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
            <div className={cn('flex justify-between items-center mb-4 text-xs text-white/50', isRTL ? 'font-cairo flex-row-reverse' : '')}>
              <span>{t.stats.total}: {formatNumber(stats.total, lang)}</span>
              <span>
                {stats.total > 0 ? Math.round((stats.available / stats.total) * 100) : 0}%{' '}
                {isRTL ? 'متاح' : 'Available'}
              </span>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              {stats.available > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(stats.available / stats.total) * 100}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-emerald-500 rounded-s-full"
                />
              )}
              {stats.reserved > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(stats.reserved / stats.total) * 100}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-amber-500"
                />
              )}
              {stats.sold > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(stats.sold / stats.total) * 100}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-rose-500 rounded-e-full"
                />
              )}
            </div>
            <div className={cn('flex gap-4 mt-3 text-xs', isRTL ? 'font-cairo justify-end' : 'justify-start')}>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-sm bg-emerald-500" />
                {isRTL ? 'متاح' : 'Available'}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-sm bg-amber-500" />
                {isRTL ? 'محجوز' : 'Reserved'}
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-sm bg-rose-500" />
                {isRTL ? 'مباع' : 'Sold'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

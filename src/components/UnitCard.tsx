import { motion } from 'framer-motion';
import { BedDouble, Bath, Maximize2, Building, MessageCircle, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn, formatPrice, getStatusColor, getStatusDot } from '../lib/utils';
import type { Unit } from '../types';

interface UnitCardProps {
  unit: Unit;
  onInquire: (unit: Unit) => void;
}

export default function UnitCard({ unit, onInquire }: UnitCardProps) {
  const { t, lang, isRTL } = useLang();

  const statusText = {
    available: t.units.status.available,
    reserved: t.units.status.reserved,
    sold: t.units.status.sold,
  }[unit.status];

  const featureLabels: Record<string, string> = {
    'تكييف مركزي': lang === 'en' ? 'Central A/C' : 'تكييف مركزي',
    'إطلالة على الحديقة': lang === 'en' ? 'Garden View' : 'إطلالة على الحديقة',
    'إطلالة على الشارع': lang === 'en' ? 'Street View' : 'إطلالة على الشارع',
    'موقف خاص': lang === 'en' ? 'Private Parking' : 'موقف خاص',
    'خزانة ملابس': lang === 'en' ? 'Wardrobe' : 'خزانة ملابس',
    'غرفة خادمة': lang === 'en' ? "Maid's Room" : 'غرفة خادمة',
    'شرفة': lang === 'en' ? 'Balcony' : 'شرفة',
    'مطبخ مجهز': lang === 'en' ? 'Equipped Kitchen' : 'مطبخ مجهز',
    'أمن 24 ساعة': lang === 'en' ? '24/7 Security' : 'أمن 24 ساعة',
    'مصعد خاص': lang === 'en' ? 'Private Elevator' : 'مصعد خاص',
    'نظام سمارت هوم': lang === 'en' ? 'Smart Home' : 'نظام سمارت هوم',
    'حمام سباحة': lang === 'en' ? 'Swimming Pool' : 'حمام سباحة',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative rounded-2xl border bg-gradient-to-b from-white/5 to-white/2 overflow-hidden group transition-all duration-300',
        unit.status === 'sold'
          ? 'border-rose-500/20 opacity-70'
          : unit.status === 'reserved'
          ? 'border-amber-500/20'
          : 'border-gold/20 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10'
      )}
    >
      {/* Status Banner */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-1',
        unit.status === 'available' ? 'bg-emerald-500' :
        unit.status === 'reserved' ? 'bg-amber-500' : 'bg-rose-500'
      )} />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />

      <div className="p-5 pt-6">
        {/* Header */}
        <div className={cn('flex justify-between items-start mb-4', isRTL ? 'flex-row-reverse' : '')}>
          <div>
            <div className={cn('text-white font-bold text-base', isRTL ? 'font-cairo' : '')}>
              {isRTL ? `${t.units.building} ${unit.building}` : `Building ${unit.building}`}
              {' · '}
              {isRTL ? `${unit.floor}` : `${unit.floor}`}
            </div>
            
          </div>
          <span className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
            isRTL ? 'font-cairo' : '',
            getStatusColor(unit.status)
          )}>
            <span className={cn('w-1.5 h-1.5 rounded-full', getStatusDot(unit.status))} />
            {statusText}
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
            <BedDouble size={15} className="text-gold mb-1" />
            <span className="text-white font-semibold text-sm">{unit.bedrooms}</span>
            <span className={cn('text-white/40 text-xs', isRTL ? 'font-cairo' : '')}>
              {isRTL ? 'غرف' : 'Beds'}
            </span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
            <Bath size={15} className="text-gold mb-1" />
            <span className="text-white font-semibold text-sm">{unit.bathrooms}</span>
            <span className={cn('text-white/40 text-xs', isRTL ? 'font-cairo' : '')}>
              {isRTL ? 'حمامات' : 'Baths'}
            </span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
            <Maximize2 size={15} className="text-gold mb-1" />
            <span className="text-white font-semibold text-sm">{unit.area}</span>
            <span className={cn('text-white/40 text-xs', isRTL ? 'font-cairo' : '')}>
              {t.units.sqm}
            </span>
          </div>
        </div>

        {/* Features */}
        {unit.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {unit.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50',
                  isRTL ? 'font-cairo' : ''
                )}
              >
                <CheckCircle size={9} className="text-gold/60" />
                {featureLabels[f] || f}
              </span>
            ))}
            {unit.features.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30">
                +{unit.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className={cn('flex items-end justify-between pt-3 border-t border-white/10', isRTL ? 'flex-row-reverse' : '')}>
          <div>
            <div className={cn('text-white/40 text-xs mb-0.5', isRTL ? 'font-cairo' : '')}>
              {t.units.price}
            </div>
            <div className={cn(
              'text-gold font-bold text-base font-playfair',
              unit.status === 'sold' ? 'line-through text-white/30' : ''
            )}>
              {formatPrice(unit.price, lang)}
            </div>
          </div>

          {unit.status !== 'sold' && (
            <motion.button
              onClick={() => onInquire(unit)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300',
                isRTL ? 'font-cairo' : '',
                unit.status === 'available'
                  ? 'bg-gold text-black hover:bg-gold/90 shadow-md shadow-gold/20'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
              )}
            >
              <MessageCircle size={12} />
              {isRTL ? 'استفسر' : 'Inquire'}
            </motion.button>
          )}

          {unit.status === 'sold' && (
            <div className={cn(
              'flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-rose-400',
              isRTL ? 'font-cairo' : ''
            )}>
              <Building size={12} />
              {isRTL ? 'مباعة' : 'Sold'}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

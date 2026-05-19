import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, BedDouble, Bath, Maximize2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn, buildWhatsAppUrl, generateWhatsAppMessage, formatPrice } from '../lib/utils';
import { submitLead } from '../services/sheetsService';
import type { Unit, LeadFormData } from '../types';

const WHATSAPP_NUMBER = '+966556278284';

interface InquiryModalProps {
  unit: Unit | null;
  onClose: () => void;
}

export default function InquiryModal({ unit, onClose }: InquiryModalProps) {
  const { t, lang, isRTL } = useLang();
  const [formState, setFormState] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!unit) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const lead: LeadFormData = {
      name: formState.name,
      phone: formState.phone,
      selectedUnit: `${isRTL ? 'مبنى' : 'Building'} ${unit.building} - ${isRTL ? 'طابق' : 'Floor'} ${unit.floor} - ID: ${unit.id}`,
      timestamp: new Date().toISOString(),
    };

    await submitLead(lead);
    setStatus('success');

    const msg = generateWhatsAppMessage({
      name: formState.name,
      phone: formState.phone,
      selectedUnit: lead.selectedUnit,
    }, lang);
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, msg);
    window.open(url, '_blank');

    setTimeout(() => {
      onClose();
      setStatus('idle');
      setFormState({ name: '', phone: '' });
    }, 1500);
  };

  const inputClass = cn(
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-gold/60 transition-all duration-300',
    isRTL ? 'font-cairo text-right' : 'text-left'
  );

  return (
    <AnimatePresence>
      {unit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Gold top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

            {/* Header */}
            <div className="p-5 pb-0 flex justify-between items-start">
              <div>
                <h3 className={cn('text-white font-bold text-lg', isRTL ? 'font-cairo' : 'font-playfair')}>
                  {isRTL ? 'استفسر عن الوحدة' : 'Unit Inquiry'}
                </h3>
                <p className={cn('text-white/40 text-xs mt-0.5', isRTL ? 'font-cairo' : '')}>
                  {isRTL ? 'سيتواصل معك فريقنا فوراً' : 'Our team will contact you immediately'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Unit Info */}
            <div className="p-5">
              <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 mb-5">
                <div className={cn('flex justify-between items-start mb-3', isRTL ? 'flex-row-reverse' : '')}>
                  <span className={cn('text-white font-semibold text-sm', isRTL ? 'font-cairo' : '')}>
                    {isRTL ? `مبنى ${unit.building} - الطابق ${unit.floor}` : `Building ${unit.building} - Floor ${unit.floor}`}
                  </span>
                  <span className={cn('text-gold font-bold text-sm font-playfair')}>
                    {formatPrice(unit.price, lang)}
                  </span>
                </div>
                <div className={cn('flex gap-4 text-xs text-white/50', isRTL ? 'flex-row-reverse font-cairo' : '')}>
                  <span className="flex items-center gap-1">
                    <BedDouble size={11} className="text-gold/60" />
                    {unit.bedrooms} {isRTL ? 'غرف' : 'Beds'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={11} className="text-gold/60" />
                    {unit.bathrooms} {isRTL ? 'حمامات' : 'Baths'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 size={11} className="text-gold/60" />
                    {unit.area} {t.units.sqm}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className={cn('block text-white/40 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
                    {t.contact.form.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t.contact.form.namePlaceholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={cn('block text-white/40 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
                    {t.contact.form.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formState.phone}
                    onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+966 5XX XXX XXXX"
                    className={inputClass}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(37,211,102,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-4',
                    isRTL ? 'font-cairo flex-row-reverse' : '',
                    status === 'success'
                      ? 'bg-emerald-600 text-white'
                      : status === 'submitting'
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500'
                  )}
                >
                  {status === 'success' ? (
                    <>{isRTL ? 'تم! جاري فتح واتساب...' : 'Done! Opening WhatsApp...'}</>
                  ) : status === 'submitting' ? (
                    <>{isRTL ? 'جاري الإرسال...' : 'Sending...'}</>
                  ) : (
                    <>
                      <MessageCircle size={15} />
                      {isRTL ? 'أرسل واتصل عبر واتساب' : 'Send & Open WhatsApp'}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

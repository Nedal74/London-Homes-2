import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Globe, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { cn, buildWhatsAppUrl, generateWhatsAppMessage } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/animations';
import { submitLead } from '../services/sheetsService';
import type { LeadFormData } from '../types';

const WHATSAPP_NUMBER = '+966556278284';

export default function ContactSection() {
  const { t, lang, isRTL } = useLang();
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    selectedUnit: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    setStatus('submitting');

    const lead: LeadFormData = {
      ...formState,
      timestamp: new Date().toISOString(),
    };

    try {
      await submitLead(lead);
      setStatus('success');

      // Open WhatsApp
      const msg = generateWhatsAppMessage(formState, lang);
      const url = buildWhatsAppUrl(WHATSAPP_NUMBER, msg);
      window.open(url, '_blank');

      // Reset after 3s
      setTimeout(() => {
        setFormState({ name: '', phone: '', selectedUnit: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClass = cn(
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-gold/60 focus:bg-white/8 transition-all duration-300',
    isRTL ? 'font-cairo text-right' : 'text-left'
  );

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase mb-4',
              isRTL ? 'font-cairo' : ''
            )}>
              <span className="w-1 h-1 rounded-full bg-gold" />
              {t.contact.badge}
            </span>
            <h2 className={cn(
              'text-3xl sm:text-5xl font-bold text-white mb-3',
              isRTL ? 'font-cairo' : 'font-playfair'
            )}>
              {t.contact.title}
            </h2>
            <p className={cn('text-white/40 text-sm', isRTL ? 'font-cairo' : '')}>
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left - Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              {/* WhatsApp CTA */}
              <motion.a
                href={buildWhatsAppUrl(WHATSAPP_NUMBER, lang === 'ar' ? 'مرحباً، أود الاستفسار عن مشروع لندن هومز' : 'Hello, I want to inquire about London Homes')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37, 211, 102, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-900/20 hover:bg-emerald-900/30 transition-all duration-300 group w-full',
                  isRTL ? 'flex-row-reverse' : ''
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                  <MessageCircle size={22} className="text-emerald-400" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className={cn('text-emerald-400 font-semibold text-sm', isRTL ? 'font-cairo' : '')}>
                    {t.contact.whatsapp}
                  </div>
                  <div className="text-white/50 text-xs mt-0.5 font-mono direction-ltr">
                    {WHATSAPP_NUMBER}
                  </div>
                </div>
              </motion.a>

              {/* Quick Info Cards */}
              <div className="space-y-3">
                {[
                  {
                    icon: Phone,
                    label: isRTL ? 'الهاتف' : 'Phone',
                    value: WHATSAPP_NUMBER,
                    href: `tel:${WHATSAPP_NUMBER}`,
                  },
                  {
                    icon: Globe,
                    label: isRTL ? 'الموقع الإلكتروني' : 'Website',
                    value: 'umam.sa',
                    href: 'https://umam.sa',
                  },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: isRTL ? -4 : 4 }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/3 hover:border-gold/20 transition-all duration-200 group',
                      isRTL ? 'flex-row-reverse' : ''
                    )}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <item.icon size={15} className="text-gold/70 group-hover:text-gold transition-colors" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className={cn('text-white/40 text-xs', isRTL ? 'font-cairo' : '')}>{item.label}</div>
                      <div className="text-white/80 text-sm font-medium">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Developer / Marketing */}
              <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-gold/5 to-transparent">
                <div className={cn('text-white/40 text-xs uppercase tracking-widest mb-3', isRTL ? 'font-cairo text-right' : '')}>
                  {isRTL ? 'معلومات المشروع' : 'Project Info'}
                </div>
                <div className="space-y-2">
                  <div className={cn('flex justify-between text-xs', isRTL ? 'flex-row-reverse font-cairo' : '')}>
                    <span className="text-white/40">{t.about.developer}:</span>
                    <span className="text-white/80">{t.about.developerName}</span>
                  </div>
                  <div className={cn('flex justify-between text-xs', isRTL ? 'flex-row-reverse font-cairo' : '')}>
                    <span className="text-white/40">{t.about.marketing}:</span>
                    <span className="text-white/80">{t.about.marketingName}</span>
                  </div>
                  <div className={cn('flex justify-between text-xs', isRTL ? 'flex-row-reverse font-cairo' : '')}>
                    <span className="text-white/40">{t.about.location}:</span>
                    <span className={cn('text-white/80', isRTL ? 'font-cairo' : '')}>{t.about.locationName}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="p-6 lg:p-8 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
                <h3 className={cn('text-white font-semibold text-lg mb-6', isRTL ? 'font-cairo text-right' : 'font-playfair')}>
                  {isRTL ? 'أرسل استفسارك' : 'Send Your Inquiry'}
                </h3>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn('flex items-center gap-3 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 mb-5', isRTL ? 'flex-row-reverse' : '')}
                  >
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                    <p className={cn('text-emerald-300 text-sm', isRTL ? 'font-cairo text-right' : '')}>
                      {t.contact.form.success}
                    </p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn('flex items-center gap-3 p-4 rounded-xl bg-rose-900/20 border border-rose-500/30 mb-5', isRTL ? 'flex-row-reverse' : '')}
                  >
                    <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />
                    <p className={cn('text-rose-300 text-sm', isRTL ? 'font-cairo text-right' : '')}>
                      {t.contact.form.error}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={cn('block text-white/50 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
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
                      <label className={cn('block text-white/50 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
                        {t.contact.form.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
                        placeholder={t.contact.form.phonePlaceholder}
                        className={cn(inputClass, 'direction-ltr')}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={cn('block text-white/50 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
                      {t.contact.form.unit}
                    </label>
                    <input
                      type="text"
                      value={formState.selectedUnit}
                      onChange={(e) => setFormState((p) => ({ ...p, selectedUnit: e.target.value }))}
                      placeholder={t.contact.form.unitPlaceholder}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={cn('block text-white/50 text-xs mb-1.5', isRTL ? 'font-cairo text-right' : '')}>
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      placeholder={t.contact.form.messagePlaceholder}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
  "w-full py-4 rounded-2xl bg-[#D4AF37] text-black font-bold text-lg shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] transition-all duration-300",
  isRTL ? 'font-cairo' : ''
)}
                  >
                    {status === 'submitting' ? (
                      <>{t.contact.form.submitting}</>
                    ) : (
                      <>
                        <Send size={15} />
                        {t.contact.form.submit}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

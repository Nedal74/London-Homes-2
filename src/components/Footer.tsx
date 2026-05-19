import { motion } from 'framer-motion';
import { MessageCircle, Globe, MapPin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const WHATSAPP_NUMBER = '+966556278284';

export default function Footer() {
  const { t, lang, isRTL } = useLang();

  const navItems = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.units, href: '#units' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.location, href: '#location' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060606] border-t border-white/5 overflow-hidden">
      {/* Gold shimmer top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className={cn('space-y-4', isRTL ? 'text-right' : 'text-left')}>
            <div>
              <h3 className={cn(
                'text-2xl font-bold text-white mb-1',
                isRTL ? 'font-cairo' : 'font-playfair'
              )}>
                {isRTL ? 'لندن هومز' : 'London Homes'}
              </h3>
              <p className={cn('text-gold/70 text-sm', isRTL ? 'font-cairo' : '')}>
                {isRTL ? 'حياة استثنائية في قلب الرياض' : 'Exceptional Living in Riyadh'}
              </p>
            </div>
            <div className={cn('flex items-start gap-2', isRTL ? 'flex-row-reverse' : '')}>
              <MapPin size={14} className="text-gold/50 mt-0.5 flex-shrink-0" />
              <p className={cn('text-white/30 text-xs leading-relaxed', isRTL ? 'font-cairo' : '')}>
                {isRTL ? 'حي الرمال – مخطط البابطين\nالرياض، المملكة العربية السعودية' : 'Al-Ramal District – Al-Babtain Plan\nRiyadh, Saudi Arabia'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={cn(isRTL ? 'text-right' : 'text-left')}>
            <h4 className={cn('text-white/60 text-xs uppercase tracking-widest mb-4', isRTL ? 'font-cairo' : '')}>
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'text-white/40 hover:text-gold text-sm transition-colors duration-200',
                    isRTL ? 'font-cairo text-right' : 'text-left'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={cn(isRTL ? 'text-right' : 'text-left')}>
            <h4 className={cn('text-white/60 text-xs uppercase tracking-widest mb-4', isRTL ? 'font-cairo' : '')}>
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <div className="space-y-3">
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، أود الاستفسار عن لندن هومز' : 'Hello, I want to inquire about London Homes')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors duration-200',
                  isRTL ? 'font-cairo flex-row-reverse' : ''
                )}
              >
                <MessageCircle size={14} />
                {isRTL ? 'واتساب' : 'WhatsApp'}
              </motion.a>

              <div>
                <motion.a
                  href="https://umam.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={cn(
                    'inline-flex items-center gap-2 text-white/30 text-sm hover:text-gold transition-colors duration-200',
                    isRTL ? 'font-cairo flex-row-reverse' : ''
                  )}
                >
                  <Globe size={14} />
                  umam.sa
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className={cn('flex flex-col sm:flex-row justify-between items-center gap-3', isRTL ? 'sm:flex-row-reverse' : '')}>
          <p className={cn('text-white/25 text-xs', isRTL ? 'font-cairo text-center sm:text-right' : 'text-center sm:text-left')}>
            {isRTL
              ? `تطوير طراز هومز | تسويق أمم العقارية © ${new Date().getFullYear()}`
              : `Developed by Tiraz Homes | Marketed by Umam Real Estate © ${new Date().getFullYear()}`}
          </p>
          <div className={cn('flex items-center gap-4', isRTL ? 'flex-row-reverse' : '')}>
            <span className="text-white/15 text-xs">
              {isRTL ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-gold/40 text-xs font-playfair">London Homes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

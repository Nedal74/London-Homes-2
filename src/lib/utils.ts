import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Unit, Stats } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, lang: 'ar' | 'en' = 'ar'): string {
  const formatted = new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return lang === 'ar' ? `${formatted} ريال` : `SAR ${formatted}`;
}

export function formatNumber(num: number, lang: 'ar' | 'en' = 'ar'): string {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA').format(num);
}

export function computeStats(units: Unit[]): Stats {
  const available = units.filter((u) => u.status === 'available').length;
  const reserved = units.filter((u) => u.status === 'reserved').length;
  const sold = units.filter((u) => u.status === 'sold').length;
  const total = units.length;
  const avgPrice =
    total > 0 ? Math.round(units.reduce((acc, u) => acc + u.price, 0) / total) : 0;
  return { available, reserved, sold, avgPrice, total };
}

export function buildWhatsAppUrl(
  phone: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encoded}`;
}

export function generateWhatsAppMessage(data: {
  name: string;
  phone: string;
  selectedUnit: string;
  message?: string;
}, lang: 'ar' | 'en' = 'ar'): string {
  if (lang === 'ar') {
    return `مرحباً، أنا ${data.name} وأود الاستفسار عن مشروع لندن هومز.
رقم الجوال: ${data.phone}
الوحدة المطلوبة: ${data.selectedUnit || 'غير محددة'}
${data.message ? `ملاحظات: ${data.message}` : ''}`;
  }
  return `Hello, I'm ${data.name} and I'd like to inquire about London Homes project.
Phone: ${data.phone}
Desired Unit: ${data.selectedUnit || 'Not specified'}
${data.message ? `Notes: ${data.message}` : ''}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    case 'reserved':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    case 'sold':
      return 'text-rose-400 bg-rose-400/10 border-rose-400/30';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
}

export function getStatusDot(status: string): string {
  switch (status) {
    case 'available':
      return 'bg-emerald-400';
    case 'reserved':
      return 'bg-amber-400';
    case 'sold':
      return 'bg-rose-400';
    default:
      return 'bg-gray-400';
  }
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

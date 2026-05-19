import type { Unit, Building } from '../types';

const buildings: Building[] = ['A', 'B', 'C', 'D', 'E'];

const featurePool = [
  'تكييف مركزي',
  'إطلالة على الحديقة',
  'إطلالة على الشارع',
  'موقف خاص',
  'خزانة ملابس',
  'غرفة خادمة',
  'شرفة',
  'مطبخ مجهز',
  'أمن 24 ساعة',
  'مصعد خاص',
  'نظام سمارت هوم',
  'حمام سباحة',
];

function pickFeatures(count: number): string[] {
  const shuffled = [...featurePool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomStatus(): 'available' | 'reserved' | 'sold' {
  const r = Math.random();
  if (r < 0.5) return 'available';
  if (r < 0.75) return 'reserved';
  return 'sold';
}

let idCounter = 1;

export const MOCK_UNITS: Unit[] = buildings.flatMap((building) => {
  const floorsCount = 8;
  const unitsPerFloor = 4;
  return Array.from({ length: floorsCount }, (_, fi) => {
    return Array.from({ length: unitsPerFloor }, (_, ui) => {
      const floor = fi + 1;
      const bedroomsOptions = [2, 3, 4, 5];
      const bedrooms = bedroomsOptions[(ui + fi) % bedroomsOptions.length];
      const area = 120 + bedrooms * 30 + Math.floor(Math.random() * 40);
      const basePrice = bedrooms * 200000 + floor * 5000;
      const price = Math.round((basePrice + Math.random() * 50000) / 1000) * 1000;
      return {
        id: `${building}-${floor}-${String(ui + 1).padStart(2, '0')}-${idCounter++}`,
        building,
        floor,
        area,
        bedrooms,
        bathrooms: bedrooms - 1,
        price,
        status: randomStatus(),
        features: pickFeatures(3 + Math.floor(Math.random() * 4)),
      } as Unit;
    });
  }).flat();
});

export const GALLERY_IMAGES = [
  {
    id: '1',
    src: '/images/hero.webp',
    alt: 'London Homes Exterior',
    altAr: 'واجهة المشروع',
    category: 'exterior',
  },

  {
    id: '2',
    src: '/images/exterior home.webp',
    alt: 'Exterior View',
    altAr: 'الواجهة الخارجية',
    category: 'exterior',
  },

  {
    id: '3',
    src: '/images/balcon.webp',
    alt: 'Balcony',
    altAr: 'البلكونة',
    category: 'exterior',
  },

  {
    id: '4',
    src: '/images/hall.webp',
    alt: 'Hall Interior',
    altAr: 'المدخل الداخلي',
    category: 'interior',
  },

  {
    id: '5',
    src: '/images/hall2.webp',
    alt: 'Luxury Hall',
    altAr: 'هول فاخر',
    category: 'interior',
  },

  {
    id: '6',
    src: '/images/hall3.webp',
    alt: 'Modern Hall',
    altAr: 'هول مودرن',
    category: 'interior',
  },

  {
    id: '7',
    src: '/images/room.webp',
    alt: 'Bedroom',
    altAr: 'غرفة نوم',
    category: 'interior',
  },

  {
    id: '8',
    src: '/images/room 2.webp',
    alt: 'Luxury Room',
    altAr: 'غرفة فاخرة',
    category: 'interior',
  },

  {
    id: '9',
    src: '/images/room (2).webp',
    alt: 'Living Room',
    altAr: 'غرفة معيشة',
    category: 'interior',
  },

  {
    id: '10',
    src: '/images/lobby.webp',
    alt: 'Lobby',
    altAr: 'اللوبي',
    category: 'amenities',
  },

  {
    id: '11',
    src: '/images/garden.webp',
    alt: 'Garden',
    altAr: 'الحديقة',
    category: 'amenities',
  },

  {
    id: '12',
    src: '/images/bath.webp',
    alt: 'Bathroom',
    altAr: 'الحمام',
    category: 'interior',
  },

  {
    id: '13',
    src: '/images/door.webp',
    alt: 'Entrance',
    altAr: 'المدخل',
    category: 'amenities',
  },
]
import { useRef, useEffect, useState } from 'react';

const images = [
  '/images/slider/10.jpg',
  '/images/slider/11.jpg',
  '/images/slider/12.jpg',
  '/images/slider/13.jpg',
  '/images/slider/14.jpg',
  '/images/slider/15.jpg',
  '/images/slider/16.jpg',
  '/images/slider/17.jpg',
  '/images/slider/18.jpg',
  '/images/slider/19.jpg',
  '/images/slider/20.jpg',
  '/images/slider/21.jpg',
  '/images/slider/22.jpg',
  '/images/slider/23.jpg',
];
/* Generate 15 Cards Automatically */
const sliderImages = Array.from(
  { length: 15 },
  (_, index) => images[index % images.length]
);

/* Duplicate for seamless loop */
const doubledImages = [...sliderImages, ...sliderImages];

export default function ProjectSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2);
      }
    };

    measure();

    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="relative py-24 bg-black overflow-hidden">

      {/* Animation */}
      {trackWidth > 0 && (
        <style>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-${trackWidth}px);
            }
          }

          .slider-track {
            animation: infinite-scroll 40s linear infinite;
            will-change: transform;
          }

          .slider-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      )}

      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          معرض المشروع
        </h2>

        <p className="text-amber-400/70 text-lg">
          اكتشف تفاصيل لندن هومز 2
        </p>
      </div>

      {/* Fade Left */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-24 md:w-40 z-20"
        style={{
          background:
            'linear-gradient(to right, #000 0%, transparent 100%)',
        }}
      />

      {/* Fade Right */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-24 md:w-40 z-20"
        style={{
          background:
            'linear-gradient(to left, #000 0%, transparent 100%)',
        }}
      />

      {/* Slider */}
      <div className="overflow-hidden">

        <div
          ref={trackRef}
          className="slider-track flex items-center gap-8 w-max"
        >

          {doubledImages.map((image, index) => (

            <div
              key={index}
              className="
  relative

  w-[260px]
  sm:w-[300px]
  md:w-[320px]

  aspect-[1080/1350]

  overflow-hidden
  rounded-[30px]

  border
  border-amber-400/15

  bg-neutral-950
  shrink-0
  group

  shadow-[0_0_30px_rgba(251,191,36,0.06)]

  transition-all
  duration-500
"
            >

              {/* Image */}
              <img
                src={image}
                alt={`Project ${index}`}
                className="
                  absolute
                  inset-0

                  w-full
                  h-full

                  object-cover
                  object-center

                  transition-transform
                  duration-700

                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/50
                  via-black/10
                  to-transparent
                "
              />

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
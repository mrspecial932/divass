"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const testimonials = [
  {
    quote:
      "The best salon experience I've ever had. My stylist understood exactly what I wanted.",
    name: "Sarah M.",
  },
  {
    quote:
      "DIVAS wigs are incredibly natural-looking. I get compliments every time I wear one.",
    name: "Jessica K.",
  },
  {
    quote:
      "From consultation to finish, everything was professional and the result was stunning.",
    name: "Amanda L.",
  },
  {
    quote:
      "I finally found a place that knows how to work with my hair type. Highly recommend.",
    name: "Michelle T.",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" py-24 md:py-32 px-6 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto flex gap-6 md:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => (cardsRef.current[i] = el)}
            className="flex-none w-[85vw] sm:w-[320px] snap-center bg-white/5 border border-white/10 text-white p-8 rounded-xl min-h-[220px] flex flex-col ring-1 ring-white/5"
          >
            <span className="text-4xl text-white/30 font-serif leading-none">
              &ldquo;
            </span>
            <p className="flex-1 mt-2 text-zinc-300 text-base md:text-lg leading-relaxed font-medium">
              {t.quote}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20" />
              <span className="text-base font-semibold text-white">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

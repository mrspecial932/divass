"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const discoverCopy =
  "Nestled in the heart of London, DivasbyClaudia is a sanctuary of beauty and sophistication. Dedicated to elevating your hair experience. Specialising in the art of transformation,";

const cards = [
  { src: "/discover-coloring.png", label: "COLORING", alt: "Hair coloring look" },
  { src: "/discover-hair-styling.png", label: "HAIR STYLING", alt: "Hair styling look" },
  { src: "/discover-wig-styling.png", label: "WIG STYLING", alt: "Wig styling look" },
  
];

export default function DiscoverSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imgRefs = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-black py-24 md:py-32 px-6 border-t border-white/10"
    >
      <h2
        ref={titleRef}
        className="text-center text-white font-bold uppercase tracking-tight mb-14 md:mb-16 leading-tight"
      >
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">Discover</span>
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1">Your Confidence</span>
      </h2>

      <div className="max-w-5xl mx-auto flex justify-center items-end gap-6 md:gap-8 mb-12">
      {cards.map((item, i) => (
  <div
    key={item.label}
    ref={(el) => (imgRefs.current[i] = el)}
    className={`flex flex-col w-[30%] max-w-[260px] flex-none ${i === 1 ? "md:self-center" : ""} ${i === 0 || i === 2 ? "md:mt-16" : ""}`}
  >
    <div className="relative aspect-[3/4] rounded-lg overflow-hidden flex-1 min-h-0 bg-black/40">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 30vw, 260px"
      />
    </div>

    <div className="mt-3 flex justify-center">
      <span className="bg-black text-white text-xs font-semibold tracking-widest uppercase py-2 px-4 rounded border border-white/40">
        {item.label}
      </span>
    </div>
  </div>
))}

      </div>

      <p
        ref={descRef}
        className="text-center text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
      >
        {discoverCopy}
      </p>
    </section>
  );
}

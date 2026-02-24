"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const team = [
  { name: "Brenda", role: "Senior Stylist", image: "/Hero-img.png" },
  { name: "Maria", role: "Color Expert", image: "/hero2.png" },
  { name: "Lisa", role: "Stylist", image: "/Hero-img.png" },
  { name: "Tina", role: "Stylist", image: "/hero2.png" },
  { name: "Jade", role: "Stylist", image: "/Hero-img.png" },
  { name: "Nina", role: "Stylist", image: "/hero2.png" },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 border-t border-white/5">
      <h2
        ref={titleRef}
        className="divas-section-title text-center text-black font-bold uppercase tracking-tight mb-16"
      >
        Meet our stylists
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {team.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-800/50 mb-4 ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-300">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <p className="font-bold text-white uppercase tracking-wide text-base">
              {member.name}
            </p>
            <p className="text-sm text-zinc-500 font-medium">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

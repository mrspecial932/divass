"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { products } from "@/data/products";

export default function ProductShowcase() {
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className=" py-24 md:py-32 px-6"
    >
      <h2
        ref={titleRef}
        className="divas-section-title text-center text-black font-bold uppercase tracking-tight mb-14"
      >
        Opar
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, i) => (
          <Link
            key={product.id}
            ref={(el) => (cardsRef.current[i] = el)}
            href={`/shop/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-800/50 mb-4 ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-300">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span
                aria-hidden
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow pointer-events-none"
              >
                +
              </span>
            </div>
            <p className="text-sm font-medium text-black uppercase tracking-wide">
              {product.name}
            </p>
            <p className="text-xs text-black/60 mt-1">View details</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

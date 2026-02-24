"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const heading = "Set your routine saloon today";
const paragraph =
  "Our team of highly skilled stylists and craftspeople are at the forefront of the hair industry, dedicated to providing you with the highest quality service and products.";

export default function SalonSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const imgRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const onBtnHover = () => {
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.2 });
  };
  const onBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl bg-black flex flex-col md:flex-row min-h-[70vh] md:min-h-[680px]">
        {/* Left panel: copy + CTA */}
        <div
          ref={leftRef}
          className="flex-1 flex flex-col justify-center px-8 py-12 md:py-16 md:pl-14 lg:pl-20 md:pr-12"
        >
          <h2 className="text-white font-bold uppercase tracking-tight mb-6 text-2xl sm:text-3xl md:text-6xl leading-tight max-w-[85%]">
            {heading}
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-[80%] leading-relaxed mb-8">
            {paragraph}
          </p>
          <Link
            ref={btnRef}
            href="#contact"
            className="inline-flex items-center justify-center w-fit bg-white text-black font-bold uppercase tracking-widest px-10 py-4 text-sm hover:bg-zinc-200 transition-colors rounded-xl shadow-sm"
            onMouseEnter={onBtnHover}
            onMouseLeave={onBtnLeave}
          >
            Book now
          </Link>
         
        </div>

        {/* Right panel: portrait */}
        <div
          ref={imgRef}
          className="flex-1 relative min-h-[50vh] md:min-h-full aspect-[3/4] md:aspect-auto bg-black"
        >
          <Image
            src="/salon-portrait.png"
            alt="Divas By Claudia — salon style and expertise"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

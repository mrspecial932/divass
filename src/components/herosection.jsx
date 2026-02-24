"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imgCenterRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Title reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Hero image under "Stir the beauty you desire"
    tl.fromTo(
      imgCenterRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      "-=0.5"
    );

    // Description fade
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );

    // Parallax on scroll
    gsap.to(imgCenterRef.current, {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-24 px-6 overflow-hidden"
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,200,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(120,80,200,0.08),transparent)] pointer-events-none" />

      <h1
        ref={titleRef}
        className="divas-hero-title text-center text-black uppercase tracking-tight mb-12 md:mb-14"
      >
        <span className="block">Stir the beauty</span>
        <span className="block">you desire</span>
      </h1>

      <div
        ref={imgCenterRef}
        className="relative w-full max-w-5xl mx-auto aspect-[2179/1230] overflow-hidden mb-12 md:mb-14 rounded-lg "
      >
        <Image
          src="/hghgh.png"
          alt="Stir the beauty you desire — diverse beauty looks and styling"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </div>

      <p
        ref={descRef}
        className="divas-hero-desc text-center text-black max-w-5xl  mt-10 mx-auto leading-relaxed"
      >
        Nestled in the heart of London, DivasbyClaudia is a sanctuary of beauty
        and sophistication, Dedicated to elevating your hair experience.
        Specializing in the art of transformation, we offer a serene environment
        where luxury meets innovation in hair extension services. Our bespoke
        studio is not just a place to enhance your look; it&apos;s where
        confidence is woven into every strand of your hair.
      </p>
    </section>
  );
}

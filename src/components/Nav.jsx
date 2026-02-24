"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/#about", label: "ABOUT US" },
  { href: "/services", label: "SERVICES" },
  { href: "/shop", label: "SHOP" },
  { href: "/booking", label: "BOOKING" },
];

export default function Nav() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linkRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header background & shadow on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "50px top",
      end: "51px top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // Logo subtle entrance
    gsap.from(logoRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const onLinkEnter = (i) => {
    gsap.to(linkRefs.current[i], {
      y: -2,
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const onLinkLeave = (i) => {
    gsap.to(linkRefs.current[i], {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center max-w-7xl mx-auto px-6 py-4">
        <Link
          ref={logoRef}
          href="/"
          className="text-2xl font-light tracking-[0.2em] text-black uppercase hover:opacity-80 transition-opacity flex flex-col"
        >
          <span>DIVAS</span>
          <span className="text-xs font-normal tracking-normal text-black/60 normal-case">By Claudia</span>
        </Link>

        <div className="flex items-center gap-10 md:gap-12 ml-auto">
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={(el) => (linkRefs.current[i] = el)}
                  href={link.href}
                  className="text-sm font-medium tracking-widest text-black uppercase"
                  onMouseEnter={() => onLinkEnter(i)}
                  onMouseLeave={() => onLinkLeave(i)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
           
            <button
              type="button"
              aria-label="Search"
              className="p-2 -m-2 text-black hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href="/cart"
              className="relative p-2 -m-2 text-black hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="bg-black text-white px-6 py-2.5 text-sm font-medium tracking-widest uppercase hover:bg-black/85 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

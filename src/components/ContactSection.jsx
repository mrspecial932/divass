"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const [sent, setSent] = useState(false);

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
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(btnRef.current, { scale: 0.96, duration: 0.1 });
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, delay: 0.1 });
    setSent(true);
  };

  const onBtnHover = () => {
    gsap.to(btnRef.current, { scale: 1.02, duration: 0.2 });
  };
  const onBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#0d0d0f] py-24 md:py-32 px-6 border-t border-white/5"
    >
      <h2
        ref={titleRef}
        className="divas-section-title text-center text-white font-bold uppercase tracking-tight mb-6"
      >
        Stay in touch
      </h2>
      <p className="divas-hero-desc text-center text-zinc-400 max-w-xl mx-auto mb-12">
        Have a question or want to book an appointment? Send us a message and
        we&apos;ll get back to you soon.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 font-medium rounded-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 font-medium rounded-sm"
            required
          />
        </div>
        <textarea
          placeholder="Message"
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 resize-none font-medium rounded-sm"
          required
        />
        <div className="flex justify-center pt-2">
          <button
            ref={btnRef}
            type="submit"
            onMouseEnter={onBtnHover}
            onMouseLeave={onBtnLeave}
            className="bg-white text-[#0a0a0b] font-bold uppercase tracking-widest px-12 py-4 text-sm hover:bg-zinc-200 transition-colors rounded-sm"
          >
            {sent ? "Sent" : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}

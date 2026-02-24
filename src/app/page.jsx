"use client";

import HeroSection from "@/components/herosection";
import ProductShowcase from "@/components/ProductShowcase";
import DiscoverSection from "@/components/DiscoverSection";
import HistoryStudioSection from "@/components/HistoryStudioSection";
import SalonSection from "@/components/SalonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <DiscoverSection />
      <HistoryStudioSection />
      <SalonSection />
      <TestimonialsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

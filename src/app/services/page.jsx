"use client";

import Link from "next/link";

const servicesIntro =
  "Our Studio Exudes An Atmosphere Of Luxury And Sophistication, Welcoming Clients Into A Space Where Their Beauty Aspirations Can Flourish. From The Moment You Step Through Our Doors, You'll Be Greeted By A Team Of Skilled Professionals Dedicated To Providing You With The Highest Level Of Service And Attention To Detail.";

const services = [
  { name: "Wig Coloring", slug: "wig-coloring" },
  { name: "Cornrows", slug: "cornrows" },
  { name: "Hair Services", slug: "hair-services" },
  { name: "Wig Services", slug: "wig-services" },
  { name: "Beauty Services", slug: "beauty-services" },
  { name: "Hair Treatment", slug: "hair-treatment" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-black mb-6">
            Our Services
          </h1>
          <p className="text-black/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {servicesIntro}
          </p>
        </header>

        {/* Services grid: 2x3 on desktop, responsive */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          aria-label="Services"
        >
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-amber-100/90 via-amber-50/80 to-amber-200/90">
                {/* Card image – replace src with your image path when ready */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: "url(/hero-beauty-triptych.png)",
                  }}
                />
                {/* Beige/gold overlay for blend */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-amber-100/20"
                  aria-hidden
                />
                {/* Service name label */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-xs">
                  <span className="block text-center bg-black text-white text-sm font-medium tracking-widest uppercase py-3 px-4 rounded-lg">
                    {service.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

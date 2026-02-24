"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

const shopIntro =
  "Our Studio Exudes An Atmosphere Of Luxury And Sophistication, Welcoming Clients Into A Space Where Their Beauty Aspirations Can Flourish. From The Moment You Step Through Our Doors, You'll Be Greeted By A Team Of Skilled Professionals Dedicated To Providing You With The Highest Level Of Service And Attention To Detail.";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-black mb-6">
            Shop Collection
          </h1>
          <p className="text-black/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {shopIntro}
          </p>
        </header>

        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          aria-label="Shop by category"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/category/${category.slug}`}
              className="group block rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-amber-100/90 to-amber-200/90">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-black text-white text-sm font-semibold tracking-widest uppercase py-2.5 px-4 rounded">
                    {category.name}
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

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CategoryPage() {
  const params = useParams();
  const category = getCategoryBySlug(params.slug);
  const products = category ? getProductsByCategory(params.slug) : [];
  const { addItem } = useCart();

  if (!category) {
    return (
      <main className="min-h-screen bg-white pt-28 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-black/70 mb-4">Category not found.</p>
          <Link href="/shop" className="text-black font-medium underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link
            href="/shop"
            className="text-black/70 hover:text-black text-sm font-medium mb-4 inline-block"
          >
            ← Shop Collection
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
            {category.name}
          </h1>
        </div>

        {products.length === 0 ? (
          <p className="text-black/70">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group block relative rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black shadow-sm z-10"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3">
                    <p className="text-white font-bold uppercase tracking-wide text-sm">
                      {product.name}
                    </p>
                    <p className="text-white font-semibold mt-0.5">
                      ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

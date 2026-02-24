"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { products, getProductBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? "");
  const [selectedLength, setSelectedLength] = useState(product?.lengths?.[0] ?? null);
  const [mainImage, setMainImage] = useState(product?.image ?? "");

  const buyBtnRef = useRef(null);
  const addCartBtnRef = useRef(null);

  useGSAP(() => {
    if (!buyBtnRef.current || !addCartBtnRef.current) return;
    gsap.fromTo(
      [buyBtnRef.current, addCartBtnRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 }
    );
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white pt-28 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-black/70 mb-4">Product not found.</p>
          <Link href="/shop" className="text-black font-medium underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      length: selectedLength,
      color: selectedColor,
      quantity: 1,
    });
    router.push("/checkout");
  };

  const handleAddCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      length: selectedLength,
      color: selectedColor,
      quantity: 1,
    });
    gsap.to(addCartBtnRef.current, { scale: 1.05, duration: 0.15 });
    gsap.to(addCartBtnRef.current, { scale: 1, duration: 0.2, delay: 0.15 });
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: main image + thumbnails */}
        <div className="lg:w-1/2">
          <div className="relative aspect-[3/4] max-h-[70vh] rounded overflow-hidden bg-neutral-100 mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {(product.gallery || [product.image]).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMainImage(src)}
                className={`relative flex-none w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                  mainImage === src ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex flex-wrap items-baseline gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
              {product.name}
            </h1>
            <span className="text-2xl md:text-3xl font-bold text-black">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm uppercase text-black/80 mb-6">{product.type}</p>
          <p className="text-black/80 leading-relaxed mb-8 max-w-lg">
            {product.description}
          </p>

          {/* Color */}
          {product.colors?.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-black mb-3">
                Color
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-14 h-14 rounded overflow-hidden border-2 transition-colors ${
                      selectedColor === c.name ? "border-black" : "border-neutral-300"
                    }`}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Length */}
          {product.lengths?.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-black mb-3">
                Length
              </p>
              <div className="flex gap-3">
                {product.lengths.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSelectedLength(len)}
                    className={`min-w-[4rem] py-3 px-4 text-sm font-medium uppercase tracking-wide transition-colors ${
                      selectedLength === len
                        ? "bg-black text-white"
                        : "bg-white border border-black text-black hover:bg-neutral-100"
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-auto">
            <button
              ref={buyBtnRef}
              type="button"
              onClick={handleBuyNow}
              className="bg-black text-white font-bold uppercase tracking-widest px-10 py-4 text-sm hover:bg-black/85 transition-colors"
            >
              Buy now
            </button>
            <button
              ref={addCartBtnRef}
              type="button"
              onClick={handleAddCart}
              className="bg-white border-2 border-black text-black font-bold uppercase tracking-widest px-10 py-4 text-sm hover:bg-neutral-50 transition-colors"
            >
              Add cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

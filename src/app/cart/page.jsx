"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim()) setCouponApplied(true);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-black mb-4">
            Your cart
          </h1>
          <p className="text-black/70 mb-8">Your cart is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-black/85 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-12">
          Your cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: cart items */}
          <div className="lg:col-span-2 space-y-8 border-b lg:border-b-0 lg:border-r border-black/10 pb-12 lg:pb-0 lg:pr-12">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.length}-${item.color}`}
                className="flex gap-6 items-start"
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-black uppercase tracking-wide">
                    {item.name}
                  </p>
                  <p className="text-sm text-black/70 mt-1">
                    {item.length} Inches / {item.color}
                  </p>
                  <p className="text-black font-semibold mt-2">
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-2 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity({
                        id: item.id,
                        length: item.length,
                        color: item.color,
                        quantity: Math.max(0, item.quantity - 1),
                      })
                    }
                    className="w-8 h-8 flex items-center justify-center text-black hover:bg-black/10 rounded-full transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[1.5rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity({
                        id: item.id,
                        length: item.length,
                        color: item.color,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="w-8 h-8 flex items-center justify-center text-black hover:bg-black/10 rounded-full transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <form onSubmit={handleApplyCoupon} className="pt-6">
              <p className="text-sm text-black/70 mb-2">
                Have a Coupon? Enter Code
              </p>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon Code"
                  className="flex-1 min-w-[180px] px-4 py-3 border border-black/20 text-black placeholder:text-black/50 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-6 py-3 border-2 border-black text-black font-medium uppercase tracking-wide hover:bg-neutral-50 transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {/* Right: cart totals */}
          <div className="lg:pl-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">
              Cart totals
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-black/70">
                  Shipping (3 To 5 Business Day)
                </span>
                <span className="text-black font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">TAX (applicable to country)</span>
                <span className="text-black font-medium">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Sub total</span>
                <span className="text-black font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-black/20 pt-3 mt-3 flex justify-between font-bold text-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-8 block w-full text-center bg-black text-white font-bold uppercase tracking-widest py-4 text-sm hover:bg-black/85 transition-colors"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/shop"
              className="mt-4 block text-center text-sm font-medium text-black/70 hover:text-black uppercase tracking-wide"
            >
              &larr; Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

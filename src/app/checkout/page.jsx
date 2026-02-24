"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const total = subtotal;
  const shipping = 0;
  const tax = 0;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    setPlaced(true);
    setLoading(false);
  };

  if (items.length === 0 && !placed) {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-black mb-4">
            Checkout
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

  if (placed) {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-black mb-4">
            Thank you
          </h1>
          <p className="text-black/70 mb-8">
            Your order has been received. We&apos;ll be in touch soon.
          </p>
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-12">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                  ZIP
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  required
                  value={form.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-8">
            <h2 className="text-lg font-bold uppercase tracking-tight text-black mb-4">
              Order summary
            </h2>
            <ul className="space-y-2 text-sm text-black/80 mb-4">
              {items.map((item) => (
                <li key={`${item.id}-${item.length}-${item.color}`}>
                  {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/70">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-black pt-2 border-t border-black/10">
                <span>Total</span>
                <span>${(subtotal + shipping + tax).toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-black text-white font-bold uppercase tracking-widest py-4 text-sm hover:bg-black/85 transition-colors disabled:opacity-60"
            >
              {loading ? "Processing…" : "Place order"}
            </button>
            <Link
              href="/cart"
              className="mt-4 block text-center text-sm font-medium text-black/70 hover:text-black uppercase tracking-wide"
            >
              &larr; Back to cart
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

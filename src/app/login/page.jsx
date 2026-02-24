"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: add auth later
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-black mb-8 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-black/20 text-black focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 text-sm hover:bg-black/85 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-black/70">
          <Link href="/" className="hover:text-black underline">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}

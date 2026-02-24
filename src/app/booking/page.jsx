"use client";

import { useState } from "react";
import Link from "next/link";
import {
  serviceCategories,
  bookingServices,
  stylists,
  paymentMethods,
  closedDays,
} from "@/data/bookingServices";

const tagline = "Experience luxury hair services at DIVAS by Claudia";

export default function BookingPage() {
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedServices, setSelectedServices] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stylistId, setStylistId] = useState("team");
  const [paymentId, setPaymentId] = useState("salon");
  const [location, setLocation] = useState("on-site");
  const [specialRequests, setSpecialRequests] = useState("");

  const filteredServices =
    serviceFilter === "all"
      ? bookingServices
      : bookingServices.filter((s) => s.category === serviceFilter);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.some((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalDuration = selectedServices.reduce((acc, s) => acc + s.durationMinutes, 0);
  const subtotal = selectedServices.reduce((acc, s) => {
    const price = s.discountPercent
      ? s.price * (1 - s.discountPercent / 100)
      : s.price;
    return acc + price;
  }, 0);
  const stylistAddOn = stylists.find((s) => s.id === stylistId)?.addOnPrice ?? 0;
  const total = subtotal + stylistAddOn;

  const formatDuration = (mins) => {
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}min` : `${h}h`;
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-2">
            Book Appointment
          </h1>
          <p className="text-black/70 text-base md:text-lg">{tagline}</p>
        </header>

        {/* Service categories tabs */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-black mb-4">Select Services</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setServiceFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  serviceFilter === cat.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/30 hover:border-black/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {filteredServices.map((service) => {
              const selected = selectedServices.some((s) => s.id === service.id);
              const priceDisplay = service.discountPercent
                ? `${service.price} -${service.discountPercent}%`
                : service.price;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-black bg-black/5"
                      : "border-black/20 hover:border-black/50 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-black uppercase tracking-wide">
                        {service.name}
                      </p>
                      <p className="text-xs text-black/60 uppercase mt-0.5">
                        {serviceCategories.find((c) => c.id === service.category)?.label ?? service.category}
                      </p>
                      <p className="text-sm text-black/80 mt-2">{service.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-semibold text-black">
                        £{service.discountPercent ? (service.price * (1 - service.discountPercent / 100)).toFixed(2) : service.price.toFixed(2)}
                        {service.discountPercent && (
                          <span className="text-xs text-black/60 line-through ml-1">£{service.price}.00</span>
                        )}
                      </p>
                      <p className="text-xs text-black/60">{formatDuration(service.durationMinutes)}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedServices.length > 0 && (
            <div className="rounded-xl border border-black/20 bg-black/[0.02] p-4 mb-8">
              <p className="text-sm font-semibold text-black mb-2">Selected Services</p>
              <ul className="text-sm text-black/80 space-y-1 mb-3">
                {selectedServices.map((s) => (
                  <li key={s.id}>
                    {s.name} — £{s.discountPercent ? (s.price * (1 - s.discountPercent / 100)).toFixed(2) : s.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-black/70">
                Total Duration: {formatDuration(totalDuration)}
              </p>
              <p className="text-sm font-semibold text-black mt-1">
                Subtotal: £{subtotal.toFixed(2)}
              </p>
            </div>
          )}
        </section>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <section>
            <h2 className="text-lg font-semibold text-black mb-4">Your Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-4">Appointment Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-black mb-1">
                  Date of Appointment <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-black/60 mb-1">
                  Closed: {closedDays.join(", ")}
                </p>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-black/30 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-black mb-1">
                    Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={!date}
                    placeholder={!date ? "Select a date first" : undefined}
                    className="w-full px-4 py-3 rounded-lg border border-black/30 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {!date && (
                    <p className="text-xs text-black/50 mt-1">Select a date first</p>
                  )}
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-black mb-1">
                    Location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-black/30 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black bg-white appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25rem", paddingRight: "2.5rem" }}
                  >
                    <option value="on-site">On-site</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="stylist" className="block text-sm font-medium text-black mb-1">
                  Stylist Preference <span className="text-red-600">*</span>
                </label>
                <select
                  id="stylist"
                  value={stylistId}
                  onChange={(e) => setStylistId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black bg-white appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25rem", paddingRight: "2.5rem" }}
                >
                  {stylists.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                      {s.addOnPrice > 0 ? ` (+£${s.addOnPrice})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="payment" className="block text-sm font-medium text-black mb-1">
                  Payment Method <span className="text-red-600">*</span>
                </label>
                <select
                  id="payment"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black bg-white appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25rem", paddingRight: "2.5rem" }}
                >
                  {paymentMethods.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="requests" className="block text-sm font-medium text-black mb-1">
                  Special Requests
                </label>
                <textarea
                  id="requests"
                  rows={3}
                  placeholder="Any special requests or notes..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-black/30 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black resize-none"
                />
              </div>
            </div>
          </section>

          {selectedServices.length > 0 && (
            <p className="text-right text-sm font-semibold text-black">
              Total: £{total.toFixed(2)}
              {stylistAddOn > 0 && (
                <span className="text-black/60 font-normal"> (includes stylist add-on)</span>
              )}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-12 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-lg hover:bg-black/85 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Book Appointment
            </button>
          </div>
        </form>

        <p className="mt-12 text-center text-sm text-black/60">
          <Link href="/#contact" className="underline hover:text-black">
            Contact us
          </Link>{" "}
          for questions or alternative availability.
        </p>
      </div>
    </main>
  );
}

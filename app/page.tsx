'use client';

import React, { useState } from 'react';
import { Manrope, Inter } from 'next/font/google';
import { Activity, Phone, MapPin } from 'lucide-react';

// Fonts
const headingFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Checkup',
    notes: '',
  });

  const [status, setStatus] =
    useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40 text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-2">
          Appointment Requested!
        </h3>
        <p className="text-slate-600">
          Our team will contact you shortly to confirm.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-blue-600 font-semibold"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40"
      >
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          Book Appointment
        </h3>
        <p className="text-slate-500 mb-8">
          We’ll contact you within minutes to confirm.
        </p>

        <div className="space-y-5">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition outline-none"
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition outline-none"
          />

          <input
            required
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition outline-none"
          />

          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition outline-none"
          >
            <option>General Checkup</option>
            <option>Teeth Whitening</option>
            <option>Emergency Pain</option>
            <option>Invisalign / Ortho</option>
            <option>Dental Implant</option>
          </select>

          <textarea
            rows={3}
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition outline-none resize-none"
          />

          <button
            disabled={status === 'submitting'}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 rounded-xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-70"
          >
            {status === 'submitting'
              ? 'Processing...'
              : 'Request Appointment'}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-sm mt-3 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1
            className={`text-5xl md:text-6xl font-bold ${headingFont.className} text-slate-900 mb-6`}
          >
            Modern Dentistry,{' '}
            <span className="text-blue-600">Gentle Care.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-lg">
            Experience painless treatments and premium care using modern
            technology.
          </p>
        </div>

        <BookingForm />
      </div>
    </div>
  );
}

function InfoBar() {
  return (
    <div className="bg-slate-900 text-white py-4 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Phone size={14} /> (555) 012-3456
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} /> 123 Dental Street
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={`${bodyFont.className} min-h-screen bg-white`}>
      <InfoBar />

      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className={`text-2xl font-bold ${headingFont.className} flex items-center gap-2`}
          >
            <Activity className="text-blue-600" />
            ApexDental
          </div>
        </div>
      </nav>

      <Hero />

      <footer className="bg-slate-50 border-t py-12 text-center text-slate-400 text-sm">
        © 2026 Apex Dental Care. Demo for AM Intelligence.
      </footer>
    </div>
  );
}
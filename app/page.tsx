'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Activity,
  User,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Manrope, Inter } from 'next/font/google';

// --- FONTS ---
const headingFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap'
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap'
});

// =========================================
// BOOKING FORM
// =========================================

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Checkup',
    notes: ''
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
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send');
      }

      setStatus('success');
    } catch (error) {
      console.error('SUBMIT ERROR:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 p-8 rounded-2xl text-center border border-green-100"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
          <CheckCircle size={32} />
        </div>
        <h3 className={`text-2xl ${headingFont.className} font-bold text-green-800 mb-2`}>
          Request Received!
        </h3>
        <p className="text-green-700">
          Our team will contact you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-bold uppercase tracking-widest text-green-600 hover:text-green-800"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
    >
      <h3 className={`text-3xl ${headingFont.className} font-bold mb-6`}>
        Book Appointment
      </h3>

      <div className="space-y-5">

        <input
          required
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          required
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <select
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
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
          className="w-full p-3 border rounded-xl"
        />

        <button
          disabled={status === 'submitting'}
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl"
        >
          {status === 'submitting'
            ? 'Submitting...'
            : 'Request Appointment'}
        </button>

        {status === 'error' && (
          <p className="text-red-600 text-sm mt-2">
            Something went wrong. Please try again.
          </p>
        )}

      </div>
    </form>
  );
}

// =========================================
// MAIN PAGE
// =========================================

export default function Home() {
  return (
    <div className={`min-h-screen ${bodyFont.className}`}>
      <div className="max-w-6xl mx-auto p-10">
        <BookingForm />
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Calendar, Phone, MapPin, Clock, CheckCircle, Star, ArrowRight, Shield, Activity, User, Mail, MessageSquare } from 'lucide-react';
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

// --- CONFIGURATION ---
// PASTE YOUR N8N WEBHOOK URL INSIDE THE QUOTES BELOW vvv
const N8N_WEBHOOK_URL = "";
const WEBHOOK_SECRET = "apex-dental-2026"; 
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// =========================================
// 1. COMPONENTS
// =========================================

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Checkup',
    urgency: 'Routine',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("You must give consent to receive appointment notifications.");
      return;
    }
    setStatus('submitting');

    try {
      if (!N8N_WEBHOOK_URL) {
        // Simulate success if no URL is set yet (for testing UI)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Data (Connect n8n to send real data):", formData);
      } else {
        // Send data to n8n
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-clinic-secret': WEBHOOK_SECRET
          },
          body: JSON.stringify({
            clinic: "Apex Dental",
            source: "Website Form",
            submittedAt: new Date().toISOString(),
            patient: formData
          }),
        });
      }
      setStatus('success');
    } catch (error) {
      console.error(error);
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
        <h3 className={`text-2xl ${headingFont.className} font-bold text-green-800 mb-2`}>Request Received!</h3>
        <p className="text-green-700">
          Our staff will contact you shortly to confirm your appointment.
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
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
      
      <div className="mb-8">
        <h3 className={`text-3xl ${headingFont.className} font-bold text-slate-900`}>Book Appointment</h3>
        <p className="text-slate-500 mt-2">
          Fill out the form below and our team will contact you shortly to confirm your visit.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="text" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="tel" 
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Reason for Visit</label>
          <div className="relative">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer"
            >
              <option>General Checkup</option>
              <option>Teeth Whitening</option>
              <option>Emergency Pain</option>
              <option>Invisalign / Ortho</option>
              <option>Dental Implant</option>
            </select>
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Is this urgent?</label>
          <select
            value={formData.urgency}
            onChange={(e) => setFormData({...formData, urgency: e.target.value})}
            className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
          >
            <option>Routine</option>
            <option>Urgent (Pain / Emergency)</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Additional Notes</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
            <textarea 
              rows={3}
              placeholder="Any specific concerns?"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3 text-xs text-slate-500">
          <input
            required
            type="checkbox"
            checked={consent}
            onChange={() => setConsent(!consent)}
            className="mt-1"
          />
          <p>I consent to receive calls or SMS messages regarding my appointment.</p>
        </div>

        {/* Submit */}
        <button 
          disabled={status === 'submitting'}
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {status === 'submitting' ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Request Appointment <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// --- Other components remain unchanged ---
// ClinicHero, ServiceCard, ServicesSection, InfoBar
// just import/use BookingForm from above

export default BookingForm;

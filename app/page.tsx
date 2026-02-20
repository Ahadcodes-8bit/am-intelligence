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
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// =========================================
// 1. COMPONENTS
// =========================================

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Checkup',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      if (!N8N_WEBHOOK_URL) {
        // Simulate success if no URL is set yet (for testing UI)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Data (Connect n8n to send real data):", formData);
      } else {
        // Send data to n8n
       await fetch("/api/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
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
        <p className="text-green-700">Our team (or AI agent) will contact you shortly to confirm.</p>
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
        <p className="text-slate-500 mt-2">Fill out the form below. Our AI system processes this instantly.</p>
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

        {/* Service Type */}
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
  )
}

function ClinicHero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={12} fill="currentColor" /> Voted Best in City 2025
          </div>
          
          <h1 className={`text-5xl md:text-7xl ${headingFont.className} font-bold text-slate-900 leading-[1.05] tracking-tight mb-6`}>
            Modern Dentistry, <br/>
            <span className="text-blue-600">Gentle Care.</span>
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
            Experience painless treatments and a smile you'll love. We use the latest technology to ensure your visit is quick, comfortable, and effective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium text-slate-600 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Shield size={20} />
              </div>
              <span>Insurance Accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Clock size={20} />
              </div>
              <span>Open Saturdays</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
               ))}
            </div>
            <span>Trusted by 2,000+ patients</span>
          </div>
        </div>

        {/* The Booking Form (Right Side) */}
        <div className="relative z-10">
           <BookingForm />
        </div>

      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px] -z-0 hidden lg:block"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-200/20 rounded-full blur-[80px]"></div>
    </div>
  )
}

function ServiceCard({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className={`text-xl ${headingFont.className} font-bold text-slate-900 mb-3`}>{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Our Services</span>
          <h2 className={`text-4xl ${headingFont.className} font-bold text-slate-900 mt-3`}>Complete Dental Care</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Activity}
            title="General Dentistry"
            desc="Regular checkups, cleanings, and exams to keep your teeth healthy and prevent future issues."
          />
          <ServiceCard 
            icon={Star}
            title="Cosmetic"
            desc="Whitening, veneers, and bonding to give you the bright, confident smile you deserve."
          />
          <ServiceCard 
            icon={Shield}
            title="Restorative"
            desc="Implants, crowns, and bridges using durable materials that look and feel natural."
          />
        </div>
      </div>
    </section>
  )
}

function InfoBar() {
  return (
    <div className="bg-[#1e293b] text-white py-4 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone size={14} className="text-blue-400"/> (555) 012-3456</span>
          <span className="hidden md:flex items-center gap-2"><MapPin size={14} className="text-blue-400"/> 123 Dental Street, NY</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs">
          <span>Mon-Fri: 9am - 6pm</span>
          <span>Sat: 10am - 2pm</span>
        </div>
      </div>
    </div>
  )
}

// =========================================
// 2. MAIN PAGE
// =========================================

export default function Home() {
  return (
    <div className={`min-h-screen ${bodyFont.className} bg-white text-slate-900 selection:bg-blue-100`}>
      <InfoBar />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-2xl font-bold tracking-tight ${headingFont.className} text-blue-900 flex items-center gap-2`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Activity size={18} />
            </div>
            ApexDental
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
            Patient Portal
          </button>
        </div>
      </nav>

      <ClinicHero />
      <ServicesSection />
      
      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center text-slate-400 text-sm">
        <p>© 2026 Apex Dental Care. This is a demo site for AM Intelligence.</p>
      </footer>

    </div>
  );
}
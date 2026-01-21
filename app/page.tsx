'use client'; 

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'; 
import { CalendarCheck, ShieldCheck, Activity, ArrowRight, Star, LucideIcon, Play, Pause, Mail, Lock, Zap, ChevronDown, Plus, Minus } from 'lucide-react';
import { Manrope, Inter } from 'next/font/google'; 
import Lenis from 'lenis';

// --- FONTS ---
const headingFont = Manrope({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

const bodyFont = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'], 
  display: 'swap' 
});

// --- LINKS ---
const VAPI_DEMO_URL = "https://vapi.ai/demo";
const CONTACT_EMAIL = "hello@amintelligence.com"; 

// --- TYPES ---
interface GlassCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

// =========================================
// 1. UTILITY COMPONENTS
// =========================================

function TextReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// =========================================
// 2. PAGE SECTIONS
// =========================================

function Hero() {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 20, mass: 0.5 });
  const y1 = useTransform(smoothScroll, [0, 500], [0, 200]); 
  const scale = useTransform(smoothScroll, [0, 500], [1, 0.95]);
  const opacity = useTransform(smoothScroll, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center bg-[#2563EB]">
       
       <motion.div 
         style={{ y: y1 }}
         className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,#60A5FA_0%,#2563EB_60%,#1D4ED8_100%)] will-change-transform"
       >
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
       </motion.div>

       <motion.div 
         style={{ scale, opacity }}
         className="relative z-10 text-center px-6 max-w-5xl mx-auto will-change-transform"
       >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-300/30 bg-blue-400/20 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-50">AI For Healthcare</span>
          </div>
          
          <h1 className={`text-6xl md:text-9xl ${headingFont.className} font-bold leading-[0.95] tracking-tight mb-8 text-white drop-shadow-sm`}>
            The AI Front Desk <br />
            <span className="text-blue-100 opacity-90 font-medium">for Modern Clinics.</span>
          </h1>

          <p className="text-xl text-blue-50/90 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Eliminate missed calls. <strong className="text-white font-semibold">Our AI</strong> is the HIPAA-compliant receptionist that schedules appointments and integrates with your EHR—24/7.
          </p>

          <div className="flex justify-center gap-4">
            <a href={VAPI_DEMO_URL} target="_blank" className="bg-white text-[#1D4ED8] px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg hover:scale-105">
              Live Demo
            </a>
          </div>
       </motion.div>
    </div>
  )
}

function LogoMarquee() {
  const logos = [
    "DermalCare", "MediPulse", "Smile Studio", "Vitality GP", 
    "OrthoPlus", "Skin & Co", "HealthFirst", "Dental Arts"
  ];

  return (
    <div className="py-12 border-y border-blue-900/5 bg-[#EFF6FF] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#EFF6FF] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#EFF6FF] to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto flex items-center">
        <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-blue-900/30 whitespace-nowrap mr-12 px-6">
          Trusted by 50+ Clinics
        </span>
        
        <div className="flex overflow-hidden w-full mask-gradient">
          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap pr-16"
            animate={{ x: "-50%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <span key={i} className={`text-xl md:text-2xl ${headingFont.className} font-bold text-blue-900/40 hover:text-blue-600 transition-colors cursor-default`}>
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- UPDATED AUDIO PLAYER (ACTUALLY PLAYS SOUND) ---
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Initialize the audio object pointing to the file in /public
    audioRef.current = new Audio("/demo-booking.mp3");
    
    // 2. Add listener to reset button when audio ends
    const reset = () => setIsPlaying(false);
    audioRef.current.addEventListener('ended', reset);

    // 3. Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', reset);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-32 px-6 bg-[#2563EB] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em]">Hear the difference</span>
          <h2 className={`text-4xl md:text-6xl ${headingFont.className} font-bold text-white mt-4`}>
            Human-like. <span className="opacity-70 font-medium">Really.</span>
          </h2>
        </div>

        <motion.div
          whileHover={{ y: -5 }}
          onClick={togglePlay} // <-- Connected the click handler
          className={`cursor-pointer w-full p-10 md:p-14 rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden group ${
            isPlaying 
              ? "bg-white border-white text-[#2563EB] shadow-2xl" 
              : "bg-white/10 border-white/10 text-white hover:bg-white/20"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Play Button */}
            <div className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-3xl transition-colors ${
              isPlaying ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-white/10 text-white"
            }`}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </div>

            {/* Text Info */}
            <div className="flex-grow text-center md:text-left">
              <span className={`text-xs font-bold tracking-widest uppercase block mb-2 ${isPlaying ? "text-blue-300" : "text-blue-200/50"}`}>
                Audio Demo • 0:45
              </span>
              <h3 className={`text-2xl md:text-4xl ${headingFont.className} font-semibold`}>Booking an Appointment</h3>
            </div>
            
            {/* Waveform Animation (Moves only when playing) */}
            <div className="flex items-end gap-1.5 h-12">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { height: ["20%", "100%", "20%"] } : { height: "20%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.8, 
                    delay: i * 0.05,
                    ease: "easeInOut" 
                  }}
                  className={`w-2 rounded-full ${isPlaying ? "bg-[#2563EB]" : "bg-white/20"}`}
                />
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

function StickySection() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="relative h-[200vh] flex flex-col md:flex-row bg-[#EFF6FF]"> 
      <div className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center px-12 md:px-24 overflow-hidden">
        
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#BFDBFE 1px, transparent 1px)`, backgroundSize: '24px 24px' }}>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-[80px]"></div>

        <div className="relative z-10">
          <TextReveal>
             <h2 className={`text-5xl md:text-7xl ${headingFont.className} font-bold mb-6 tracking-tight text-[#1E3A8A]`}>
               More than an <br/> answering machine.
             </h2>
          </TextReveal>
          <TextReveal delay={0.1}>
             <p className="text-xl text-slate-500 max-w-md font-light leading-relaxed">
               Designed specifically for the high-stakes nuances of medical scheduling. It handles the front desk so you can handle the patients.
             </p>
          </TextReveal>
        </div>

      </div>

      <div className="md:w-1/2 flex flex-col gap-24 py-24 px-8 md:px-24">
         <FeatureCard 
           icon={CalendarCheck}
           title="Smart Scheduling"
           desc="It integrates directly with your calendar (Calendly, HighLevel, EHRs) to book appointments in real-time without double booking."
         />
         <FeatureCard 
           icon={ShieldCheck}
           title="HIPAA Compliant"
           desc="Enterprise-grade security. We prioritize patient data privacy with infrastructure designed to meet strict healthcare standards."
         />
         <FeatureCard 
           icon={Activity}
           title="Intelligent Triage"
           desc="The AI distinguishes between emergencies, prescription refills, and new patient inquiries, routing them instantly to the right desk."
         />
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: GlassCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white p-12 rounded-4xl shadow-xl shadow-blue-900/5 border border-white/50"
    >
       <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center text-[#2563EB] mb-8">
         <Icon size={28} strokeWidth={1.5} />
       </div>
       <h3 className={`text-3xl ${headingFont.className} font-bold mb-4 text-[#1E40AF]`}>{title}</h3>
       <p className="text-slate-500 leading-relaxed font-light text-lg">{desc}</p>
    </motion.div>
  )
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Connect", desc: "We integrate with your existing phone line and calendar system in one click." },
    { num: "02", title: "Train", desc: "Upload your practice's knowledge base, FAQs, and pricing so the AI knows your business." },
    { num: "03", title: "Deploy", desc: "Turn on call forwarding. The AI instantly starts handling calls, bookings, and triage." }
  ];

  return (
    <section className="py-32 px-6 bg-white border-b border-blue-50">
      <div className="max-w-7xl mx-auto">
         <div className="mb-20">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Onboarding</span>
            <h2 className={`text-4xl md:text-5xl ${headingFont.className} font-bold text-[#1E3A8A]`}>
              Setup is simple.
            </h2>
         </div>

         <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-blue-50 absolute -top-10 -left-6 -z-10 select-none">
                  {step.num}
                </div>
                <h3 className={`text-2xl ${headingFont.className} font-bold text-[#1E3A8A] mb-4`}>{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  )
}

function ComparisonSection() {
  const features = [
    { name: "Cost per month", echo: "$999", human: "$3,200" },
    { name: "Availability", echo: "24/7/365", human: "9 AM - 5 PM" },
    { name: "Capacity", echo: "Unlimited calls", human: "1 call at a time" },
    { name: "Sick Days", echo: "None", human: "10+ days/year" },
    { name: "Booking Speed", echo: "Instant", human: "5-10 minutes" },
  ];

  return (
    <section className="py-32 px-6 bg-[#EFF6FF]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl ${headingFont.className} font-bold text-[#1E3A8A] mb-6`}>
            Math that makes sense.
          </h2>
          <p className="text-slate-500">Why clinics are switching to AI.</p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
          <div className="grid grid-cols-3 p-6 border-b border-blue-50 bg-blue-50/30 text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
            <div className="col-span-1 pl-4">Feature</div>
            <div className="col-span-1 text-center text-blue-600">AI Agent</div>
            <div className="col-span-1 text-center text-slate-400">Human Staff</div>
          </div>

          {features.map((item, i) => (
            <div key={i} className="grid grid-cols-3 p-6 border-b border-blue-50 hover:bg-blue-50/20 transition-colors items-center">
              <div className="col-span-1 font-medium text-[#1E3A8A] pl-4 text-sm md:text-base">{item.name}</div>
              <div className="col-span-1 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                  {item.echo}
                </span>
              </div>
              <div className="col-span-1 text-center text-slate-400 text-sm decoration-slate-300">
                {item.human}
              </div>
            </div>
          ))}
          
          <div className="p-8 bg-blue-600 text-white text-center">
            <p className="mb-4 text-blue-100 font-light">Stop overpaying for phone support.</p>
            <a href={VAPI_DEMO_URL} target="_blank" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors">
              Live Demo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "Is this HIPAA Compliant?", a: "Yes. Our entire infrastructure is encrypted and designed to meet strict HIPAA standards for patient data privacy." },
    { q: "What happens if it doesn't know the answer?", a: "If the AI encounters a complex medical question, it intelligently routes the call to your designated emergency line or human staff." },
    { q: "Does it understand accents?", a: "Absolutely. We use the latest conversational models trained on diverse voice datasets to understand various accents and speech patterns accurately." },
    { q: "Can I customize the voice?", a: "Yes. You can choose from a library of professional voices to match your clinic's brand tone." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-4xl ${headingFont.className} font-bold text-[#1E3A8A] mb-12 text-center`}>
          Common Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
             <div key={i} className="border border-blue-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-blue-50/50 transition-colors"
                >
                  <span className="font-bold text-[#1E3A8A]">{faq.q}</span>
                  {openIndex === i ? <Minus size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-500 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-[#EFF6FF] border-t border-blue-100">
       <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Get In Touch</span>
          <h2 className={`text-4xl md:text-5xl ${headingFont.className} font-bold text-[#1E3A8A] mb-8`}>
            Have specific questions?
          </h2>
          <a 
            href={`mailto:${CONTACT_EMAIL}`} 
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-medium text-blue-600 hover:text-blue-800 transition-colors border-b-2 border-blue-200 hover:border-blue-600 pb-1"
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
            {CONTACT_EMAIL}
          </a>
          <p className="mt-8 text-slate-500 font-light">
            We usually respond within 24 hours.
          </p>
       </div>
    </section>
  )
}

function FooterReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-[#EFF6FF]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
           style={{ scale, borderRadius }}
           className="relative w-full h-full bg-[#172554] flex items-center justify-center will-change-transform"
        >
           <div className="text-center text-white px-6">
              <Star className="w-12 h-12 text-blue-400 mx-auto mb-8 animate-pulse" />
              <h2 className={`text-6xl md:text-9xl ${headingFont.className} font-bold mb-12`}>Ready to modernize?</h2>
              <a href={VAPI_DEMO_URL} target="_blank" className="inline-flex items-center gap-3 text-xl font-medium hover:text-blue-300 transition-colors">
                 Live Demo <ArrowRight className="w-6 h-6" />
              </a>
           </div>
           
           <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  )
}

// =========================================
// 3. MAIN PAGE COMPONENT
// =========================================

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className={`min-h-screen ${bodyFont.className} bg-[#EFF6FF] text-slate-900 selection:bg-[#2563EB] selection:text-white`}>
      
      <nav className="fixed w-full z-50 top-0 left-0 p-6 mix-blend-difference text-white flex justify-between items-center pointer-events-none">
        <div className={`text-2xl font-bold tracking-tight ${headingFont.className} pointer-events-auto`}>AM Intelligence</div>
        <a href={VAPI_DEMO_URL} className="pointer-events-auto text-[10px] font-bold uppercase tracking-widest border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors">
          Live Demo
        </a>
      </nav>

      <Hero />
      <LogoMarquee />
      <AudioPlayer />
      <StickySection />
      <ProcessSection />
      <ComparisonSection />
      <FAQSection />
      <ContactSection />
      <FooterReveal />
      
      <footer className="bg-[#172554] text-blue-200/40 py-8 text-center text-[10px] uppercase tracking-widest border-t border-white/5">
        © 2026 AM Intelligence
      </footer>

    </div>
  );
}
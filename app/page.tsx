"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, CheckCircle2, Globe, Lock, ShieldCheck } from "lucide-react";

export default function TapLandingPage() {
  const [supabase] = useState(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isScrolled, setIsScrolled] = useState(false);

  // Name rotation state for the widget
  const names = ["Adùnní", "Aisha", "Adaobi"];
  const [nameIndex, setNameIndex] = useState(0);

  // Scroll listener for the detachable navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interval for cycling names in the widget
  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % names.length);
    }, 2500); // Changes every 2.5 seconds
    return () => clearInterval(interval);
  }, [names.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      // 23505 = Unique Violation (Email already exists)
      if (error.code === "23505") {
        setStatus("success"); // Treat as success so they see the "Spot secured" message
      } else {
        console.error("Supabase Error:", error.message);
        setStatus("error");
      }
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="bg-[#0B0E14] text-white min-h-screen flex flex-col font-sans selection:bg-[#0066FF]/30 selection:text-white relative">
      
      {/* 1. DETACHABLE FLOATING NAVIGATION */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-500 pt-0 sm:pt-4">
        <nav 
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out w-[95%] sm:w-full max-w-4xl ${
            isScrolled 
              ? "bg-[#0B0E14]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] translate-y-2 sm:translate-y-0" 
              : "px-6 py-5 bg-transparent border border-transparent translate-y-0"
          }`}
        >
          <div className="flex items-baseline font-bold tracking-tighter text-2xl text-white group cursor-pointer">
            tap
            <div className="w-2 h-2 bg-[#0066FF] rounded-full ml-[2px] transition-transform group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(0,102,255,0.8)]"></div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Escrow API</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">Sign In</a>
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors shadow-sm">
              Get Started
            </button>
          </div>
        </nav>
      </div>

      {/* 2. HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 text-center pt-36 pb-0 relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066FF] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl space-y-8 relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066FF]/5 border border-[#0066FF]/20 text-xs font-mono text-[#0066FF] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
            </span>
            tap escrow-engine v1.0.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white"
          >
            Stop losing social media sales to <br className="hidden md:block"/>
            <span className="text-[#0066FF]">fear of scams and friction.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            We are building the checkout and trust layer for African social commerce. 
            Protect your buyers with <strong>50/50 escrow</strong>, kill bank transfer delays, and let returning customers pay in exactly one tap.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="pt-6 w-full max-w-xl"
          >
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
                  <div className="relative w-full sm:w-80">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vendor@instagram.com" 
                      className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0066FF]/50 focus:ring-1 focus:ring-[#0066FF]/50 transition-all placeholder:text-zinc-600 shadow-inner disabled:opacity-50"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full sm:w-auto bg-white text-black px-6 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 hover:scale-[0.98] transition-all whitespace-nowrap disabled:opacity-50"
                  >
                    {status === "loading" ? "Processing..." : "Join Waitlist"}
                    {status !== "loading" && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 text-white bg-[#0066FF]/10 border border-[#0066FF]/20 py-3.5 px-6 rounded-xl backdrop-blur-sm w-full sm:w-auto mx-auto"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0066FF]" />
                  <span className="text-sm font-medium">Spot secured. Welcome to the infrastructure.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="pt-4 flex items-center justify-center gap-2 text-sm text-zinc-500 font-medium"
          >
            <Lock className="w-4 h-4 text-zinc-500" />
            50/50 Escrow Protection • Device-bound 1-Tap Checkout
          </motion.div>
        </div>

        {/* 3. UI/UX APP WIDGET PREVIEW */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 w-full max-w-4xl relative flex items-center justify-center px-4"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-[#0066FF]/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-[380px] bg-[#11141A] border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline font-bold tracking-tighter text-lg text-white">
                tap<div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full ml-[1.5px]"></div>
              </div>
              <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
            </div>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/[0.06]">
              <div className="w-14 h-14 bg-gradient-to-tr from-zinc-800 to-zinc-700 rounded-2xl shadow-inner flex items-center justify-center text-xl font-medium text-white/50 border border-white/5">
                A
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium text-lg tracking-tight">Aura Boutique</h3>
                <p className="text-zinc-500 text-sm">tap.link/pay/aura</p>
              </div>
            </div>

            {/* ANIMATED NAME ROTATION */}
            <div className="text-left mb-6 relative h-16">
              <p className="text-zinc-400 text-sm mb-1">Welcome back,</p>
              <div className="relative h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={nameIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-semibold text-white tracking-tight absolute left-0"
                  >
                    {names[nameIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-[#1A1E26] border border-white/5 rounded-2xl p-4 mb-8 flex justify-between items-center shadow-inner group cursor-pointer hover:border-white/10 transition-colors mt-2">
              <div className="flex items-center gap-3">
                <div className="bg-white px-2 py-1 rounded w-10 h-6 flex items-center justify-center">
                  <span className="text-[10px] font-black text-[#1434CB] tracking-tighter">VISA</span>
                </div>
                <span className="text-zinc-300 font-mono text-sm tracking-widest">•••• 4321</span>
              </div>
              <span className="text-white font-semibold text-lg">₦45,000</span>
            </div>

            <button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-4 rounded-xl font-medium text-base transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]">
              Pay in One Tap
            </button>
            
            <p className="text-center text-[#888] text-xs mt-5 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secured by tap. 12-Hour Escrow
            </p>
          </div>
        </motion.div>
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-white/[0.04] pt-24 pb-12 bg-[#0B0E14] relative z-20 mt-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-baseline font-bold tracking-tighter text-2xl text-white">
              tap<div className="w-2 h-2 bg-[#0066FF] rounded-full ml-[2px]"></div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed pr-4">
              Escrow and 1-tap checkout infrastructure for African social commerce.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Product</h4>
            <ul className="text-sm text-zinc-500 space-y-4 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Escrow Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Bot</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Company</h4>
            <ul className="text-sm text-zinc-500 space-y-4 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="https://www.linkedin.com/company/usetap" target="_blank" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Status</h4>
            <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/[0.05] w-fit px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-zinc-400 font-medium">Systems Operational</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-white/[0.04] pt-8 text-zinc-600 text-[11px] tracking-widest uppercase font-semibold">
          <div className="mb-4 md:mb-0">© 2026 tap. infrastructure</div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 border-white/10 pl-4">
              <Globe size={12} />
              <span>NG-LOS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function TapLandingPage() {
  // THE FIX: Lazy initialize Supabase inside state so it only runs once
  const [supabase] = useState(() => 
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const { error } = await supabase.from("waitlist").insert([{ email }]);
    
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#007AFF]/30 selection:text-white">
      
      {/* 1. TOP-LEFT NAVIGATION */}
      <nav className="border-b border-white/[0.08] bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* THE LOGO: Perfectly round div docked to the baseline */}
          <div className="flex items-end cursor-pointer group pb-1">
            <span className="text-2xl font-bold tracking-tighter text-white leading-none">tap</span>
            <div className="w-2 h-2 bg-[#007AFF] rounded-full ml-[2px] mb-[2px] shadow-[0_0_10px_rgba(0,122,255,0.8)] transition-all group-hover:shadow-[0_0_15px_rgba(0,122,255,1)]" />
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm text-[#888]">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <button className="bg-white text-black px-3 py-1.5 rounded-md font-medium text-xs hover:bg-[#eaeaea] transition-all">
              Launch Console
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION & GRID BACKGROUND */}
      <main className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0 opacity-[0.15]" 
             style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Alpha Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-full px-3 py-1 mb-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF]">The Alpha Build</span>
              <div className="w-px h-3 bg-[#007AFF]/20" />
              <span className="text-[10px] text-[#007AFF]/80">Currently onboarding SMEs</span>
            </motion.div>

            {/* THE COPY: Local Context & Questions */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
            >
              How many sales have you lost <br />
              <span className="text-[#888]">to OTP and network wahala?</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[#888] mb-12 max-w-xl leading-relaxed"
            >
              We are building the <strong>"Shop Pay"</strong> for online shopping in Nigeria. 
              Eliminate 16-digit card forms and delayed bank OTPs. We use secure device-recognition to let your returning customers pay in exactly one tap. Feel the magic.
            </motion.p>

            {/* WAITLIST FORM */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="max-w-md"
            >
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="merchant@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#007AFF]/50 transition-all placeholder:text-white/20"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-white text-black font-semibold px-6 py-3 rounded-lg text-sm flex items-center justify-center space-x-2 hover:bg-[#eaeaea] transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? "Processing..." : "Tap to join waitlist"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center space-x-3 text-[#007AFF] bg-[#007AFF]/10 border border-[#007AFF]/20 p-4 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Spot secured. Welcome to the infrastructure.</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {status === "error" && (
                <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* 3. MULTI-COLUMN FOOTER */}
      <footer className="border-t border-white/[0.08] pt-20 pb-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1 space-y-4">
            
            {/* FOOTER LOGO */}
            <div className="flex items-end mb-4 pb-1">
              <span className="text-xl font-bold tracking-tighter text-white leading-none">tap</span>
              <div className="w-1.5 h-1.5 bg-[#007AFF] rounded-full ml-[2px] mb-[2px]" />
            </div>
            
            <p className="text-sm text-[#888] leading-relaxed">
              Building the identity layer for frictionless African commerce.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="text-sm text-[#888] space-y-4 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">One-Tap API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="text-sm text-[#888] space-y-4 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-[#888] font-medium">Systems Operational</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR WITH SVGs */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-white/[0.05] pt-8 text-[#444] text-[11px] tracking-widest uppercase font-semibold">
          <div className="mb-4 md:mb-0">© 2026 tap. infrastructure</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <div className="flex items-center space-x-1 ml-4 border-l border-white/10 pl-4">
              <Globe size={12} />
              <span>NG-LOS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
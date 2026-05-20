"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Sparkles, TrendingUp, TrendingDown, ScanFace, Activity, AlertTriangle, Layers, Tag, Camera, Loader2, Info, X, Zap, Newspaper, BarChart3, Globe, Flame, Crosshair, MapPin } from "lucide-react";
import Image from "next/image";

type AnalysisResult = {
  viralPotentialScore: number;
  genZAppeal: string;
  tiktokFit: string;
  streetwearRelevance: string;
  designUniqueness: string;
  styleTags: string[];
  fashionDNA: {
    style: string;
    percentage: number;
  }[];
  aestheticAnalysis: string;
  audiencePersona: {
    ageDemographic: string;
    interests: string[];
    behavioralTraits: string;
    purchasingPower: string;
  };
  marketingCampaign: {
    tiktokCaption: string;
    instagramCaption: string;
    theme: string;
    hashtags: string[];
  };
  marketRisk: {
    riskRating: string;
    designWeaknesses: string;
    recommendations: string;
    validationBasis: string;
  };
};

export default function HypeMeter() {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const analyzerRef = useRef<HTMLElement>(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const MAX_USAGE = 3;
  const [usageCount, setUsageCount] = useState<number>(0);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hypemeter_usage");
    if (stored) {
      const { count, date } = JSON.parse(stored);
      if (new Date(date).toDateString() === new Date().toDateString()) {
        setUsageCount(count);
      } else {
        localStorage.setItem("hypemeter_usage", JSON.stringify({ count: 0, date: new Date().toISOString() }));
      }
    }
  }, []);

  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("hypemeter_usage", JSON.stringify({ count: newCount, date: new Date().toISOString() }));
  };

  const [showAllDrops, setShowAllDrops] = useState(false);

  const mockDrops = [
    { id: 1, label: "CHAOS", image: "https://images.unsplash.com/photo-1523398002811-999aa8d9512e?auto=format&fit=crop&w=400&q=80", hype: 94, tags: "Archive Streetwear", title: "Chaos Theory Washed Tee", brand: "@skenafit.id", avatar: "https://i.pravatar.cc/100?img=11" },
    { id: 2, label: "NEO-TX", image: "https://images.unsplash.com/photo-1550614000-4b95dd247547?auto=format&fit=crop&w=400&q=80", hype: 91, tags: "Cybercore Utility", title: "Neon Stitch Cargo Zip", brand: "@archivebdg", avatar: "https://i.pravatar.cc/100?img=12" },
    { id: 3, label: "GLITCH", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", hype: 88, tags: "Y2K Cyber", title: "Glitch Star Zip-Up", brand: "@y2k_indo", avatar: "https://i.pravatar.cc/100?img=13" },
    { id: 4, label: "RACING", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80", hype: 85, tags: "Racing-core", title: "Vintage Grand Prix Jacket", brand: "@racingsupply.jkt", avatar: "https://i.pravatar.cc/100?img=14" },
    { id: 5, label: "BOXY", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=400&q=80", hype: 95, tags: "Minimalist", title: "Washed Black Boxy Tee", brand: "@basicdistro", avatar: "https://i.pravatar.cc/100?img=15" },
    { id: 6, label: "DENIM", image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=400&q=80", hype: 89, tags: "Workwear", title: "Heavyweight Denim Shirt", brand: "@jkt_denim", avatar: "https://i.pravatar.cc/100?img=16" },
    { id: 7, label: "GORP", image: "https://images.unsplash.com/photo-1489987707023-af0825ae1fa3?auto=format&fit=crop&w=400&q=80", hype: 92, tags: "Gorpcore", title: "Alpha Multi-pocket Vest", brand: "@outdoorskena", avatar: "https://i.pravatar.cc/100?img=17" },
    { id: 8, label: "JERSEY", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=80", hype: 96, tags: "Bloke-core", title: "Retro Football Jersey", brand: "@football_casuals", avatar: "https://i.pravatar.cc/100?img=18" },
    { id: 9, label: "TECH", image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=400&q=80", hype: 84, tags: "Techwear", title: "Midnight Shell Jacket", brand: "@techwear.id", avatar: "https://i.pravatar.cc/100?img=19" },
    { id: 10, label: "OPIUM", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=400&q=80", hype: 97, tags: "Opium Style", title: "Vampire Leather Zip", brand: "@opiumfits", avatar: "https://i.pravatar.cc/100?img=20" },
    { id: 11, label: "SKATE", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80", hype: 82, tags: "Skate-core", title: "Baggy Washed Denim", brand: "@skateindo", avatar: "https://i.pravatar.cc/100?img=21" },
    { id: 12, label: "VINTAGE", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80", hype: 90, tags: "Vintage 90s", title: "Faded Graphic Knit", brand: "@vintagehub_jkt", avatar: "https://i.pravatar.cc/100?img=22" },
  ];

  const displayedDrops = showAllDrops ? mockDrops : mockDrops.slice(0, 4);

  const fallbackData: AnalysisResult = {
    viralPotentialScore: 92,
    genZAppeal: "Sangat Tinggi",
    tiktokFit: "Sangat FYP",
    streetwearRelevance: "Kuat",
    designUniqueness: "Tinggi",
    styleTags: ["Cybercore", "Streetwear Lokal", "Y2K Skena"],
    fashionDNA: [
      { style: "Tokyo Streetwear", percentage: 40 },
      { style: "Cyber Y2K", percentage: 35 },
      { style: "Gorpcore / Techwear", percentage: 25 },
    ],
    aestheticAnalysis: "Bahasa visual sangat cocok dengan tren Gen Z TikTok Indonesia Q2 2026. Tipografi high-contrast memicu daya tarik visual secara instan.",
    audiencePersona: {
      ageDemographic: "17-24 (Gen Z)",
      interests: ["Sneakerhead", "Kultur Skena", "Fashion TikTok"],
      behavioralTraits: "FOMO tinggi, pembeli impulsif saat gajian",
      purchasingPower: "Menengah (Rp 150rb - 350rb)",
    },
    marketingCampaign: {
      tiktokCaption: "POV: lo nemu kaos yang vibesnya mirip banget sama street culture Tokyo. 🛹 #LokalPride #OutfitSkena",
      instagramCaption: "Ghost in the Shell, Soul in the Street. Drop koleksi terbatas minggu ini.",
      theme: "Fotoshoot malam di stasiun MRT / Underpass dengan lighting neon.",
      hashtags: ["StreetwearIndo", "FashionLokal", "OotdSkena"],
    },
    marketRisk: {
      riskRating: "Sedang",
      designWeaknesses: "Gaya font Y2K sudah mulai jenuh di pasar lokal (banyak di TikTok Shop). Tanpa keunikan tambahan, desain ini bisa dianggap pasaran.",
      recommendations: "Tambahkan elemen unfinished (rebel) atau sablon plastisol dengan efek timbul (high-density) agar terasa lebih eksklusif dan bisa dijual di atas harga rata-rata kompetitor.",
      validationBasis: "Penilaian didasarkan pada saturasi tren desain di TikTok Shop Indonesia saat ini dan komparasi dengan standar visual brand lokal papan atas. Skor tinggi pada potensi viral didapat dari kombinasi warna neon yang terbukti retention rate-nya tinggi di FYP TikTok."
    },
  };

  const handleUploadFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLimitAlert(false);
    setWarning(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFrontImage(event.target?.result as string);
      scrollToAnalyzer();
    };
    reader.readAsDataURL(file);
  };

  const handleUploadBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBackImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!frontImage) return;

    if (usageCount >= MAX_USAGE) {
      setShowLimitAlert(true);
      return;
    }

    setIsScanning(true);
    setResult(null);
    setError(null);

    try {
      incrementUsage();
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontImage, backImage }),
      });

      if (!res.ok) throw new Error("API Limit or Configuration Error");
      
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.warn("API Error, using fallback data:", err);
      setWarning("Gagal mencapai Live API AI. Menampilkan data demo sebagai fallback.");
      setResult(fallbackData);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 font-sans selection:bg-[#39FF14]/30 text-[#E6E6E6]">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#0B0B0C]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#39FF14] blur-[2px] shadow-[0_0_10px_#39FF14] flex items-center justify-center"></div>
            <h1 className="font-display font-black text-2xl tracking-tighter uppercase italic text-white">HypeMeter AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden md:flex w-48">
              <div className="flex justify-between w-full mb-1">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Sisa Kuota</span>
                <span className="text-[10px] font-mono font-bold text-[#39FF14]">
                  <span className={usageCount >= MAX_USAGE ? "text-red-500" : ""}>{MAX_USAGE - usageCount}</span> / {MAX_USAGE}
                </span>
              </div>
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-1">
                <div 
                  className={`h-full transition-all duration-500 ${usageCount >= MAX_USAGE ? 'bg-red-500' : 'bg-[#39FF14]'}`} 
                  style={{ width: `${Math.max(0, ((MAX_USAGE - usageCount) / MAX_USAGE) * 100)}%` }}
                ></div>
              </div>
              <button 
                onClick={() => setShowLimitAlert(true)}
                className="text-[8px] font-mono uppercase tracking-widest text-[#39FF14]/80 hover:text-[#39FF14] transition-colors cursor-pointer w-full text-right mt-1"
              >
                + Upgrade Kuota
              </button>
            </div>
            <div className="text-sm font-mono text-[#39FF14]/80 bg-[#39FF14]/10 px-3 py-1 rounded-sm border border-[#39FF14]/20 uppercase tracking-widest font-black">
              BETA V1.0
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-7xl mx-auto relative">
        <AnimatePresence>
          {showLimitAlert && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 rounded-xl border border-red-500/30 bg-black/95 backdrop-blur-xl shadow-2xl flex items-start gap-4"
            >
              <div className="p-2 border border-red-500/20 bg-red-500/10 rounded-full shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-black italic uppercase tracking-tighter text-white text-lg">Batas Kuota Tercapai</h4>
                <p className="text-xs text-white/60 leading-relaxed mt-1 mb-3">
                  Kamu telah memakai semua {MAX_USAGE} kuota gratis hari ini. Silakan coba kembali besok atau upgrade paket berlangganan untuk akses tak terbatas.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setShowLimitAlert(false)} className="px-4 py-2 border border-white/10 rounded-sm text-[10px] uppercase font-bold tracking-widest text-white/80 hover:bg-white/5 transition-colors cursor-pointer">
                    Tutup
                  </button>
                  <button className="px-4 py-2 border border-[#39FF14]/30 bg-[#39FF14]/10 rounded-sm text-[10px] uppercase font-bold tracking-widest text-[#39FF14] hover:bg-[#39FF14]/20 transition-colors cursor-pointer">
                    Upgrade Paket
                  </button>
                </div>
              </div>
              <button onClick={() => setShowLimitAlert(false)} className="text-white/40 hover:text-white transition-colors shrink-0 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {warning && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 border border-[#39FF14]/30 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#39FF14]" />
                <span className="text-sm font-mono text-white/80">{warning}</span>
              </div>
              <button onClick={() => setWarning(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEW HERO CINEMATIC */}
        {(!result && !isScanning) && (
          <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center -mt-32 pt-32 pb-20 overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 z-0">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />
               <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#0B0B0C] via-transparent to-transparent z-10" />
               <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent z-10" />
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/indo-streetwear/1920/1080')] opacity-20 mix-blend-screen object-cover" />
             </div>
             
             <div className="relative z-20 flex flex-col items-center px-4 max-w-5xl mx-auto mt-20">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-md"
               >
                 <Sparkles className="w-4 h-4 text-[#39FF14]" />
                 <span className="text-white/80 font-mono text-[10px] uppercase tracking-widest">Indonesia Fashion Intelligence</span>
               </motion.div>

               <motion.h1 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                 className="font-display text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white mb-6 leading-[0.9] uppercase"
               >
                 Fashion Lokal <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#39FF14]/70">Tidak Butuh Tebakan</span>
                 <br />Lagi.
               </motion.h1>

               <motion.p 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-light font-sans"
               >
                 AI-powered fashion intelligence untuk memahami trend Gen-Z Indonesia, perilaku pasar distro lokal, dan mengukur potensi hype desain streetwear sebelum rilis.
               </motion.p>
               
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                 className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
               >
                 <button onClick={scrollToAnalyzer} className="w-full sm:w-auto px-8 py-4 bg-[#39FF14] text-black font-black italic uppercase tracking-widest text-sm rounded-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                   Analisis Desain
                 </button>
                 <button onClick={() => { document.getElementById('trends')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-black italic uppercase tracking-widest text-sm rounded-sm hover:bg-white/10 transition-all backdrop-blur-md">
                   Lihat Trend Indonesia
                 </button>
               </motion.div>
             </div>
          </section>
        )}

        {/* ECOSYSTEM: Daily Insight */}
        <div className="mb-12 border border-[#39FF14]/30 bg-[#39FF14]/5 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="bg-[#39FF14]/20 p-3 rounded-full shrink-0 border border-[#39FF14]/30 relative z-10">
            <Zap className="w-6 h-6 text-[#39FF14]" />
          </div>
          <div className="relative z-10 flex-1">
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#39FF14] mb-2 font-bold">Today's Fashion Insight</h4>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans italic">
              "Washed black oversized tees dengan grafis minimalis di area punggung (back-print) saat ini memiliki konversi 40% lebih tinggi dibanding grafis mencolok di dada pada pasar Gen-Z Indonesia (Q3 2026)."
            </p>
          </div>
        </div>

        {/* ECOSYSTEM: Live Trend Radar */}
        <div id="trends" className="mb-20 pt-16 -mt-16">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Activity className="w-5 h-5 text-white/50" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white">Live Trend Radar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Trending Aesthetics */}
            <div className="p-5 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col h-full hover:bg-white/[0.04] transition-colors cursor-crosshair relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 blur-xl rounded-full group-hover:bg-orange-500/20 transition-colors" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2 relative z-10"><Flame className="w-3 h-3 text-orange-500"/> Sinyal Estetika Indo</div>
              <ul className="space-y-3 flex-1 relative z-10">
                <li className="flex justify-between items-center"><span className="text-sm font-bold text-white">Outfit Skena</span><span className="text-[#39FF14] font-mono text-[10px]">+48%</span></li>
                <li className="flex justify-between items-center"><span className="text-sm font-bold text-white">Jersey-core Vintage</span><span className="text-[#39FF14] font-mono text-[10px]">+32%</span></li>
                <li className="flex justify-between items-center"><span className="text-sm font-bold text-white">Archive Streetwear</span><span className="text-[#39FF14] font-mono text-[10px]">+24%</span></li>
                <li className="flex justify-between items-center"><span className="text-sm font-bold text-white/50">Old Money Fit</span><span className="text-red-400 font-mono text-[10px]">-15%</span></li>
              </ul>
            </div>
            
            {/* Regional Pulse */}
            <div className="p-5 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col h-full hover:bg-white/[0.04] transition-colors cursor-crosshair relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-400/10 blur-xl rounded-full group-hover:bg-cyan-400/20 transition-colors" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2 relative z-10"><Globe className="w-3 h-3 text-cyan-400"/> Regional Pulse</div>
              <div className="flex flex-col gap-3 flex-1 relative z-10">
                <div className="flex items-start justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 mb-1"><MapPin className="w-3 h-3 text-[#39FF14]" /><span className="text-xs font-bold text-white">Jakarta Selatan</span></div>
                  <span className="text-[9px] text-[#39FF14] uppercase font-mono">Archive +37%</span>
                </div>
                <div className="flex items-start justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 mb-1"><MapPin className="w-3 h-3 text-[#39FF14]" /><span className="text-xs font-bold text-white">Bandung</span></div>
                  <span className="text-[9px] text-[#39FF14] uppercase font-mono text-right max-w-[80px]">Anime Fit Booming</span>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-1"><MapPin className="w-3 h-3 text-[#39FF14]" /><span className="text-xs font-bold text-white">Surabaya</span></div>
                  <span className="text-[9px] text-[#39FF14] uppercase font-mono">Oversized Naik</span>
                </div>
              </div>
            </div>

            {/* Trending Keywords */}
            <div className="p-5 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col h-full hover:bg-white/[0.04] transition-colors cursor-crosshair relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 blur-xl rounded-full group-hover:bg-pink-500/20 transition-colors" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2 relative z-10"><Tag className="w-3 h-3 text-pink-500"/> Shopee / TikTok Search</div>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-2 py-1 border border-[#39FF14]/50 text-[#39FF14] bg-[#39FF14]/10 text-xs font-mono uppercase rounded-sm">kaos backprint</span>
                <span className="px-2 py-1 bg-white/10 border border-white/10 text-xs font-mono uppercase rounded-sm hover:border-white/30 text-white/80 transition-colors">baju oversized</span>
                <span className="px-2 py-1 bg-white/10 border border-white/10 text-xs font-mono uppercase rounded-sm hover:border-white/30 text-white/80 transition-colors">celana baggy</span>
                <span className="px-2 py-1 bg-white/10 border border-white/10 text-xs font-mono uppercase rounded-sm hover:border-white/30 text-white/80 transition-colors">jersey vintage</span>
                <span className="px-2 py-1 bg-white/10 border border-white/10 text-xs font-mono uppercase rounded-sm hover:border-white/30 text-white/80 transition-colors">washed tee</span>
              </div>
            </div>

            {/* Hype Index */}
            <div className="p-5 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col h-full hover:bg-white/[0.04] transition-colors cursor-crosshair relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2 relative z-10"><BarChart3 className="w-3 h-3 text-blue-400"/> TikTok Viral Hashtags</div>
              <ul className="space-y-3 flex-1 relative z-10">
                <li className="flex justify-between items-center"><span className="text-xs font-bold text-white">#streetwearindo</span><span className="text-xs">🔥🔥🔥🔥🔥</span></li>
                <li className="flex justify-between items-center"><span className="text-xs font-bold text-white">#outfitskena</span><span className="text-xs">🔥🔥🔥🔥</span></li>
                <li className="flex justify-between items-center"><span className="text-xs font-bold text-white">#kaosoversize</span><span className="text-xs">🔥🔥🔥🔥</span></li>
                <li className="flex justify-between items-center"><span className="text-xs font-bold text-white/50">#distrolokal</span><span className="text-xs grayscale">🔥</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ECOSYSTEM: Fashion Intelligence Feed */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5 text-white/50" />
              <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white">Fashion Intelligence Feed</h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded">Live Updates</span>
          </div>

          <div className="space-y-4">
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/[0.04] transition-colors cursor-crosshair">
               <div className="w-12 h-12 bg-[#39FF14]/10 rounded-full flex items-center justify-center shrink-0 border border-[#39FF14]/20 hidden md:flex">
                 <TrendingUp className="w-5 h-5 text-[#39FF14]" />
               </div>
               <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-2">
                   <h3 className="font-bold text-white text-base">Japanese racing jackets are rising 43% this week</h3>
                   <span className="px-2 py-0.5 bg-white/10 text-[9px] font-mono text-white/60 rounded uppercase tracking-wider">Global Trend</span>
                 </div>
                 <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                   Analysis across TikTok and Pinterest shows a massive spike in vintage racing aesthetics, driven by recent celebrity streetwear sightings and archive fashion accounts.
                 </p>
               </div>
               <div className="text-left md:text-right shrink-0 mt-4 md:mt-0 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                 <div className="text-[10px] font-mono text-white/40 mb-1">MARKET IMPACT</div>
                 <div className="text-sm font-black italic text-[#39FF14]">HIGH</div>
               </div>
            </div>

            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/[0.04] transition-colors cursor-crosshair">
               <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center shrink-0 border border-red-500/20 hidden md:flex">
                 <TrendingDown className="w-5 h-5 text-red-400" />
               </div>
               <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-2">
                   <h3 className="font-bold text-white text-base">Chrome typography aesthetics declining among Gen Z</h3>
                   <span className="px-2 py-0.5 bg-white/10 text-[9px] font-mono text-white/60 rounded uppercase tracking-wider">Local Insight</span>
                 </div>
                 <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                   Y2K chrome logos have reached saturation. Data suggests a shift towards brutalist serif fonts and clean, minimal typography for high-end streetwear positioning.
                 </p>
               </div>
               <div className="text-left md:text-right shrink-0 mt-4 md:mt-0 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                 <div className="text-[10px] font-mono text-white/40 mb-1">MARKET IMPACT</div>
                 <div className="text-sm font-black italic text-red-400">MODERATE</div>
               </div>
            </div>

            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/[0.04] transition-colors cursor-crosshair">
               <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0 border border-blue-500/20 hidden md:flex">
                 <Activity className="w-5 h-5 text-blue-400" />
               </div>
               <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-2">
                   <h3 className="font-bold text-white text-base">Dark utilitywear gaining traction in Indonesia</h3>
                   <span className="px-2 py-0.5 bg-white/10 text-[9px] font-mono text-white/60 rounded uppercase tracking-wider">Regional Data</span>
                 </div>
                 <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                   Local distro and TikTok shop data indicates a 22% increase in searches for multi-pocket cargos, tactical vests, and washed canvas materials suitable for tropical climates.
                 </p>
               </div>
               <div className="text-left md:text-right shrink-0 mt-4 md:mt-0 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                 <div className="text-[10px] font-mono text-white/40 mb-1">MARKET IMPACT</div>
                 <div className="text-sm font-black italic text-blue-400">RISING</div>
               </div>
            </div>
          </div>
        </div>

        {/* THE ANALYZER SECTION */}
        <section ref={analyzerRef} className="pt-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
             <Crosshair className="w-5 h-5 text-white/50" />
             <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white">Launch Predictor Engine</h2>
          </div>

        <AnimatePresence mode="wait">
          {(!result && !isScanning) && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center mt-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                <span className="text-white/80">Kecerdasan Buatan Untuk Fashion Lokal</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-black italic tracking-tighter text-white mb-4 max-w-4xl leading-[1.1] uppercase">
                Uji Desain Kamu Sekarang.
              </h2>
              
              <p className="text-sm md:text-base text-white/50 max-w-2xl mb-12 font-light">
                Unggah desain streetwear, mockup, atau artwork. AI kami akan membedah estetika, menguji daya tarik Gen Z Indo, dan memberikan strategi kampanye. (Belakang / Back Print sangat disarankan)
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-8">
                <div 
                  onClick={() => frontInputRef.current?.click()}
                  className="flex-1 group relative h-48 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                >
                  {frontImage ? (
                    <img src={frontImage} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xl">
                        <Upload className="w-5 h-5 text-[#39FF14]" />
                      </div>
                      <h3 className="text-sm font-black italic uppercase tracking-tighter text-white mb-1 font-display">Tampak Depan (Wajib)</h3>
                    </>
                  )}
                  <input type="file" ref={frontInputRef} onChange={handleUploadFront} accept="image/*" className="hidden" />
                </div>

                <div 
                  onClick={() => backInputRef.current?.click()}
                  className="flex-1 group relative h-48 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                >
                  {backImage ? (
                    <img src={backImage} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xl">
                        <Upload className="w-5 h-5 text-white/40 group-hover:text-white" />
                      </div>
                      <h3 className="text-sm font-black italic uppercase tracking-tighter text-white/60 group-hover:text-white mb-1 font-display transition-colors">Tampak Belakang (Opsional)</h3>
                    </>
                  )}
                  <input type="file" ref={backInputRef} onChange={handleUploadBack} accept="image/*" className="hidden" />
                </div>
              </div>

              <button 
                disabled={!frontImage || isScanning}
                onClick={handleAnalyze} 
                className={`flex items-center gap-2 px-8 py-4 font-black italic uppercase tracking-widest text-sm rounded-sm transition-all ${
                  frontImage && !isScanning ? 'bg-[#39FF14] text-black hover:bg-white hover:text-black hover:scale-105 shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                }`}
              >
                {isScanning ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Menganalisis...</>
                ) : 'Analisis Fashion Sekarang'}
              </button>
            </motion.div>
          )}

          {(isScanning || result) && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {error ? (
                <div className="w-full max-w-2xl p-8 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex flex-col items-center text-center justify-center mt-12">
                  <AlertTriangle className="w-8 h-8 mb-4 border border-red-500/20 p-2 rounded-full" />
                  <p className="font-mono text-sm uppercase">{error}</p>
                </div>
              ) : !result ? (
                <div className="w-full flex flex-col lg:flex-row gap-6 justify-center">
                  <div className="relative w-full max-w-xl mx-auto rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-xl flex justify-center items-center min-h-[400px]">
                    <div className="flex w-full h-full absolute inset-0">
                      <img 
                        src={frontImage as string} 
                        alt="Uploaded front design" 
                        className="w-full h-full object-cover opacity-50 mix-blend-screen blur-sm contrast-125 brightness-50"
                      />
                      {backImage && (
                        <img 
                          src={backImage as string} 
                          alt="Uploaded back design" 
                          className="w-full h-full object-cover opacity-50 mix-blend-screen blur-sm contrast-125 brightness-50"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <motion.div 
                        className="w-full h-1 bg-[#39FF14]/80 shadow-[0_0_20px_rgba(57,255,20,0.8)]"
                        animate={{ y: ["0%", "800%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md">
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
                          <div className="text-[#39FF14] font-mono text-sm tracking-widest uppercase">
                            AI Sedang Menganalisis...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="w-full flex flex-col"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                >
                  {/* Top Level: 3 Columns Desktop / 1 Col Mobile */}
                  <div className="w-full flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Column (3/12 logic approx) */}
                    <div className="w-full lg:w-[30%] flex flex-col gap-6">
                      {/* Vibe Score Card */}
                      <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#39FF14]/10 blur-[80px] rounded-full" />
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-[#39FF14]">
                            <TrendingUp className="w-5 h-4" />
                            <span className="font-mono text-[10px] tracking-widest uppercase">Potensi Viral</span>
                          </div>
                        </div>
                        <h3 className="font-display text-7xl font-black italic tracking-tighter text-white mb-6">
                          {result.viralPotentialScore}<span className="text-white/30 text-3xl">%</span>
                        </h3>
                        
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <div className="text-white/40 text-[9px] tracking-[0.1em] font-bold uppercase">Daya Tarik Gen-Z</div>
                            <div className="text-white font-mono font-bold text-xs uppercase">{result.genZAppeal}</div>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <div className="text-white/40 text-[9px] tracking-[0.1em] font-bold uppercase">Potensi FYP</div>
                            <div className="text-[#39FF14] font-mono font-bold text-xs uppercase">{result.tiktokFit}</div>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <div className="text-white/40 text-[9px] tracking-[0.1em] font-bold uppercase">Streetwear Trend</div>
                            <div className="text-white font-mono font-bold text-xs uppercase">{result.streetwearRelevance}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-white/40 text-[9px] tracking-[0.1em] font-bold uppercase">Keunikan</div>
                            <div className="text-white font-mono font-bold text-xs uppercase">{result.designUniqueness}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Style Identity & Fashion DNA */}
                      <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 text-white/50 mb-6">
                          <Tag className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Identitas Estetika & DNA</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {result.styleTags.map(tag => (
                            <div key={tag} className="px-3 py-1.5 rounded-sm bg-white/10 border border-white/5 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                              {tag}
                            </div>
                          ))}
                        </div>
                        
                        {/* Fashion DNA Bars */}
                        <div className="space-y-4 mb-6">
                          {result.fashionDNA?.map((dna, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-[10px] uppercase text-white/80">{dna.style}</span>
                                <span className="font-mono text-[10px] font-bold text-[#39FF14]">{dna.percentage}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dna.percentage}%` }}
                                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (idx * 0.2) }}
                                  className="h-full bg-[#39FF14] rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-white/60 leading-relaxed italic border-t border-white/5 pt-4">
                          "{result.aestheticAnalysis}"
                        </p>
                      </motion.div>
                    </div>

                    {/* Center Column (Image) (4/12 logic approx) */}
                    <div className="w-full lg:w-[40%] flex flex-col">
                      <div className="relative h-full w-full rounded-xl border border-white/10 bg-[#141416] overflow-hidden flex flex-col justify-center items-center p-4">
                        <div className="absolute top-4 left-4 z-20 bg-black/80 px-3 py-1 rounded border border-[#39FF14]/30">
                          <span className="text-[9px] font-mono text-[#39FF14] tracking-widest uppercase">Analisis Visual Selesai</span>
                        </div>
                        <button 
                          onClick={() => {setFrontImage(null); setBackImage(null); setResult(null);}}
                          className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 text-[9px] font-mono uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Ulangi
                        </button>
                        <div className={`grid gap-4 w-full h-full p-8 ${backImage ? 'grid-cols-2 lg:grid-cols-1' : 'grid-cols-1'}`}>
                          <img 
                            src={frontImage as string} 
                            alt="Front Uploaded frame" 
                            className="w-full object-contain max-h-[600px] lg:max-h-[300px] h-full rounded-lg shadow-2xl"
                          />
                          {backImage && (
                            <img 
                              src={backImage as string} 
                              alt="Back Uploaded frame" 
                              className="w-full object-contain max-h-[600px] lg:max-h-[300px] h-full rounded-lg shadow-2xl"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (3/12 logic approx) */}
                    <div className="w-full lg:w-[30%] flex flex-col gap-6">
                      
                      {/* Target Persona */}
                      <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 text-white/50 mb-6">
                          <ScanFace className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Target Persona</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.audiencePersona.interests.map(interest => (
                            <span key={interest} className="text-[9px] font-bold bg-white/10 px-2 py-1 uppercase tracking-wider">{interest}</span>
                          ))}
                        </div>
                        <div className="space-y-4 border-t border-white/5 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/40 text-[10px] uppercase tracking-widest">Usia</span>
                            <span className="text-white font-mono text-xs font-bold">{result.audiencePersona.ageDemographic}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/40 text-[10px] uppercase tracking-widest">Daya Beli</span>
                            <span className="text-white font-mono text-xs font-bold uppercase">{result.audiencePersona.purchasingPower}</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Karakter</span>
                            <span className="text-[#39FF14] text-xs text-right max-w-[150px] font-mono leading-tight">{result.audiencePersona.behavioralTraits}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Campaign Strategy */}
                      <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-white/50 mb-6">
                          <Camera className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Strategi Campaign</span>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="space-y-2">
                            <div className="text-[#39FF14] text-[9px] font-mono tracking-widest uppercase">// TikTok Hook</div>
                            <div className="p-3 bg-white/5 border border-white/10 text-[11px] text-white/90 leading-relaxed font-sans italic rounded-sm">
                              &quot;{result.marketingCampaign.tiktokCaption}&quot;
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-[#39FF14] text-[9px] font-mono tracking-widest uppercase">// Tema Editorial</div>
                            <h4 className="text-lg font-black italic tracking-tighter uppercase leading-tight text-white">
                              {result.marketingCampaign.theme}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.marketingCampaign.hashtags.map(h => (
                               <span key={h} className="text-[9px] text-white/40 uppercase tracking-widest font-mono">#{h.replace('#','')}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </div> 

                  {/* Bottom Row / Insights */}
                  <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Risk Analysis */}
                    <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="w-full lg:w-1/2 p-6 rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4 border-b border-red-500/20 pb-4">
                        <div className="flex items-center gap-2 text-red-500">
                          <Layers className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Analisis Risiko Pasar RI</span>
                        </div>
                        <div className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-sm ${result.marketRisk.riskRating.toLowerCase() === 'high' || result.marketRisk.riskRating.toLowerCase() === 'tinggi' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/40'}`}>
                          Risiko {result.marketRisk.riskRating}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <div className="text-red-400/60 text-[9px] font-mono tracking-widest uppercase mb-2">// Kelemahan Desain</div>
                          <p className="text-xs text-red-100 leading-relaxed opacity-90">{result.marketRisk.designWeaknesses}</p>
                        </div>
                        <div>
                          <div className="text-[#39FF14]/80 text-[9px] font-mono tracking-widest uppercase mb-2">// Saran Strategis</div>
                          <p className="text-xs text-white/90 leading-relaxed font-bold">{result.marketRisk.recommendations}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Validation Basis */}
                    <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="w-full lg:w-1/2 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-white/50 mb-4 border-b border-white/10 pb-4">
                        <Activity className="w-4 h-4" />
                        <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Dasar Penilaian & Validasi AI</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed italic font-sans pr-4">
                        {result.marketRisk.validationBasis}
                      </p>
                    </motion.div>
                  </div>

                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </section>

        {/* ECOSYSTEM: Community Showcase (Mock) */}
        <section className="mb-24 mt-20">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
             <div className="flex items-center gap-3">
               <Sparkles className="w-5 h-5 text-white/50" />
               <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white">Top Hype Drops Today</h2>
             </div>
             <button 
               onClick={() => setShowAllDrops(!showAllDrops)}
               className="text-[10px] font-mono uppercase tracking-widest text-[#39FF14] hover:underline"
             >
               {showAllDrops ? "View Less" : "View All"}
             </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <AnimatePresence>
               {displayedDrops.map((drop) => (
                 <motion.div 
                   key={drop.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.4 }}
                   className="group border border-white/10 bg-white/[0.02] rounded-xl overflow-hidden hover:border-[#39FF14]/50 transition-colors"
                 >
                   <div className="h-48 bg-[#141416] w-full relative overflow-hidden flex flex-col justify-center items-center">
                      <span className="text-white font-display font-black text-3xl italic tracking-tighter uppercase opacity-50 relative z-10">{drop.label}</span>
                      <img src={drop.image} alt={drop.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-700" />
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur border border-[#39FF14]/30 px-2 py-1 rounded text-[10px] font-mono text-[#39FF14] font-bold z-10">{drop.hype}% HYPE</div>
                   </div>
                   <div className="p-4 border-t border-white/5 relative z-10">
                     <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">{drop.tags}</div>
                     <h4 className="font-bold text-sm text-white mb-2 truncate">{drop.title}</h4>
                     <div className="flex items-center gap-2">
                       <img src={drop.avatar} alt={drop.brand} className="w-5 h-5 rounded-full border border-white/10" />
                       <span className="text-[10px] text-white/60 font-mono">{drop.brand}</span>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </section>

      </main>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Sparkles, TrendingUp, ScanFace, Activity, AlertTriangle, Layers, Tag, Camera, Loader2, Info, X } from "lucide-react";
import Image from "next/image";

type AnalysisResult = {
  viralPotentialScore: number;
  genZAppeal: string;
  tiktokFit: string;
  streetwearRelevance: string;
  designUniqueness: string;
  styleTags: string[];
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

  const fallbackData: AnalysisResult = {
    viralPotentialScore: 92,
    genZAppeal: "Sangat Tinggi",
    tiktokFit: "Sangat FYP",
    streetwearRelevance: "Kuat",
    designUniqueness: "Tinggi",
    styleTags: ["Cybercore", "Streetwear Lokal", "Y2K Skena"],
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
              className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 rounded-xl border border-red-500/30 bg-black/90 backdrop-blur-xl shadow-2xl flex items-start gap-4"
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

        <AnimatePresence mode="wait">
          {(!result && !isScanning) && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center mt-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                <span className="text-white/80">Kecerdasan Buatan Untuk Fashion Lokal</span>
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 max-w-4xl leading-[1.1] uppercase">
                Prediksi Potensi <br />Viral Desainmu.
              </h2>
              
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-light">
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

                      {/* Style Identity */}
                      <motion.div variants={{hidden: {opacity:0, y:20}, show: {opacity:1, y:0}}} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 text-white/50 mb-6">
                          <Tag className="w-4 h-4" />
                          <span className="font-mono text-[10px] tracking-[0.1em] font-bold uppercase">Identitas Estetika</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.styleTags.map(tag => (
                            <div key={tag} className="px-3 py-1.5 rounded-sm bg-white/10 border border-white/5 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                              {tag}
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
      </main>
    </div>
  );
}

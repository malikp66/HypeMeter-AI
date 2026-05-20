import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    viralPotentialScore: { type: Type.INTEGER, description: "0-100 score" },
    genZAppeal: { type: Type.STRING, description: "Rendah, Sedang, atau Tinggi" },
    tiktokFit: { type: Type.STRING, description: "Kurang, Bagus, atau Sangat FYP" },
    streetwearRelevance: { type: Type.STRING, description: "Lemah, Sedang, atau Kuat" },
    designUniqueness: { type: Type.STRING, description: "Rendah, Sedang, atau Tinggi" },
    styleTags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Contoh: Skena, Y2K, Streetwear Lokal"
    },
    aestheticAnalysis: { type: Type.STRING, description: "2-sentence deskripsi gaya bahasa visual dalam Bahasa Indonesia." },
    audiencePersona: {
      type: Type.OBJECT,
      properties: {
        ageDemographic: { type: Type.STRING, description: "E.g., 17-24 (Gen Z)" },
        interests: { type: Type.ARRAY, items: { type: Type.STRING } },
        behavioralTraits: { type: Type.STRING },
        purchasingPower: { type: Type.STRING, description: "Rendah, Menengah, atau Tinggi" }
      }
    },
    marketingCampaign: {
      type: Type.OBJECT,
      properties: {
        tiktokCaption: { type: Type.STRING },
        instagramCaption: { type: Type.STRING },
        theme: { type: Type.STRING, description: "Ide tema photoshoot campaign" },
        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    marketRisk: {
      type: Type.OBJECT,
      properties: {
        riskRating: { type: Type.STRING, description: "Rendah, Sedang, atau Tinggi" },
        designWeaknesses: { type: Type.STRING, description: "Kritik spesifik kelemahan desain" },
        recommendations: { type: Type.STRING, description: "Saran fitur/bahan strategi harga untuk pasar lokal" },
        validationBasis: { type: Type.STRING, description: "Penjelasan mengapa skor/kritik ini diberikan secara spesifik (apa pemicunya dalam kondisi market Indonesia)" }
      }
    }
  },
  required: ["viralPotentialScore", "genZAppeal", "tiktokFit", "streetwearRelevance", "designUniqueness", "styleTags", "aestheticAnalysis", "audiencePersona", "marketingCampaign", "marketRisk"]
};

export async function POST(req: NextRequest) {
  try {
    const { frontImage, backImage } = await req.json();

    if (!frontImage) {
      return NextResponse.json({ error: "Tampak depan (front image) wajib diunggah" }, { status: 400 });
    }

    const promptText = `Sebagai AI Fashion Strategist untuk brand lokal Indonesia, berikan evaluasi jujur dan kritikal terhadap desain aparel ini. 
Tentukan: 
1. Klasifikasi gaya estetika (misal: Skena, Cybercore, Y2K).
2. Potensi viral dan audiens target (Gen Z, harga, psikologi).
3. Evaluasi kekuatan & kelemahan (market risk untuk Tiktok/Shopee/Distro).
4. Dasar Penilaian (validation basis) mengapa skor itu diberikan dengan kondisi hype tren terkini di Indonesia. Ekstrak hasilnya menggunakan spesifikasi JSON yang diberikan dalam Bahasa Indonesia.
Perhatikan bahwa pengguna mungkin mengunggah tampak depan dan tampak belakang secara bersamaan (jika ada dua gambar).`;

    const contents: any[] = [promptText];
    
    // Front Image
    const b1 = frontImage.split(',')[1] || frontImage;
    contents.push({ inlineData: { data: b1, mimeType: "image/jpeg" } });

    // Back Image (Optional)
    if (backImage) {
      const b2 = backImage.split(',')[1] || backImage;
      contents.push("Berikut adalah detail visual Tampak Belakang (Back Print):");
      contents.push({ inlineData: { data: b2, mimeType: "image/jpeg" } });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(response.text);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze image" }, { status: 500 });
  }
}

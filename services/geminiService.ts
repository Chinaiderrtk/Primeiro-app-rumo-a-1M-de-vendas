
import { GoogleGenAI, Type } from "@google/genai";
import { Category } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedChallenge = async (category: Category) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Gere um desafio prático de 15 a 30 minutos na categoria ${category}. 
    Não seja motivacional vazio. Seja concreto e focado em resultado imediato. 
    Retorne em formato JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          points: { type: Type.NUMBER },
          timeMinutes: { type: Type.NUMBER },
        },
        required: ["title", "description", "points", "timeMinutes"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};

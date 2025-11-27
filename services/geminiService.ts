import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeAudioContent = async (
  base64Data: string,
  mimeType: string
): Promise<GeminiResponse> => {
  try {
    const modelId = "gemini-2.5-flash"; // Good balance of speed and multimodal capability

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: `You are a Quality Assurance Specialist for a call center. Analyze this audio recording of a customer service interaction.
            
            Please perform the following tasks:
            1. Extract the full transcription.
            2. Detect the primary language.
            3. Provide a concise summary of the call (2-3 sentences). IMPORTANT: The summary MUST be written in the SAME language as the detected audio language.
            4. Rate the operator's performance with a score from 1 to 5 (1 being poor, 5 being excellent) based on professionalism, empathy, clarity, and resolution.
            
            Return the result strictly as JSON.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            language: {
              type: Type.STRING,
              description: "The detected language of the audio (e.g., 'English', 'Spanish').",
            },
            transcription: {
              type: Type.STRING,
              description: "The full text transcription of the spoken audio.",
            },
            summary: {
              type: Type.STRING,
              description: "A concise summary of the conversation in the same language as the audio.",
            },
            score: {
              type: Type.NUMBER,
              description: "A quality score between 1 and 5.",
            },
          },
          required: ["language", "transcription", "summary", "score"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const result = JSON.parse(text) as GeminiResponse;
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze audio with AI.");
  }
};
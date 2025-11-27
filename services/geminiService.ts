import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GeminiResponse } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- Audio Analysis (Complex) ---
export const analyzeAudioContent = async (
  base64Data: string,
  mimeType: string
): Promise<GeminiResponse> => {
  try {
    const modelId = "gemini-2.5-flash"; 

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

// --- Text to Speech (TTS) ---
export const generateSpeech = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) {
      throw new Error("No audio data received.");
    }
    return audioData;
  } catch (error) {
    console.error("TTS Error:", error);
    throw new Error("Failed to generate speech.");
  }
};

// --- Simple Speech to Text (STT) ---
export const transcribeAudio = async (
  base64Data: string,
  mimeType: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: "Transcribe the following audio file verbatim. Return ONLY the raw transcription text, nothing else.",
          },
        ],
      },
    });
    
    return response.text || "No transcription generated.";
  } catch (error) {
    console.error("STT Error:", error);
    throw new Error("Failed to transcribe audio.");
  }
};
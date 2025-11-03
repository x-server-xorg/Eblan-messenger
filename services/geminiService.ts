
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development environments where the API key might not be set.
  // In a real production scenario, this check should be more robust.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBio = async (): Promise<string> => {
  if (!API_KEY) return "AI-сервис недоступен. Введите API ключ.";
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Сгенерируй короткое, крутое и интересное описание пользователя для профиля в социальной сети на русском языке. Меньше 150 символов.'
    });
    return response.text;
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Произошла ошибка при генерации. Попробуйте еще раз.";
  }
};

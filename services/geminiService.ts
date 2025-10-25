
import { GoogleGenAI, Type } from "@google/genai";
import { SuggestedHabit } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getHabitSuggestions = async (): Promise<SuggestedHabit[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Suggest 5 creative and achievable daily habits for improving overall well-being. For each habit, provide a name, a category (e.g., 'Mindfulness', 'Health', 'Productivity'), and a brief, motivating description.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "The name of the habit.",
              },
              category: {
                type: Type.STRING,
                description: "The category of the habit, like 'Health', 'Mindfulness', or 'Productivity'.",
              },
              description: {
                type: Type.STRING,
                description: "A short, motivating description of the habit.",
              },
            },
            required: ["name", "category", "description"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const suggestions = JSON.parse(jsonString);
    
    // Basic validation
    if (Array.isArray(suggestions)) {
      return suggestions as SuggestedHabit[];
    }
    return [];

  } catch (error) {
    console.error("Error fetching habit suggestions:", error);
    // Fallback in case of API error
    return [
      { name: '10-minute walk', category: 'Health', description: 'A short walk to refresh your body and mind.' },
      { name: 'Read one chapter', category: 'Productivity', description: 'Expand your knowledge by reading a chapter of a book.' },
      { name: 'Journal one line', category: 'Mindfulness', description: 'Write down a single thought or gratitude for the day.' },
    ];
  }
};

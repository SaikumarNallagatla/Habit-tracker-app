
import React, { useState } from 'react';
import { getHabitSuggestions } from '../services/geminiService';
import { SuggestedHabit } from '../types';
import { ICONS } from '../constants';

interface HabitSuggesterProps {
  onAddSuggested: (name: string, icon: string) => void;
}

const HabitSuggester: React.FC<HabitSuggesterProps> = ({ onAddSuggested }) => {
  const [suggestions, setSuggestions] = useState<SuggestedHabit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getHabitSuggestions();
      setSuggestions(result);
    } catch (err) {
      setError('Failed to fetch suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const mapCategoryToIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('health') || lowerCategory.includes('fit')) return 'Fitness';
    if (lowerCategory.includes('mind') || lowerCategory.includes('meditat')) return 'Mindfulness';
    if (lowerCategory.includes('read') || lowerCategory.includes('learn')) return 'Book';
    if (lowerCategory.includes('water') || lowerCategory.includes('drink')) return 'Water';
    return 'Default';
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 my-8 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">Looking for inspiration?</h3>
      <p className="text-slate-400 mb-4">Let AI suggest some new habits for you to build a better life.</p>
      <button
        onClick={fetchSuggestions}
        disabled={isLoading}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-400"
      >
        {isLoading ? (
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
            </>
        ) : 'Suggest Habits'}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
      {suggestions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((habit, index) => {
            const iconKey = mapCategoryToIcon(habit.category);
            const IconComponent = ICONS[iconKey];
            return (
              <div key={index} className="bg-slate-700/50 p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-semibold text-white">{habit.name}</h4>
                  </div>
                  <p className="text-sm text-slate-300">{habit.description}</p>
                </div>
                <button
                  onClick={() => onAddSuggested(habit.name, iconKey)}
                  className="mt-4 bg-slate-600 hover:bg-cyan-600 text-white text-sm font-bold py-2 px-4 rounded-md transition-colors w-full"
                >
                  Add This Habit
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HabitSuggester;

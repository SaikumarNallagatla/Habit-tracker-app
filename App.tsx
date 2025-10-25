import React, { useState, useEffect, useCallback } from 'react';
import { Habit } from './types';
import HabitItem from './components/HabitItem';
import AddHabitForm from './components/AddHabitForm';
import HabitSuggester from './components/HabitSuggester';
import NotesSection from './components/NotesSection';
import CelebrationModal from './components/CelebrationModal';
import DailyProgressView from './components/DailyProgressView';
import StreakGoals from './components/StreakGoals';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    try {
      const storedHabits = localStorage.getItem('habits');
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        setNotes(storedNotes);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error("Failed to save habits to localStorage", error);
    }
  }, [habits]);

  useEffect(() => {
    try {
      localStorage.setItem('notes', notes);
    } catch (error) {
      console.error("Failed to save notes to localStorage", error);
    }
  }, [notes]);

  const calculateStreak = (completedDates: string[]): number => {
    if (completedDates.length === 0) return 0;
    
    let currentStreak = 0;
    const sortedDates = [...completedDates].sort().reverse();
    
    const todayDate = new Date(today);
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const mostRecentDate = new Date(sortedDates[0]);

    if (mostRecentDate.getTime() === todayDate.getTime() || mostRecentDate.getTime() === yesterdayDate.getTime()) {
        let expectedDate = new Date(sortedDates[0]);
        for (const dateStr of sortedDates) {
            const currentDateInLoop = new Date(dateStr);
            if (currentDateInLoop.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
                currentStreak++;
                expectedDate.setDate(expectedDate.getDate() - 1);
            } else {
                break;
            }
        }
    } else {
      return 0;
    }
    
    return currentStreak;
  };
  
  const addHabit = (name: string, icon: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      icon,
      streak: 0,
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabitCompletion = useCallback((id: string, date: string) => {
    setHabits(prevHabits => {
        let habitJustCompleted = false;
        const newHabits = prevHabits.map(habit => {
            if (habit.id === id) {
                const newCompletedDates = habit.completedDates.includes(date)
                    ? habit.completedDates.filter(d => d !== date)
                    : [...habit.completedDates, date];

                if (!habit.completedDates.includes(date)) {
                    habitJustCompleted = true;
                }

                const newStreak = calculateStreak(newCompletedDates);

                return { ...habit, completedDates: newCompletedDates, streak: newStreak };
            }
            return habit;
        });

        if (habitJustCompleted) {
            const allCompleted = newHabits.every(h => h.completedDates.includes(today));
            if (newHabits.length > 0 && allCompleted) {
                setCelebrationMessage("You've completed all your habits for today!");
                setShowCelebration(true);
            }
        }

        return newHabits;
    });
  }, [today]);

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const progress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
            Zenith Habits
          </h1>
          <p className="mt-2 text-slate-400 text-lg">Build a better you, one day at a time.</p>
        </header>

        <main>
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Today's Progress</h2>
                    <p className="text-slate-400">{completedToday} / {totalHabits} habits completed</p>
                </div>
                <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center" style={{ background: `conic-gradient(#22d3ee ${progress}%, #334155 ${progress}%)` }}>
                    <div className="w-[70px] h-[70px] bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-cyan-400">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>
          </div>

          <DailyProgressView habits={habits} />

          <div className="space-y-4">
            {habits.length > 0 ? (
                habits.map(habit => (
                    <HabitItem key={habit.id} habit={habit} onToggle={toggleHabitCompletion} today={today} />
                ))
            ) : (
                <div className="text-center py-12 px-6 bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700">
                    <h3 className="text-xl font-semibold text-white">No habits yet!</h3>
                    <p className="text-slate-400 mt-2">Click "Add New Habit" to get started on your journey.</p>
                </div>
            )}
          </div>
          
          <StreakGoals habits={habits} />
          
          <div className="mt-8 text-center">
            <button onClick={() => setIsAdding(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
              Add New Habit
            </button>
          </div>

          <HabitSuggester onAddSuggested={addHabit} />
          <NotesSection notes={notes} onNotesChange={setNotes} />
        </main>
        
        <footer className="text-center text-slate-500 mt-12 mb-4">
            <p>Powered by Gemini & React</p>
        </footer>
      </div>
      
      {isAdding && <AddHabitForm onAdd={addHabit} onClose={() => setIsAdding(false)} />}
      <CelebrationModal isOpen={showCelebration} onClose={() => setShowCelebration(false)} message={celebrationMessage} />
    </div>
  );
};

export default App;

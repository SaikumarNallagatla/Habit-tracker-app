
import React from 'react';
import { Habit } from '../types';
import { ICONS } from '../constants';

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  today: string;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggle, today }) => {
  const isCompletedToday = habit.completedDates.includes(today);
  const IconComponent = ICONS[habit.icon] || ICONS.Default;

  const getWeekHistory = () => {
    const history = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      history.push({
        date: dateString,
        completed: habit.completedDates.includes(dateString),
      });
    }
    return history;
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:bg-slate-700/50 shadow-lg">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCompletedToday ? 'bg-emerald-500' : 'bg-slate-700'}`}>
          <IconComponent className={`w-7 h-7 ${isCompletedToday ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
          <p className="text-sm text-slate-400">Streak: {habit.streak} days</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getWeekHistory().map(({ date, completed }) => (
            <div
              key={date}
              className={`w-5 h-8 rounded-sm ${
                completed ? 'bg-emerald-500' : 'bg-slate-700'
              } ${date === today ? 'border-2 border-white' : ''}`}
              title={date}
            ></div>
          ))}
        </div>
        
        <button
          onClick={() => onToggle(habit.id, today)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            isCompletedToday
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isCompletedToday ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="w-8 h-8 rounded-full border-4 border-slate-500"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default HabitItem;

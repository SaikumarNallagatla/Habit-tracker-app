import React, { useState } from 'react';
import { Habit } from '../types';

interface DailyProgressViewProps {
  habits: Habit[];
}

const DailyProgressView: React.FC<DailyProgressViewProps> = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = firstDayOfMonth.getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

    const dailyProgress: { [key: string]: number } = {};
    if (habits.length > 0) {
        dates.forEach(date => {
            const dateString = date.toISOString().split('T')[0];
            const completedOnDate = habits.filter(h => h.completedDates.includes(dateString)).length;
            dailyProgress[dateString] = (completedOnDate / habits.length) * 100;
        });
    }

    return { firstDay, dates, dailyProgress };
  };

  const { firstDay, dates, dailyProgress } = getMonthData();
  const today = new Date().toISOString().split('T')[0];

  const getDayClass = (progress: number | undefined) => {
    if (progress === undefined) return 'bg-slate-700/50';
    if (progress === 100) return 'bg-emerald-500 hover:bg-emerald-400';
    if (progress >= 50) return 'bg-emerald-600 hover:bg-emerald-500';
    if (progress > 0) return 'bg-emerald-800 hover:bg-emerald-700';
    return 'bg-slate-700';
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Previous month">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <h2 className="text-xl font-bold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Next month">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-2">
        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {dates.map(date => {
          const dateString = date.toISOString().split('T')[0];
          const progress = dailyProgress[dateString];
          return (
            <div 
              key={dateString} 
              className={`w-full aspect-square flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 ${getDayClass(progress)} ${today === dateString ? 'ring-2 ring-cyan-400' : ''}`} 
              title={`${date.toLocaleDateString()}: ${progress !== undefined ? Math.round(progress) : 0}% completed`}
            >
              <span className="text-xs text-white/70">{date.getDate()}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default DailyProgressView;

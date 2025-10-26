import React from 'react';
import { Habit } from '../types';
// FIX: Refactor to use centralized Brain icon from constants.
import { ICONS } from '../constants';

// FIX: Define StreakGoalsProps interface for the component's props.
interface StreakGoalsProps {
    habits: Habit[];
}

// FIX: Removed local BrainIcon definition. It's now in constants.tsx and imported via ICONS.
const StreakGoals: React.FC<StreakGoalsProps> = ({ habits }) => {
  const maxStreak = Math.max(0, ...habits.map(h => h.streak));
  const BrainIcon = ICONS.Brain;

  if (maxStreak === 0) {
    return null;
  }

  let title = "Your Next Goal";
  let message = "Keep up the great work!";
  let iconColor = "text-yellow-400";

  if (maxStreak < 7) {
    message = "Consistency is key. Aim for a full 7-day streak to build real momentum!";
  } else if (maxStreak >= 7 && maxStreak < 21) {
    title = "You're Building a Habit!";
    message = "Great job hitting a 7-day streak! Psychologists say it can take around 21 days for a habit to stick. You're on your way!";
    iconColor = "text-green-400";
  } else if (maxStreak >= 21 && maxStreak < 66) {
    title = "It's Becoming Automatic!";
    message = "You've passed the 21-day milestone! Research suggests it takes an average of 66 days for a behavior to become second nature. Let's go for it!";
    iconColor = "text-cyan-400";
  } else {
    title = "Habit Master!";
    message = "Incredible! This is now a solid part of your routine. Consider adding a new challenge to keep growing!";
    iconColor = "text-indigo-400";
  }

  return (
    <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl p-6 my-8 flex items-start gap-4" role="alert">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-slate-700 ${iconColor}`}>
           <BrainIcon className="w-7 h-7" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-slate-300 mt-1">{message}</p>
        </div>
    </div>
  );
};

export default StreakGoals;

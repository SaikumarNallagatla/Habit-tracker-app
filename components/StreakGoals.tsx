import React from 'react';
import { Habit } from '../types';

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.25l-.648-1.688a2.25 2.25 0 01-1.423-1.423L12.75 18l1.688-.648a2.25 2.25 0 011.423-1.423L17.25 15l.648 1.688a2.25 2.25 0 011.423 1.423L20.25 18l-1.688.648a2.25 2.25 0 01-1.423 1.423z" />
    </svg>
);

// FIX: Define StreakGoalsProps interface for the component's props.
interface StreakGoalsProps {
    habits: Habit[];
}

const StreakGoals: React.FC<StreakGoalsProps> = ({ habits }) => {
  const maxStreak = Math.max(0, ...habits.map(h => h.streak));

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
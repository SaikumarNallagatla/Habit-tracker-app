
import React from 'react';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, onNotesChange }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 mt-8 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">My Journal</h3>
      <p className="text-slate-400 mb-4">Reflect on your progress, challenges, and thoughts.</p>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Today I felt..."
        className="w-full h-48 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg p-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
      />
    </div>
  );
};

export default NotesSection;

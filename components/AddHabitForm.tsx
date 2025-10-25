
import React, { useState } from 'react';
import { ICONS, ICON_CATEGORIES } from '../constants';

interface AddHabitFormProps {
  onAdd: (name: string, icon: string) => void;
  onClose: () => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICON_CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedIcon);
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
       <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-700 animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Add a New Habit</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="habit-name" className="block text-sm font-medium text-slate-300 mb-2">Habit Name</label>
                <input
                    id="habit-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Drink 8 glasses of water"
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Choose an Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {ICON_CATEGORIES.map((iconKey) => {
                    const IconComponent = ICONS[iconKey];
                    return (
                    <button
                        type="button"
                        key={iconKey}
                        onClick={() => setSelectedIcon(iconKey)}
                        className={`p-3 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        selectedIcon === iconKey ? 'bg-cyan-500 ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                    >
                        <IconComponent className="w-6 h-6 text-white" />
                    </button>
                    );
                })}
                </div>
            </div>

            <div className="flex gap-4 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                    disabled={!name.trim()}
                >
                    Add Habit
                </button>
            </div>
        </form>
       </div>
    </div>
  );
};

export default AddHabitForm;

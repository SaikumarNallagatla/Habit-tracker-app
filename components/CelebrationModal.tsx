
import React from 'react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-cyan-500/50">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-7xl">🎉</div>
        <h2 className="text-2xl font-bold text-white mt-8 mb-2">Congratulations!</h2>
        <p className="text-slate-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
        >
          Keep Going
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;

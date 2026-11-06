import React from 'react';
import { SketchbookSection } from './SketchbookSection';
import { X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SketchbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SketchbookModal: React.FC<SketchbookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex flex-col items-center">
      {/* Sticky Close Bar at Top */}
      <div className="sticky top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-300 py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-800 font-bold">
            Interactive Drafting Table &amp; Moodboard
          </span>
        </div>

        <button
          onClick={() => {
            sounds.playPaperRustle();
            onClose();
          }}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white text-xs font-mono tracking-widest uppercase transition-all shadow hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
          <span>Close Desk</span>
        </button>
      </div>

      {/* Main Drafting Table Section */}
      <div className="w-full bg-white flex-grow">
        <SketchbookSection />
      </div>
    </div>
  );
};


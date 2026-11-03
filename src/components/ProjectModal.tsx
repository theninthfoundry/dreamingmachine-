import React from 'react';
import type { ProjectItem } from './BubbleWorksSection';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleClose = () => {
    sounds.playClick(500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col md:flex-row">
        {/* Left Column: Visual Asset Preview */}
        <div className="md:w-1/2 relative bg-neutral-900 min-h-[260px] md:min-h-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-widest uppercase border border-white/20">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="font-mono text-xs text-amber-400 tracking-widest uppercase block mb-1">
              EST. {project.year} • SPEC SPECIFICATION
            </span>
            <h4
              style={{ fontFamily: 'var(--font-serif-luxury)' }}
              className="text-3xl text-white font-normal uppercase"
            >
              {project.title}
            </h4>
          </div>
        </div>

        {/* Right Column: Project Details & Specs */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-full">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>ARCHIVE ID: {project.id.toUpperCase()}</span>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-colors"
                title="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Role */}
            <div className="mt-4">
              <h3
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-3xl sm:text-4xl text-neutral-900 uppercase font-normal leading-tight"
              >
                {project.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-1">
                ROLE: {project.role}
              </p>
            </div>

            {/* Description */}
            <p className="mt-4 text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
              {project.description}
            </p>

            {/* Core Features */}
            <div className="mt-6">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Key Architectural Pillars
              </h5>
              <div className="space-y-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-2.5 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">STATUS: PRODUCTION LIVE</span>
            <button
              onClick={() => {
                sounds.playBubblePop();
                handleClose();
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Explore Interactive View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

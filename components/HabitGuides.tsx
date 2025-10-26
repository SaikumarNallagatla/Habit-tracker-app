import React, { useState } from 'react';
import { getMeditationGuide, getSubconsciousMindGuide, getSunriseExerciseGuide } from '../services/geminiService';
import { ICONS } from '../constants';

type GuideKey = 'meditation' | 'subconscious' | 'exercise';

interface Guide {
    key: GuideKey;
    title: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    fetcher: () => Promise<string>;
    color: string;
}

const GUIDES: Guide[] = [
    {
        key: 'meditation',
        title: 'How to Meditate',
        // FIX: ICONS.Meditation does not exist; replaced with ICONS.Mindfulness.
        Icon: ICONS.Mindfulness,
        fetcher: getMeditationGuide,
        color: 'text-cyan-400',
    },
    {
        key: 'subconscious',
        title: 'Power of the Subconscious Mind',
        Icon: ICONS.Brain,
        fetcher: getSubconsciousMindGuide,
        color: 'text-indigo-400',
    },
    {
        key: 'exercise',
        title: 'Sunrise Exercise Benefits',
        Icon: ICONS.Sunrise,
        fetcher: getSunriseExerciseGuide,
        color: 'text-yellow-400',
    }
];

const HabitGuides: React.FC = () => {
    const [activeGuide, setActiveGuide] = useState<GuideKey | null>(null);
    const [guidesContent, setGuidesContent] = useState<Record<GuideKey, string>>({
        meditation: '',
        subconscious: '',
        exercise: '',
    });
    const [loading, setLoading] = useState<GuideKey | null>(null);
    const [error, setError] = useState<string | null>(null);

    const toggleGuide = async (guide: Guide) => {
        if (activeGuide === guide.key) {
            setActiveGuide(null);
            return;
        }

        setActiveGuide(guide.key);

        if (!guidesContent[guide.key]) {
            setLoading(guide.key);
            setError(null);
            try {
                const content = await guide.fetcher();
                setGuidesContent(prev => ({ ...prev, [guide.key]: content }));
            } catch (err) {
                console.error(`Failed to fetch ${guide.key} guide:`, err);
                setError(`Could not load the guide for ${guide.title}. Please try again.`);
                setGuidesContent(prev => ({ ...prev, [guide.key]: `Error loading content.` }));
            } finally {
                setLoading(null);
            }
        }
    };

    return (
        <div className="bg-slate-800 rounded-2xl p-6 my-8 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Explore Habit Guides</h3>
            <p className="text-slate-400 mb-4">Discover the 'why' behind powerful habits with AI-powered guides.</p>
            <div className="space-y-3">
                {GUIDES.map((guide) => {
                    const isOpen = activeGuide === guide.key;
                    return (
                        <div key={guide.key} className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                            <button
                                onClick={() => toggleGuide(guide)}
                                className="w-full flex justify-between items-center p-4 text-left"
                                aria-expanded={isOpen}
                                aria-controls={`guide-content-${guide.key}`}
                            >
                                <div className="flex items-center gap-3">
                                    <guide.Icon className={`w-6 h-6 ${guide.color}`} />
                                    <span className="font-semibold text-white">{guide.title}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isOpen && (
                                <div id={`guide-content-${guide.key}`} className="p-4 pt-0">
                                    <div className="border-t border-slate-700 pt-4">
                                        {loading === guide.key ? (
                                            <div className="flex justify-center items-center p-8">
                                                <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{guidesContent[guide.key]}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
             {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>
    );
};

export default HabitGuides;

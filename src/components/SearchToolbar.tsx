import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronRight, X, Replace } from 'lucide-react';

interface SearchToolbarProps {
    isOpen: boolean;
    onClose: () => void;
    onFindNext: (query: string, direction: 'next' | 'prev') => void;
    onReplace: (query: string, replacement: string) => void;
    onReplaceAll: (query: string, replacement: string) => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
    isOpen,
    onClose,
    onFindNext,
    onReplace,
    onReplaceAll
}) => {
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [showReplace, setShowReplace] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) {
                onFindNext(findText, 'prev');
            } else {
                onFindNext(findText, 'next');
            }
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="absolute top-14 right-4 z-50 w-80 bg-[#E8DEC7] rounded-lg shadow-xl border border-[#D0C6B0] overflow-hidden text-sm animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Toggle Replace Mode */}
            <div className="px-1 pt-1 flex justify-start">
                <button
                    onClick={() => setShowReplace(!showReplace)}
                    className="p-1 text-[#5c5446] hover:text-black transition"
                    title={showReplace ? "Hide Replace" : "Show Replace"}
                >
                    <div className={`transform transition-transform duration-200 ${showReplace ? 'rotate-90' : 'rotate-0'}`}>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                </button>
            </div>

            <div className="p-3 pt-0 grid gap-2">
                {/* Find Row */}
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Find"
                            value={findText}
                            onChange={(e) => setFindText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-8 pr-2 py-1.5 border border-[#D0C6B0] rounded focus:outline-none focus:border-[#8B7E66] bg-[#F1E9D2] placeholder-[#8B7E66] text-[#2C241B]"
                        />
                        <Search className="w-4 h-4 text-[#8B7E66] absolute left-2 top-1/2 -translate-y-1/2" />
                    </div>
                    <div className="flex gap-0.5">
                        <button
                            onClick={() => onFindNext(findText, 'prev')}
                            className="p-1.5 text-[#5c5446] hover:text-black hover:bg-[#D0C6B0]/20 rounded"
                            title="Previous Match (Shift+Enter)"
                        >
                            <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onFindNext(findText, 'next')}
                            className="p-1.5 text-[#5c5446] hover:text-black hover:bg-[#D0C6B0]/20 rounded"
                            title="Next Match (Enter)"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[#5c5446] hover:text-black hover:bg-[#D0C6B0]/20 rounded ml-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Replace Row */}
                {showReplace && (
                    <div className="flex gap-2 items-center animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Replace"
                                value={replaceText}
                                onChange={(e) => setReplaceText(e.target.value)}
                                className="w-full pl-8 pr-2 py-1.5 border border-[#D0C6B0] rounded focus:outline-none focus:border-[#8B7E66] bg-[#F1E9D2] placeholder-[#8B7E66] text-[#2C241B]"
                            />
                            <Replace className="w-4 h-4 text-[#8B7E66] absolute left-2 top-1/2 -translate-y-1/2" />
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => onReplace(findText, replaceText)}
                                className="p-1.5 px-2 bg-[#D0C6B0] hover:bg-[#C0B6A0] text-[#2C241B] rounded border border-[#B0A690] text-xs font-medium"
                                title="Replace Current"
                            >
                                Replace
                            </button>
                            <button
                                onClick={() => onReplaceAll(findText, replaceText)}
                                className="p-1.5 px-2 bg-[#D0C6B0] hover:bg-[#C0B6A0] text-[#2C241B] rounded border border-[#B0A690] text-xs font-medium"
                                title="Replace All"
                            >
                                All
                            </button>
                        </div>
                        {/* Spacer to align with close button */}
                        <div className="w-8"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchToolbar;

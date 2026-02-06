import React from 'react';
import { X, Clock } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    autoSaveInterval: number;
    onAutoSaveChange: (interval: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    autoSaveInterval,
    onAutoSaveChange
}) => {
    if (!isOpen) return null;

    const options = [
        { label: "Off (Don't Auto Save)", value: 0 },
        { label: "Empty 1 Second", value: 1000 },
        { label: "Every 3 Seconds", value: 3000 },
        { label: "Every 1 Minute", value: 60000 },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C241B]/20 backdrop-blur-sm">
            <div className="bg-[#E8DEC7] rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden border border-[#D0C6B0]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#D0C6B0]">
                    <h2 className="text-lg font-semibold text-[#2C241B]">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#8B7E66] hover:text-[#5c5446] hover:bg-[#D0C6B0]/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-[#F1E9D2]">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3 text-[#2C241B] font-medium">
                            <Clock className="w-4 h-4" />
                            <span>Auto Save</span>
                        </div>

                        <div className="space-y-3 pl-6">
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className="relative flex items-center justify-center w-5 h-5">
                                        <input
                                            type="radio"
                                            name="autosave"
                                            className="peer appearance-none w-5 h-5 border-2 border-[#8B7E66] rounded-full checked:border-[#5c5446] checked:bg-[#5c5446] transition-all"
                                            checked={autoSaveInterval === option.value}
                                            onChange={() => onAutoSaveChange(option.value)}
                                        />
                                        <div className="absolute w-2 h-2 bg-[#F1E9D2] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                                    </div>
                                    <span className="text-sm text-[#5c5446] group-hover:text-[#2C241B]">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Future Settings Placeholders */}
                    <div className="p-4 bg-[#E8DEC7]/50 rounded-lg border border-[#D0C6B0] text-sm text-[#8B7E66] text-center">
                        More settings coming soon...
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#E8DEC7] border-t border-[#D0C6B0] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#8B7E66] text-[#F1E9D2] text-sm font-medium rounded-md hover:bg-[#5c5446] transition-colors shadow-sm"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;

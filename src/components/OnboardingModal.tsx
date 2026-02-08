import React, { useState } from 'react';
import { FileText, Code, CheckSquare, Sparkles, X } from 'lucide-react';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    if (!isOpen) return null;

    const steps = [
        {
            title: "Welcome to SimPad",
            icon: <Sparkles className="w-12 h-12 text-[#8B7E66]" />,
            content: (
                <div className="space-y-4 text-center">
                    <p className="text-[#5c5446]">
                        A lightweight, distraction-free notepad designed for focus and simplicity.
                        Experience a native-feel editor with a warm, soothing theme.
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                        <div className="flex flex-col items-center gap-2 p-3 bg-[#E8DEC7] rounded-lg border border-[#D0C6B0] w-24">
                            <FileText className="w-6 h-6 text-[#8B7E66]" />
                            <span className="text-xs font-medium text-[#2C241B]">Write</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-[#E8DEC7] rounded-lg border border-[#D0C6B0] w-24">
                            <Code className="w-6 h-6 text-[#8B7E66]" />
                            <span className="text-xs font-medium text-[#2C241B]">Code</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-[#E8DEC7] rounded-lg border border-[#D0C6B0] w-24">
                            <CheckSquare className="w-6 h-6 text-[#8B7E66]" />
                            <span className="text-xs font-medium text-[#2C241B]">Plan</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Multiple Modes",
            icon: <FileText className="w-12 h-12 text-[#8B7E66]" />,
            content: (
                <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#E8DEC7] rounded shrink-0">
                            <FileText className="w-5 h-5 text-[#8B7E66]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#2C241B]">Text Mode</h4>
                            <p className="text-sm text-[#5c5446]">Standard plain text editing for notes and writing.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#E8DEC7] rounded shrink-0">
                            <Code className="w-5 h-5 text-[#8B7E66]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#2C241B]">Code Mode</h4>
                            <p className="text-sm text-[#5c5446]">Syntax highlighting for code snippets. Default is JS.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#E8DEC7] rounded shrink-0">
                            <CheckSquare className="w-5 h-5 text-[#8B7E66]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#2C241B]">Checklist Mode</h4>
                            <p className="text-sm text-[#5c5446]">Interactive to-do lists with drag-and-drop reordering.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Ready to Start?",
            icon: <Sparkles className="w-12 h-12 text-[#8B7E66]" />,
            content: (
                <div className="space-y-4 text-center">
                    <p className="text-[#5c5446]">
                        You can switch modes anytime from the toolbar.
                        Use <b>Ctrl+T</b> for new tabs and <b>Ctrl+S</b> to save.
                    </p>
                    <p className="text-[#5c5446] text-sm">
                        Enjoy your distraction-free writing experience!
                    </p>
                </div>
            )
        }
    ];

    const currentStep = steps[step];
    const isLastStep = step === steps.length - 1;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C241B]/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-[#F1E9D2] rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-[#D0C6B0] relative">
                {/* Close Button (Hidden on first step to encourage reading, optional) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#8B7E66] hover:text-[#2C241B] transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 pb-6 flex flex-col items-center">
                    <div className="mb-6 p-4 bg-[#E8DEC7] rounded-full shadow-inner">
                        {currentStep.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-[#2C241B] mb-2 text-center">{currentStep.title}</h2>
                    <div className="w-full">
                        {currentStep.content}
                    </div>
                </div>

                {/* Footer / Navigation */}
                <div className="px-8 py-6 flex justify-between items-center">
                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-[#8B7E66]' : 'bg-[#D0C6B0]'}`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-3">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-4 py-2 text-sm font-medium text-[#5c5446] hover:text-[#2C241B] transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={() => isLastStep ? onClose() : setStep(step + 1)}
                            className="px-6 py-2 bg-[#8B7E66] text-[#F1E9D2] rounded-lg hover:bg-[#5c5446] transition-colors font-medium shadow-sm active:translate-y-0.5"
                        >
                            {isLastStep ? "Get Started" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;

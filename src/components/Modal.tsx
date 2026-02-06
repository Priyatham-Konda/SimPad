
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void; // "X" or clicking outside
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    onClose,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info',
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C241B]/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-[#E8DEC7] rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-[#D0C6B0] text-[#2C241B]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-5">
                    <h3 className="text-lg font-semibold text-[#2C241B] mb-2">{title}</h3>
                    <p className="text-[#5c5446] text-sm">{message}</p>
                </div>

                <div className="px-6 py-4 bg-[#F1E9D2] flex justify-end gap-3 border-t border-[#D0C6B0]">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-[#5c5446] hover:text-[#2C241B] hover:bg-[#D0C6B0]/30 rounded-md transition-colors"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-[#F1E9D2] rounded-md transition-colors shadow-sm ${type === 'danger'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-[#8B7E66] hover:bg-[#5c5446]'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>

                {/* Close X */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#8B7E66] hover:text-[#5c5446]"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;


import React from 'react';
import { X, Plus, Circle } from 'lucide-react';
import { AppDocument } from '../types';

interface TitleBarProps {
    documents: AppDocument[];
    activeDocId: string;
    onSelectDoc: (id: string) => void;
    onCloseDoc: (id: string) => void;
    onNewDoc: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({
    documents,
    activeDocId,
    onSelectDoc,
    onCloseDoc,
    onNewDoc
}) => {
    return (
        <div className="flex items-center bg-[#E8DEC7] border-b border-[#D0C6B0] pt-1 px-1 h-10 select-none overflow-x-auto no-scrollbar">
            <div className="flex gap-0.5 items-end flex-1">
                {documents.map((doc) => {
                    const isActive = doc.id === activeDocId;
                    return (
                        <div
                            key={doc.id}
                            onClick={() => onSelectDoc(doc.id)}
                            className={`
                group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] h-9 
                text-sm cursor-pointer rounded-t-md border-b-[3px] transition-colors
                ${isActive
                                    ? 'bg-[#F1E9D2] text-[#2C241B] border-[#8B7E66]'
                                    : 'bg-[#D0C6B0]/50 text-[#8B7E66] hover:bg-[#D0C6B0] hover:text-[#5c5446] border-transparent'
                                }
              `}
                            title={doc.title} // Basic title tooltip
                        >
                            <span className="truncate flex-1 font-medium">{doc.title}</span>

                            {/* Status Indicator / Close Button */}
                            <div
                                className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-[#C0B6A0] hover:text-[#2C241B]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCloseDoc(doc.id);
                                }}
                            >
                                {doc.isDirty ? (
                                    <Circle className="w-2.5 h-2.5 fill-current text-[#8B7E66] group-hover:hidden" />
                                ) : null}
                                <X
                                    className={`w-3.5 h-3.5 ${doc.isDirty ? 'hidden group-hover:block' : ''}`}
                                />
                            </div>
                        </div>
                    );
                })}

                {/* New Tab Button */}
                <button
                    onClick={onNewDoc}
                    className="ml-1 p-1.5 text-[#8B7E66] hover:text-[#2C241B] hover:bg-[#D0C6B0] rounded-md transition-colors"
                    title="New Tab"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TitleBar;

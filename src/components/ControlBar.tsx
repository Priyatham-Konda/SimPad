import React from 'react';
import { Menu, Save, FileText, Code, CheckSquare, Search } from 'lucide-react';
import { DocumentType } from '../types';

interface ControlBarProps {
    activeType: DocumentType;
    onChangeType: (type: DocumentType) => void;
    onSave: () => void;
    onNew: () => void;
    onOpen: () => void;
    onSaveAs: () => void;
    onOpenSettings: () => void;
    onToggleSearch: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
    activeType,
    onChangeType,
    onSave,
    onNew,
    onOpen,
    onSaveAs,
    onOpenSettings,
    onToggleSearch
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="h-12 bg-[#F1E9D2] border-b border-[#D0C6B0] flex items-center px-4 shadow-sm z-10 relative">

            {/* Left Group: Menu & File Actions */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <IconButton
                        tooltip="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </IconButton>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-[#F1E9D2] border border-[#D0C6B0] rounded-md shadow-xl py-1 z-50">
                            <MenuItem label="New File" shortcut="Ctrl+T" onClick={() => { onNew(); setIsMenuOpen(false); }} />
                            <MenuItem label="Open File..." shortcut="Ctrl+O" onClick={() => { onOpen(); setIsMenuOpen(false); }} />
                            <div className="h-px bg-[#D0C6B0] my-1" />
                            <MenuItem label="Save" shortcut="Ctrl+S" onClick={() => { onSave(); setIsMenuOpen(false); }} />
                            <MenuItem label="Save As..." shortcut="Ctrl+Shift+S" onClick={() => { onSaveAs(); setIsMenuOpen(false); }} />
                            <div className="h-px bg-[#D0C6B0] my-1" />
                            <MenuItem label="Settings" onClick={() => { onOpenSettings(); setIsMenuOpen(false); }} />
                        </div>
                    )}
                </div>

                {/* Quick Save */}
                <IconButton onClick={onSave} tooltip="Quick Save (Ctrl+S)">
                    <Save className="w-5 h-5 text-[#8B7E66] hover:text-[#5c5446]" />
                </IconButton>
            </div>

            {/* Screen blocker to close menu when clicking outside */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Center Group: Mode Switcher - Absolutely Centered */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-[#E8DEC7] p-1 rounded-lg border border-[#D0C6B0]">
                <ModeButton
                    isActive={activeType === 'text'}
                    onClick={() => onChangeType('text')}
                    icon={<FileText className="w-4 h-4" />}
                    label="Text"
                />
                <ModeButton
                    isActive={activeType === 'code'}
                    onClick={() => onChangeType('code')}
                    icon={<Code className="w-4 h-4" />}
                    label="Code"
                />
                <ModeButton
                    isActive={activeType === 'checklist'}
                    onClick={() => onChangeType('checklist')}
                    icon={<CheckSquare className="w-4 h-4" />}
                    label="Checklist"
                />
            </div>

            {/* Right Group: Search - Pushed to right */}
            <div className="ml-auto flex items-center">
                <IconButton onClick={onToggleSearch} tooltip="Find & Replace (Ctrl+F)">
                    <Search className="w-5 h-5 text-[#8B7E66]" />
                </IconButton>
            </div>
        </div>
    );
};

// -- Support Components --

const IconButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    tooltip: string;
}> = ({ children, onClick, tooltip }) => (
    <button
        onClick={onClick}
        className="group relative p-2 text-[#5c5446] hover:bg-[#E8DEC7] rounded-md transition-colors"
        title={tooltip}
    >
        {children}
        <span className="absolute hidden group-hover:block top-full mt-1 left-1/2 -translate-x-1/2 bg-[#2C241B] text-[#F1E9D2] text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
            {tooltip}
        </span>
    </button>
);

const ModeButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ isActive, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`
      flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
      ${isActive
                ? 'bg-[#F1E9D2] text-[#2C241B] shadow-sm border border-[#D0C6B0]'
                : 'text-[#8B7E66] hover:text-[#5c5446] hover:bg-[#D0C6B0]/20'
            }
    `}
        title={label}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

const MenuItem: React.FC<{
    label: string;
    shortcut?: string;
    onClick?: () => void;
}> = ({ label, shortcut, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left px-4 py-2 text-sm text-[#2C241B] hover:bg-[#E8DEC7] flex justify-between items-center"
    >
        <span>{label}</span>
        {shortcut && <span className="text-[#8B7E66] text-xs">{shortcut}</span>}
    </button>
);



export default ControlBar;

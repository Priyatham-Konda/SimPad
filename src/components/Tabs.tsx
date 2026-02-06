
import React from 'react';

interface TabsProps {
    activeTab: 'notepad' | 'code' | 'checklist';
    setActiveTab: (tab: 'notepad' | 'code' | 'checklist') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex items-center bg-gray-100 border-b border-gray-300 px-2 h-10 select-none">
            <TabButton
                isActive={activeTab === 'notepad'}
                onClick={() => setActiveTab('notepad')}
                label="Notepad"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
            />
            <TabButton
                isActive={activeTab === 'code'}
                onClick={() => setActiveTab('code')}
                label="Code"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
            />
            <TabButton
                isActive={activeTab === 'checklist'}
                onClick={() => setActiveTab('checklist')}
                label="Checklist"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>}
            />
        </div>
    );
};

const TabButton: React.FC<{ isActive: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ isActive, onClick, label, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 h-full text-sm font-medium transition-colors ${isActive
                ? 'bg-white text-blue-600 border-t-2 border-t-blue-600'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
    >
        {icon}
        {label}
    </button>
);

export default Tabs;

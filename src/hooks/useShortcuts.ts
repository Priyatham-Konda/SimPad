
import { useEffect } from 'react';

interface ShortcutMap {
    [key: string]: (e: KeyboardEvent) => void;
}

export const useShortcuts = (shortcuts: ShortcutMap) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Ctrl (Windows/Linux) or Cmd (Mac)
            const isMod = e.ctrlKey || e.metaKey;

            if (!isMod) return;

            const key = e.key.toLowerCase();

            if (shortcuts[key]) {
                e.preventDefault();
                shortcuts[key](e);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};

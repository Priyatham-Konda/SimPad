
import React, { useEffect, useRef } from 'react';

interface NotepadProps {
    content: string;
    onChange: (value: string) => void;
}

const Notepad = React.forwardRef<any, NotepadProps>(({ content, onChange }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const findNextImpl = (query: string, direction: 'next' | 'prev') => {
        const el = textareaRef.current;
        if (!el || !query) return;

        const text = el.value.toLowerCase();
        const q = query.toLowerCase();
        let start = el.selectionEnd;
        let index = -1;

        if (direction === 'next') {
            if (start >= text.length) start = 0;
            index = text.indexOf(q, start);
            if (index === -1) index = text.indexOf(q, 0);
        } else {
            const preText = text.substring(0, el.selectionStart).toLowerCase();
            index = preText.lastIndexOf(q);
            if (index === -1) index = text.lastIndexOf(q);
        }

        if (index !== -1) {
            el.setSelectionRange(index, index + query.length);
            el.focus();
        }
    };

    React.useImperativeHandle(ref, () => ({
        findNext: findNextImpl,
        replace: (query: string, replacement: string) => {
            const el = textareaRef.current;
            if (!el || !query) return;

            const start = el.selectionStart;
            const end = el.selectionEnd;
            const selectedText = el.value.substring(start, end);

            if (selectedText.toLowerCase() === query.toLowerCase()) {
                const newValue = el.value.substring(0, start) + replacement + el.value.substring(end);
                onChange(newValue);
                setTimeout(() => {
                    if (textareaRef.current) {
                        textareaRef.current.setSelectionRange(start, start + replacement.length);
                        textareaRef.current.focus();
                    }
                }, 0);
                return;
            }
            findNextImpl(query, 'next');
        },
        replaceAll: (query: string, replacement: string) => {
            const el = textareaRef.current;
            if (!el || !query) return;
            const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const newValue = content.replace(regex, replacement);
            onChange(newValue);
        }
    }));

    useEffect(() => {
        // Auto-focus on mount
        textareaRef.current?.focus();
    }, []);

    return (
        <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 resize-none outline-none text-gray-800 font-mono text-base bg-transparent"
            placeholder="Start typing..."
            spellCheck={false}
        />
    );
});
Notepad.displayName = 'Notepad';

export default Notepad;

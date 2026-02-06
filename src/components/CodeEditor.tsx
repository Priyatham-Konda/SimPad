
import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language = 'javascript' }) => {
    const handleEditorDidMount: OnMount = (editor, _monaco) => {
        // Optional: Configure editor settings here
        editor.focus();
    };

    return (
        <div className="h-full w-full overflow-hidden pt-2">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue="// Paste your code here"
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                theme="vs-dark" // Using dark theme as it's preferred for code
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    );
};

export default CodeEditor;

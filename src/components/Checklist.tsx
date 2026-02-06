
import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface ChecklistProps {
    items: ChecklistItem[];
    setItems: (items: ChecklistItem[]) => void;
}

// Helper to find item and its parent by id
const findItem = (items: ChecklistItem[], id: string): { item: ChecklistItem, parentItems: ChecklistItem[] } | null => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) return { item: items[i], parentItems: items };
        if (items[i].subtasks) {
            const found = findItem(items[i].subtasks!, id);
            if (found) return found;
        }
    }
    return null;
};

// Recursive Item Component
const SortableTaskItem = ({
    item,
    onToggle,
    onDelete,
    onAddSubtask,
    onToggleExpand,
    depth = 0,
}: {
    item: ChecklistItem & { expanded?: boolean };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onAddSubtask: (id: string) => void;
    onToggleExpand: (id: string) => void;
    depth?: number;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginLeft: `${depth * 20}px`,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`group mb-2 ${isDragging ? 'z-50' : ''}`}>
            <div className={`
        flex items-center p-2 rounded-lg border border-[#D0C6B0] bg-[#E8DEC7] shadow-sm hover:shadow-md transition-all
        ${item.completed ? 'bg-[#D0C6B0]/30 opacity-75' : ''}
      `}>
                {/* Drag Handle */}
                <div {...attributes} {...listeners} className="p-1 cursor-grab text-[#8B7E66] hover:text-[#5c5446]">
                    <GripVertical className="w-4 h-4" />
                </div>

                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggle(item.id)}
                    className="w-5 h-5 mx-2 text-[#8B7E66] rounded focus:ring-[#8B7E66] cursor-pointer accent-[#8B7E66] bg-[#F1E9D2]"
                />

                {/* Text */}
                <span
                    className={`flex-1 text-sm ${item.completed ? 'text-[#8B7E66] line-through' : 'text-[#2C241B]'}`}
                >
                    {item.text}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onAddSubtask(item.id)}
                        className="p-1.5 text-xs font-medium text-[#F1E9D2] bg-[#5c5446] rounded hover:bg-[#2C241B] flex items-center gap-1 shadow-sm"
                        title="Add Subtask"
                    >
                        <Plus className="w-3 h-3" />
                        Subtask
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-[#8B7E66] hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Render Subtasks if exist */}
            {item.subtasks && item.subtasks.length > 0 && (
                <div className="mt-2 border-l-2 border-gray-100 ml-4 pl-0">
                    <SortableContext items={item.subtasks.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {item.subtasks.map(sub => (
                            <SortableTaskItem
                                key={sub.id}
                                item={sub}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onAddSubtask={onAddSubtask}
                                onToggleExpand={onToggleExpand}
                                depth={0}
                            />
                        ))}
                    </SortableContext>
                </div>
            )}
        </div>
    );
};

// Main Component
const Checklist: React.FC<ChecklistProps> = ({ items, setItems }) => {
    const [newItemText, setNewItemText] = useState('');
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleAddItem = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newItemText.trim()) return;
        const newItem: ChecklistItem = {
            id: Date.now().toString(),
            text: newItemText,
            completed: false,
            subtasks: []
        };
        setItems([...items, newItem]);
        setNewItemText('');
    };

    const handleToggle = (id: string) => {
        const newItems = [...items];
        const updateRecursive = (list: ChecklistItem[]) => {
            for (let item of list) {
                if (item.id === id) {
                    item.completed = !item.completed;
                    return true;
                }
                if (item.subtasks && updateRecursive(item.subtasks)) return true;
            }
            return false;
        };
        updateRecursive(newItems);
        setItems(newItems);
    };

    const handleDelete = (id: string) => {
        const removeRecursive = (list: ChecklistItem[]): ChecklistItem[] => {
            return list.filter(item => {
                if (item.id === id) return false;
                if (item.subtasks) {
                    item.subtasks = removeRecursive(item.subtasks);
                }
                return true;
            });
        };
        setItems(removeRecursive([...items]));
    };

    const handleAddSubtask = (parentId: string) => {
        const newSubtask: ChecklistItem = {
            id: Date.now().toString(),
            text: "New Subtask", // Could prompt user or autofocus
            completed: false,
            subtasks: []
        };

        const addRecursive = (list: ChecklistItem[]) => {
            for (const item of list) {
                if (item.id === parentId) {
                    item.subtasks = [...(item.subtasks || []), newSubtask];
                    return true;
                }
                if (item.subtasks && addRecursive(item.subtasks)) return true;
            }
            return false;
        };

        const newItems = JSON.parse(JSON.stringify(items)); // Deep clone for safety with nested objects
        addRecursive(newItems);
        setItems(newItems);
    };

    // Drag End Handler
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        // Search for the lists containing active and over items
        // For simplicity in this rapid iteration, implementing flat reordering at root
        // or recursive reordering if they share the same parent array.

        // We need a function that finds the array containing the ID
        const findContainer = (list: ChecklistItem[], id: string): ChecklistItem[] | undefined => {
            if (list.find(i => i.id === id)) return list;
            for (const item of list) {
                if (item.subtasks) {
                    const found = findContainer(item.subtasks, id);
                    if (found) return found;
                }
            }
            return undefined;
        };

        const newItems = JSON.parse(JSON.stringify(items));
        const activeContainer = findContainer(newItems, active.id as string);
        const overContainer = findContainer(newItems, over.id as string);

        if (activeContainer && overContainer && activeContainer === overContainer) {
            const oldIndex = activeContainer.findIndex(i => i.id === active.id);
            const newIndex = activeContainer.findIndex(i => i.id === over.id);

            // Mutate the container in place (it's a reference to the array inside newItems)
            const [movedItem] = activeContainer.splice(oldIndex, 1);
            activeContainer.splice(newIndex, 0, movedItem);

            setItems(newItems);
        }
    };

    return (
        <div className="h-full flex flex-col p-4 max-w-3xl mx-auto">
            <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 p-3 border border-[#D0C6B0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7E66] shadow-sm bg-[#E8DEC7] text-[#2C241B] placeholder-[#8B7E66]"
                />
                <button
                    type="submit"
                    className="bg-[#8B7E66] text-[#F1E9D2] px-6 py-2 rounded-lg hover:bg-[#5c5446] transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add
                </button>
            </form>

            <div className="flex-1 overflow-y-auto pr-2 pb-10">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items.map(i => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map(item => (
                            <SortableTaskItem
                                key={item.id}
                                item={item}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                onAddSubtask={handleAddSubtask}
                                onToggleExpand={() => { }}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                            <CheckboxIcon className="w-8 h-8 text-gray-300" />
                        </div>
                        <p>No tasks yet. Start planning!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Placeholder icon for empty state
const CheckboxIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default Checklist;

import React from 'react';
import { MousePointer2, Image, Type, Trash2, Undo2, Redo2 } from 'lucide-react';

export default function EditorToolbar({ activeTool, onToolChange, onDelete, onUndo, onRedo }) {
  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select', color: 'blue' },
    { id: 'stickers', icon: Image, label: 'Stickers', color: 'purple' },
    { id: 'text', icon: Type, label: 'Text', color: 'green' },
  ];

  const colorMap = {
    blue: 'bg-blue-500 text-white ring-blue-300',
    purple: 'bg-purple-500 text-white ring-purple-300',
    green: 'bg-green-500 text-white ring-green-300',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-slate-100">
      {/* Main Tools */}
      <div className="flex items-center gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200
                ${isActive 
                  ? `${colorMap[tool.color]} ring-4 scale-105 shadow-lg` 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102'}`}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{tool.label}</span>
            </button>
          );
        })}
        
        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 ml-2"
        >
          <Trash2 size={20} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200"
          title="Undo"
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={onRedo}
          className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200"
          title="Redo"
        >
          <Redo2 size={20} />
        </button>
      </div>
    </div>
  );
}
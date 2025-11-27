import React, { useState } from 'react';
import { X, Type } from 'lucide-react';

const COLORS = [
  { id: 'black', value: '#000000', name: 'Black' },
  { id: 'white', value: '#ffffff', name: 'White' },
  { id: 'red', value: '#ef4444', name: 'Red' },
  { id: 'blue', value: '#3b82f6', name: 'Blue' },
  { id: 'green', value: '#22c55e', name: 'Green' },
  { id: 'purple', value: '#a855f7', name: 'Purple' },
  { id: 'orange', value: '#f97316', name: 'Orange' },
  { id: 'pink', value: '#ec4899', name: 'Pink' },
];

const FONTS = [
  { id: 'fredoka', value: 'Fredoka', name: 'Fredoka' },
  { id: 'arial', value: 'Arial', name: 'Arial' },
  { id: 'impact', value: 'Impact', name: 'Impact' },
];

const SIZES = [
  { id: 'small', label: 'Small', icon: 'A' },
  { id: 'medium', label: 'Medium', icon: 'A' },
  { id: 'large', label: 'Large', icon: 'A' },
];

export default function TextTool({ onAddText, onClose }) {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState('medium');
  const [font, setFont] = useState('Fredoka');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddText({ text: text.trim(), color, size, font });
      setText('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <Type size={18} className="text-green-500" />
          Add Text
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Input */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Your Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something cool..."
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-slate-700 font-medium transition-all"
            maxLength={30}
          />
          <p className="text-[10px] text-slate-400 mt-1 text-right">
            {text.length}/30 characters
          </p>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  color === c.value
                    ? 'ring-2 ring-offset-2 ring-green-400 scale-110'
                    : 'hover:scale-105'
                } ${c.id === 'white' ? 'border-slate-300' : 'border-transparent'}`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Size
          </label>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                className={`flex-1 py-2 rounded-xl font-bold transition-all duration-200 ${
                  size === s.id
                    ? 'bg-green-500 text-white ring-2 ring-green-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{ fontSize: s.id === 'small' ? '12px' : s.id === 'large' ? '18px' : '14px' }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Font
          </label>
          <div className="flex flex-col gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFont(f.value)}
                className={`py-2 px-4 rounded-xl font-bold text-left transition-all duration-200 ${
                  font === f.value
                    ? 'bg-green-500 text-white ring-2 ring-green-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{ fontFamily: f.value }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Preview
          </p>
          <div
            className="text-center py-4"
            style={{
              color: color,
              fontFamily: font,
              fontSize: size === 'small' ? '16px' : size === 'large' ? '28px' : '22px',
            }}
          >
            {text || 'Your text here...'}
          </div>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 ${
            text.trim()
              ? 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl hover:scale-102'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Add Text to Design ✨
        </button>
      </form>
    </div>
  );
}
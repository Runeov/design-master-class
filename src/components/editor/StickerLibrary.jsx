import React from 'react';

// Stickers using emoji characters - will be rendered as Fabric.js Text objects
const STICKERS = [
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'shield', name: 'Shield', emoji: '🛡️' },
  { id: 'star', name: 'Star', emoji: '⭐' },
  { id: 'heart', name: 'Heart', emoji: '❤️' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡' },
  { id: 'crown', name: 'Crown', emoji: '👑' },
  { id: 'fire', name: 'Fire', emoji: '🔥' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀' },
  { id: 'diamond', name: 'Diamond', emoji: '💎' },
  { id: 'gamepad', name: 'Gaming', emoji: '🎮' },
  { id: 'sword', name: 'Sword', emoji: '⚔️' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'skull', name: 'Skull', emoji: '💀' },
  { id: 'ghost', name: 'Ghost', emoji: '👻' },
  { id: 'alien', name: 'Alien', emoji: '👽' },
  { id: 'robot', name: 'Robot', emoji: '🤖' },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄' },
  { id: 'dragon', name: 'Dragon', emoji: '🐉' },
];

export default function StickerLibrary({ onSelectSticker, isCompact = false }) {
  return (
    <div className="p-3 h-full max-h-[500px] overflow-y-auto">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center sticky top-0 bg-white py-1">
        🎨 Stickers
      </h3>
      <div className={`grid gap-2 ${isCompact ? 'grid-cols-3' : 'grid-cols-4 lg:grid-cols-3'}`}>
        {STICKERS.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onSelectSticker(sticker.emoji)}
            className={`aspect-square bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${isCompact ? 'text-2xl' : 'text-3xl'}`}
            title={sticker.name}
          >
            {sticker.emoji}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 text-center mt-3 sticky bottom-0 bg-white py-1">
        👆 Click to add
      </p>
    </div>
  );
}
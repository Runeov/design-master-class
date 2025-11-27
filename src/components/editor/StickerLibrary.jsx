import React from 'react';

// Placeholder stickers using emoji and SVG data URLs
const STICKERS = [
  {
    id: 'wolf',
    name: 'Wolf',
    emoji: '🐺',
    // Simple wolf silhouette SVG
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🐺</text>
      </svg>
    `),
  },
  {
    id: 'shield',
    name: 'Shield',
    emoji: '🛡️',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🛡️</text>
      </svg>
    `),
  },
  {
    id: 'star',
    name: 'Star',
    emoji: '⭐',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">⭐</text>
      </svg>
    `),
  },
  {
    id: 'heart',
    name: 'Heart',
    emoji: '❤️',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">❤️</text>
      </svg>
    `),
  },
  {
    id: 'lightning',
    name: 'Lightning',
    emoji: '⚡',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">⚡</text>
      </svg>
    `),
  },
  {
    id: 'crown',
    name: 'Crown',
    emoji: '👑',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">👑</text>
      </svg>
    `),
  },
  {
    id: 'fire',
    name: 'Fire',
    emoji: '🔥',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🔥</text>
      </svg>
    `),
  },
  {
    id: 'rocket',
    name: 'Rocket',
    emoji: '🚀',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🚀</text>
      </svg>
    `),
  },
  {
    id: 'diamond',
    name: 'Diamond',
    emoji: '💎',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">💎</text>
      </svg>
    `),
  },
  {
    id: 'gamepad',
    name: 'Gaming',
    emoji: '🎮',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🎮</text>
      </svg>
    `),
  },
  {
    id: 'sword',
    name: 'Sword',
    emoji: '⚔️',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">⚔️</text>
      </svg>
    `),
  },
  {
    id: 'music',
    name: 'Music',
    emoji: '🎵',
    url: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50" y="70" font-size="60" text-anchor="middle">🎵</text>
      </svg>
    `),
  },
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
            onClick={() => onSelectSticker(sticker.url)}
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
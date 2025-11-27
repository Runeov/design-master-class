import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, Package, RotateCw, Type, Move, Paintbrush, Eraser, MousePointer2, Scissors, Wand2 } from 'lucide-react';

export const DemoToolbox = () => {
  const [activeTool, setActiveTool] = useState(null);
  
  const tools = [
    { id: 'select', icon: MousePointer2, name: 'Selection', desc: 'Click and drag to select parts of your image. Like drawing a box around what you want to work with!', color: 'blue' },
    { id: 'move', icon: Move, name: 'Move Tool', desc: 'Drag layers around like moving stickers on a page. Cross arrows = Move!', color: 'green' },
    { id: 'brush', icon: Paintbrush, name: 'Paintbrush', desc: 'Paint colors on your image. Choose any color and brush size you want!', color: 'purple' },
    { id: 'eraser', icon: Eraser, name: 'Eraser', desc: 'Removes pixels permanently. Be careful - this cannot be undone easily!', color: 'red' },
    { id: 'scissors', icon: Scissors, name: 'Free Select', desc: 'Draw around objects to select them. Like cutting out shapes from paper!', color: 'orange' },
    { id: 'wand', icon: Wand2, name: 'Magic Wand', desc: 'Click to select all similar colors at once. Magic for removing backgrounds!', color: 'indigo' },
  ];

  const colorMap = {
    blue: 'bg-blue-500 ring-blue-300',
    green: 'bg-green-500 ring-green-300',
    purple: 'bg-purple-500 ring-purple-300',
    red: 'bg-red-500 ring-red-300',
    orange: 'bg-orange-500 ring-orange-300',
    indigo: 'bg-indigo-500 ring-indigo-300',
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-3 gap-2 mb-4 w-full">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(isActive ? null : tool.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1
                ${isActive
                  ? `${colorMap[tool.color]} text-white ring-4 scale-105 border-transparent`
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:scale-102'}`}
            >
              <Icon size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wide">{tool.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
      <div className={`w-full p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex items-center justify-center
        ${activeTool ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-dashed border-slate-300'}`}>
        {activeTool ? (
          <div className="text-center">
            <p className="font-bold text-slate-700 mb-1">{tools.find(t => t.id === activeTool)?.name}</p>
            <p className="text-sm text-slate-500">{tools.find(t => t.id === activeTool)?.desc}</p>
          </div>
        ) : (
          <p className="text-slate-400 text-sm font-medium">👆 Click a tool to learn about it!</p>
        )}
      </div>
    </div>
  );
};

export const DemoScale = () => {
  const [scale, setScale] = useState(1);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-4 border border-slate-200">
        <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform duration-75" style={{ transform: `scale(${scale})` }}>
          <ImageIcon size={32} />
        </div>
      </div>
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Drag to Resize</label>
      <input type="range" min="0.5" max="1.8" step="0.1" value={scale} onChange={(e) => setScale(e.target.value)} className="w-full accent-blue-500" />
    </div>
  );
};

export const DemoQuality = () => {
  const [q, setQ] = useState(100);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden mb-4 border border-slate-200">
        <Package size={80} className="text-purple-500 transition-all duration-300" style={{ filter: `blur(${q < 40 ? (40-q)/5 : 0}px) grayscale(${q < 40 ? (40-q)*2 : 0}%)`, opacity: q < 40 ? 0.7 : 1 }} />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-mono">{Math.floor((q/100)*500)+12} KB</div>
      </div>
      <div className="flex justify-between w-full text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"><span>Low</span><span>High</span></div>
      <input type="range" min="10" max="100" step="10" value={q} onChange={(e) => setQ(e.target.value)} className="w-full accent-purple-500" />
    </div>
  );
};

export const DemoTransform = () => {
  const [rot, setRot] = useState(0);
  const [flip, setFlip] = useState(1);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-48 bg-pink-50 rounded-lg flex items-center justify-center mb-4 border border-pink-100 shadow-inner overflow-hidden">
        <div className="text-7xl transition-transform duration-500 select-none" style={{ transform: `rotate(${rot}deg) scaleX(${flip})` }}>🦜</div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <button onClick={() => setRot(r => r + 90)} className="bg-white border hover:bg-pink-50 text-slate-600 py-2 rounded-lg font-bold text-sm transition-colors"><RotateCw size={16} className="inline mr-1" /> Rotate</button>
        <button onClick={() => setFlip(s => s * -1)} className="bg-white border hover:bg-pink-50 text-slate-600 py-2 rounded-lg font-bold text-sm transition-colors">↔ Flip</button>
      </div>
    </div>
  );
};

export const DemoLayers = () => {
  const [hasLayer, setHasLayer] = useState(false);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        <div className="absolute w-32 h-32 bg-white border-2 border-dashed border-slate-400 flex items-center justify-center z-0 text-xs text-slate-400 font-bold uppercase tracking-widest rounded-lg">Template</div>
        <div className={`absolute w-20 h-20 bg-blue-500 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-all duration-500 ${hasLayer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>🐺</div>
      </div>
      <button onClick={() => setHasLayer(!hasLayer)} className={`px-6 py-2 rounded-full font-bold text-white shadow transition-transform active:scale-95 ${hasLayer ? 'bg-slate-400' : 'bg-blue-500'}`}>{hasLayer ? 'Remove Layer' : 'Add "Wolf" Layer'}</button>
    </div>
  );
};

export const DemoMask = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('black');
  
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if(!ctx) return;
    ctx.fillStyle = '#6366f1'; ctx.fillRect(20, 20, 160, 160);
    ctx.fillStyle = 'white'; ctx.font = '60px sans-serif'; ctx.fillText('🛡️', 70, 120);
  }, []);

  const draw = (e) => {
    if (e.buttons !== 1) return;
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.lineWidth = 20; ctx.lineCap = 'round';
    if (mode === 'black') { ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); } 
    else { ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#6366f1'; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-48 h-48 bg-white border border-slate-300 rounded-lg shadow-inner overflow-hidden cursor-crosshair touch-none mb-4">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        <canvas ref={canvasRef} width={200} height={200} className="absolute top-0 left-0 w-full h-full" onMouseMove={draw} onMouseDown={draw} onTouchMove={draw} onTouchStart={draw} />
        <div className="absolute bottom-1 w-full text-center pointer-events-none opacity-40 text-[10px]">Drag to Paint</div>
      </div>
      <div className="flex gap-2 w-full">
        <button onClick={() => setMode('black')} className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${mode === 'black' ? 'bg-black text-white ring-2 ring-offset-1 ring-black' : 'bg-slate-200 text-slate-600'}`}>⚫ Hide</button>
        <button onClick={() => setMode('white')} className={`flex-1 py-2 rounded-lg font-bold text-xs border transition-colors ${mode === 'white' ? 'bg-white text-indigo-600 ring-2 ring-offset-1 ring-indigo-500 border-indigo-500' : 'bg-white text-slate-600 border-slate-300'}`}>⚪ Show</button>
      </div>
    </div>
  );
};

export const DemoText = () => {
  const [text, setText] = useState('Follow Me Elikost');
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-48 h-48 bg-green-50 rounded-full border-4 border-green-200 shadow-inner flex items-center justify-center mb-4 relative overflow-hidden">
         <div className="text-center transform rotate-3">
            <span className="text-4xl block">👕</span>
            <div className="font-bold text-slate-800 text-sm mt-2 font-mono bg-white/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm border border-white/60">
              {text || "..."}
            </div>
         </div>
      </div>
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
        <Type size={12} /> Sign Your Work
      </label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-center font-mono text-sm focus:ring-2 focus:ring-green-400 outline-none text-slate-600" placeholder="Type here..." />
    </div>
  );
};
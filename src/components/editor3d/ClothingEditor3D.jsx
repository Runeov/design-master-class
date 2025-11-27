import React, { useState, useCallback, useEffect, useRef } from 'react';
import Editor3D from './Editor3D';
import UVView from './UVView';
import { Sparkles, Palette, Eye, Download, RotateCcw, Layers } from 'lucide-react';

// Main 3D Clothing Editor - Full editing experience
export default function ClothingEditor3D() {
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'uv', 'split'
  const [activeTool, setActiveTool] = useState('rotate');
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(20);
  const [textureCanvas, setTextureCanvas] = useState(null);
  const [textureDataUrl, setTextureDataUrl] = useState(null);

  // Initialize texture canvas
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some guide lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Center cross
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.moveTo(0, 256);
    ctx.lineTo(512, 256);
    ctx.stroke();
    
    // Border
    ctx.strokeStyle = '#D1D5DB';
    ctx.setLineDash([]);
    ctx.strokeRect(10, 10, 492, 492);
    
    setTextureCanvas(canvas);
    setTextureDataUrl(canvas.toDataURL());
  }, []);

  // Handle texture updates from painting
  const handleTextureUpdate = useCallback((dataUrl) => {
    setTextureDataUrl(dataUrl);
  }, []);

  // Clear the canvas
  const handleClear = useCallback(() => {
    if (!textureCanvas) return;
    
    const ctx = textureCanvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    
    setTextureDataUrl(textureCanvas.toDataURL());
  }, [textureCanvas]);

  // Export the design
  const handleExport = useCallback(() => {
    if (!textureDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'roblox-clothing-design.png';
    link.href = textureDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [textureDataUrl]);

  // Color palette
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#1ABC9C',
    '#E74C3C', '#9B59B6', '#3498DB', '#2ECC71',
    '#000000', '#FFFFFF', '#808080', '#C0392B'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 flex items-center justify-center gap-3">
            <Sparkles className="text-purple-500" size={40} />
            3D Clothing Designer
            <Sparkles className="text-purple-500" size={40} />
          </h1>
          <p className="text-lg text-slate-600">
            Paint directly on 3D models to create amazing Roblox clothing!
          </p>
        </div>

        {/* Main Toolbar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">View:</span>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === '3d' 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🎮 3D View
                </button>
                <button
                  onClick={() => setViewMode('uv')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'uv' 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📐 UV View
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'split' 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Layers size={16} className="inline mr-1" />
                  Split
                </button>
              </div>
            </div>

            {/* Tool Selection */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Tool:</span>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTool('rotate')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTool === 'rotate' 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🔄 Rotate
                </button>
                <button
                  onClick={() => setActiveTool('paint')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTool === 'paint' 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🖌️ Paint
                </button>
                <button
                  onClick={() => setActiveTool('erase')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTool === 'erase' 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🧹 Erase
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-all"
              >
                <RotateCcw size={16} />
                Clear
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-sm font-medium text-white shadow-md transition-all"
              >
                <Download size={16} />
                Export PNG
              </button>
            </div>
          </div>

          {/* Brush Settings */}
          {(activeTool === 'paint' || activeTool === 'erase') && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-6">
                {/* Brush Size */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Brush Size:</span>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <span className="text-sm font-bold text-purple-600 w-8">{brushSize}px</span>
                </div>

                {/* Color Palette */}
                {activeTool === 'paint' && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Color:</span>
                    <div className="flex flex-wrap gap-1">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrushColor(color)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                            brushColor === color 
                              ? 'border-purple-500 scale-110 ring-2 ring-purple-300' 
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* 3D View */}
          {(viewMode === '3d' || viewMode === 'split') && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-3">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <span>🎮</span> 3D Model View
                </h2>
              </div>
              <Editor3D
                onTextureUpdate={handleTextureUpdate}
                initialTexture={textureDataUrl}
                className="h-[500px]"
              />
            </div>
          )}

          {/* UV View */}
          {(viewMode === 'uv' || viewMode === 'split') && (
            <UVView
              textureCanvas={textureCanvas}
              onPaint={handleTextureUpdate}
              brushColor={brushColor}
              brushSize={brushSize}
              activeTool={activeTool}
              className="h-fit"
            />
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span>💡</span> Tips for 3D Clothing Design
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-semibold text-purple-700 mb-2">🔄 Rotate Mode</h4>
              <p className="text-sm text-purple-600">
                Drag to rotate the 3D model and see your design from all angles. Scroll to zoom in/out.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">🖌️ Paint Mode</h4>
              <p className="text-sm text-indigo-600">
                Click and drag on the 3D model to paint directly. Choose colors and brush size from the toolbar.
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <h4 className="font-semibold text-pink-700 mb-2">📐 UV View</h4>
              <p className="text-sm text-pink-600">
                Switch to UV view to see the flat texture layout. Great for precise designs and patterns!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
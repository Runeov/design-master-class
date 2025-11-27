import React, { useRef, useEffect, useState, useCallback } from 'react';

// UV View component - Shows the 2D texture layout for painting
export default function UVView({ 
  textureCanvas, 
  onPaint, 
  brushColor = '#FF6B6B', 
  brushSize = 20,
  activeTool = 'paint',
  className = '' 
}) {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [ctx, setCtx] = useState(null);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  // Draw the texture canvas onto the UV view
  useEffect(() => {
    if (!ctx || !textureCanvas) return;
    
    // Clear and draw the texture
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(textureCanvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw UV grid overlay
    drawUVGrid(ctx, canvasRef.current.width, canvasRef.current.height);
  }, [ctx, textureCanvas]);

  // Draw UV grid overlay
  const drawUVGrid = (context, width, height) => {
    context.strokeStyle = 'rgba(100, 100, 255, 0.3)';
    context.lineWidth = 1;
    
    // Draw grid lines
    const gridSize = 64;
    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    // Draw labels for body parts
    context.fillStyle = 'rgba(100, 100, 255, 0.7)';
    context.font = '12px Arial';
    context.fillText('FRONT', 10, 20);
    context.fillText('BACK', width - 50, 20);
    context.fillText('LEFT', 10, height / 2);
    context.fillText('RIGHT', width - 50, height / 2);
  };

  // Handle painting
  const paint = useCallback((e) => {
    if (!ctx || !textureCanvas) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = textureCanvas.width / rect.width;
    const scaleY = textureCanvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Paint on the texture canvas
    const texCtx = textureCanvas.getContext('2d');
    texCtx.beginPath();
    texCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    texCtx.fillStyle = activeTool === 'erase' ? '#FFFFFF' : brushColor;
    texCtx.fill();
    
    // Redraw the UV view
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(textureCanvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
    drawUVGrid(ctx, canvasRef.current.width, canvasRef.current.height);
    
    // Notify parent
    if (onPaint) {
      onPaint(textureCanvas.toDataURL());
    }
  }, [ctx, textureCanvas, brushColor, brushSize, activeTool, onPaint]);

  const handleMouseDown = (e) => {
    if (activeTool === 'rotate') return;
    setIsPainting(true);
    paint(e);
  };

  const handleMouseMove = (e) => {
    if (!isPainting || activeTool === 'rotate') return;
    paint(e);
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  return (
    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span>📐</span> UV Texture View
        </h3>
      </div>

      {/* Canvas */}
      <div className="p-4">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair"
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-2 font-medium">📍 UV Layout Guide:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Front of shirt</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Back of shirt</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
              <span>Left sleeve</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-pink-200 rounded"></div>
              <span>Right sleeve</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
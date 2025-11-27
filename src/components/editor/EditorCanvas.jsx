import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import * as fabric from 'fabric';

const CANVAS_WIDTH = 585;
const CANVAS_HEIGHT = 559;

const EditorCanvas = forwardRef(({ activeTool }, ref) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const isLoadingHistoryRef = useRef(false);

  // Save current state to history
  const saveToHistory = useCallback(() => {
    if (!fabricRef.current || isLoadingHistoryRef.current) return;
    
    const json = JSON.stringify(fabricRef.current.toJSON());
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(json);
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
  }, []);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#ffffff',
        selection: true,
        preserveObjectStacking: true,
      });
      
      fabricRef.current = canvas;

      // Draw T-Shirt template guide
      drawTemplateGuide(canvas);

      // Save initial state after a short delay
      setTimeout(() => saveToHistory(), 200);

      // Handle object modifications
      canvas.on('object:modified', () => {
        if (!isLoadingHistoryRef.current) {
          saveToHistory();
        }
      });
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [saveToHistory]);

  // Draw template guide lines
  const drawTemplateGuide = (canvas) => {
    // Front area guide (left side)
    const frontGuide = new fabric.Rect({
      left: 30,
      top: 30,
      width: 240,
      height: 280,
      fill: '#f8fafc',
      stroke: '#e2e8f0',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      rx: 10,
      ry: 10,
    });

    // Back area guide (right side)
    const backGuide = new fabric.Rect({
      left: 310,
      top: 30,
      width: 240,
      height: 280,
      fill: '#f8fafc',
      stroke: '#e2e8f0',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      rx: 10,
      ry: 10,
    });

    // Labels
    const frontLabel = new fabric.FabricText('👕 FRONT', {
      left: 110,
      top: 320,
      fontSize: 16,
      fontFamily: 'Fredoka, sans-serif',
      fill: '#94a3b8',
      selectable: false,
      evented: false,
    });

    const backLabel = new fabric.FabricText('👕 BACK', {
      left: 400,
      top: 320,
      fontSize: 16,
      fontFamily: 'Fredoka, sans-serif',
      fill: '#94a3b8',
      selectable: false,
      evented: false,
    });

    // Design area indicators
    const frontDesignArea = new fabric.Rect({
      left: 80,
      top: 80,
      width: 140,
      height: 140,
      fill: 'transparent',
      stroke: '#cbd5e1',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
      rx: 5,
      ry: 5,
    });

    const backDesignArea = new fabric.Rect({
      left: 360,
      top: 80,
      width: 140,
      height: 140,
      fill: 'transparent',
      stroke: '#cbd5e1',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
      rx: 5,
      ry: 5,
    });

    // Add helper text
    const helperText = new fabric.FabricText('Drag stickers here! ⬆️', {
      left: CANVAS_WIDTH / 2,
      top: CANVAS_HEIGHT - 40,
      fontSize: 14,
      fontFamily: 'Fredoka, sans-serif',
      fill: '#94a3b8',
      originX: 'center',
      selectable: false,
      evented: false,
    });

    canvas.add(frontGuide, backGuide, frontDesignArea, backDesignArea, frontLabel, backLabel, helperText);
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    addSticker: (emoji) => {
      if (!fabricRef.current) return;
      
      // Create emoji as a Text object - this renders properly in Fabric.js
      const stickerText = new fabric.FabricText(emoji, {
        left: CANVAS_WIDTH / 2,
        top: 150,
        fontSize: 60,
        originX: 'center',
        originY: 'center',
        cornerStyle: 'circle',
        cornerColor: '#6366f1',
        cornerStrokeColor: '#ffffff',
        borderColor: '#6366f1',
        transparentCorners: false,
      });
      
      fabricRef.current.add(stickerText);
      fabricRef.current.setActiveObject(stickerText);
      fabricRef.current.renderAll();
      saveToHistory();
    },

    addText: ({ text, color, size, font }) => {
      if (!fabricRef.current) return;
      
      const fontSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;
      
      const textObj = new fabric.IText(text, {
        left: CANVAS_WIDTH / 2,
        top: 150,
        fontSize: fontSize,
        fontFamily: font || 'Fredoka, sans-serif',
        fill: color || '#000000',
        originX: 'center',
        originY: 'center',
        cornerStyle: 'circle',
        cornerColor: '#6366f1',
        cornerStrokeColor: '#ffffff',
        borderColor: '#6366f1',
        transparentCorners: false,
      });
      
      fabricRef.current.add(textObj);
      fabricRef.current.setActiveObject(textObj);
      fabricRef.current.renderAll();
      saveToHistory();
    },

    deleteSelected: () => {
      if (!fabricRef.current) return;
      
      const activeObjects = fabricRef.current.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach(obj => {
          if (obj.selectable) {
            fabricRef.current.remove(obj);
          }
        });
        fabricRef.current.discardActiveObject();
        fabricRef.current.renderAll();
        saveToHistory();
      }
    },

    undo: () => {
      if (!fabricRef.current || historyIndexRef.current <= 0) return;
      
      isLoadingHistoryRef.current = true;
      historyIndexRef.current -= 1;
      fabricRef.current.loadFromJSON(historyRef.current[historyIndexRef.current]).then(() => {
        fabricRef.current.renderAll();
        isLoadingHistoryRef.current = false;
      });
    },

    redo: () => {
      if (!fabricRef.current || historyIndexRef.current >= historyRef.current.length - 1) return;
      
      isLoadingHistoryRef.current = true;
      historyIndexRef.current += 1;
      fabricRef.current.loadFromJSON(historyRef.current[historyIndexRef.current]).then(() => {
        fabricRef.current.renderAll();
        isLoadingHistoryRef.current = false;
      });
    },

    exportToPNG: () => {
      if (!fabricRef.current) return;
      
      const dataURL = fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
      
      const link = document.createElement('a');
      link.download = 'my-roblox-tshirt.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // Get texture data URL for 3D preview
    getTextureDataUrl: () => {
      if (!fabricRef.current) return null;
      
      return fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
    },

    // Get the Fabric canvas instance for real-time updates
    getCanvas: () => fabricRef.current,
  }), [saveToHistory]);

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
      <canvas ref={canvasRef} />
      
      {/* Canvas overlay instructions */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <span className="text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
          👆 Click stickers to select • Drag to move • Corners to resize
        </span>
      </div>
    </div>
  );
});

EditorCanvas.displayName = 'EditorCanvas';

export default EditorCanvas;
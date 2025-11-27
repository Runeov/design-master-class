import React, { useState, useCallback } from 'react';
import EditorCanvas from './EditorCanvas';
import EditorToolbar from './EditorToolbar';
import StickerLibrary from './StickerLibrary';
import TextTool from './TextTool';
import ExportButton from './ExportButton';
import { Download, Sparkles } from 'lucide-react';

export default function RobloxTShirtEditor() {
  const [activeTool, setActiveTool] = useState('select');
  const [showStickers, setShowStickers] = useState(false);
  const [showTextTool, setShowTextTool] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleToolChange = useCallback((tool) => {
    setActiveTool(tool);
    if (tool === 'stickers') {
      setShowStickers(true);
      setShowTextTool(false);
    } else if (tool === 'text') {
      setShowTextTool(true);
      setShowStickers(false);
    } else {
      setShowStickers(false);
      setShowTextTool(false);
    }
  }, []);

  const handleAddSticker = useCallback((stickerUrl) => {
    if (canvasRef) {
      canvasRef.addSticker(stickerUrl);
    }
    setShowStickers(false);
    setActiveTool('select');
  }, [canvasRef]);

  const handleAddText = useCallback((textConfig) => {
    if (canvasRef) {
      canvasRef.addText(textConfig);
    }
    setShowTextTool(false);
    setActiveTool('select');
  }, [canvasRef]);

  const handleDelete = useCallback(() => {
    if (canvasRef) {
      canvasRef.deleteSelected();
    }
  }, [canvasRef]);

  const handleUndo = useCallback(() => {
    if (canvasRef) {
      canvasRef.undo();
    }
  }, [canvasRef]);

  const handleRedo = useCallback(() => {
    if (canvasRef) {
      canvasRef.redo();
    }
  }, [canvasRef]);

  const handleExport = useCallback(() => {
    if (canvasRef) {
      canvasRef.exportToPNG();
    }
  }, [canvasRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-500" size={40} />
            Design Your T-Shirt!
            <Sparkles className="text-yellow-500" size={40} />
          </h1>
          <p className="text-lg text-slate-600">
            Add stickers and text to create your awesome Roblox design!
          </p>
        </div>

        {/* Main Editor Area */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 overflow-hidden">
          {/* Toolbar */}
          <EditorToolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            onDelete={handleDelete}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />

          {/* Canvas and Side Panels */}
          <div className="flex flex-col lg:flex-row">
            {/* Sticker Library (Left Panel) - Always visible as sidebar */}
            <div className={`w-full lg:w-44 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white transition-all duration-300 ${showStickers ? 'block' : 'hidden lg:block'}`}>
              <StickerLibrary onSelectSticker={handleAddSticker} isCompact={!showStickers} />
            </div>

            {/* Canvas (Center) */}
            <div className="flex-1 p-4 bg-slate-50 flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-auto">
              <EditorCanvas
                ref={setCanvasRef}
                activeTool={activeTool}
              />
            </div>

            {/* Text Tool (Right Panel) */}
            {showTextTool && (
              <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-slate-100 p-4 bg-white">
                <TextTool onAddText={handleAddText} onClose={() => setShowTextTool(false)} />
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="p-6 bg-gradient-to-r from-orange-100 to-pink-100 border-t border-slate-100">
            <ExportButton onExport={handleExport} />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>💡 <strong>Tip:</strong> Click a sticker to add it, then drag to move it around!</p>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Download, Check, Sparkles } from 'lucide-react';

export default function ExportButton({ onExport }) {
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onExport();
    
    setIsExporting(false);
    setShowSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
          showSuccess
            ? 'bg-green-500 text-white'
            : isExporting
            ? 'bg-slate-300 text-slate-500 cursor-wait'
            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {showSuccess ? (
          <>
            <Check size={24} className="animate-bounce" />
            Downloaded! 🎉
          </>
        ) : isExporting ? (
          <>
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Download size={24} />
            Download My Design!
            <Sparkles size={20} className="text-yellow-200" />
          </>
        )}
      </button>
      
      {showSuccess && (
        <p className="text-green-600 font-medium text-sm animate-fade-in">
          ✅ Your T-Shirt design has been saved to your device!
        </p>
      )}
      
      {!showSuccess && !isExporting && (
        <p className="text-slate-500 text-sm">
          Saves as PNG file ready for Roblox upload
        </p>
      )}
    </div>
  );
}
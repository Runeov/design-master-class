import React, { useState } from 'react';

export default function Quiz({ data }) {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = (idx, correct) => {
    setSelected(idx);
    setIsCorrect(correct);
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-6">
      <p className="font-bold text-slate-700 mb-3 flex items-center gap-2">🧠 Quiz: {data.question}</p>
      <div className="space-y-2">
        {data.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelect(idx, opt.correct)} disabled={isCorrect === true}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all font-medium text-sm
              ${selected === idx 
                ? (opt.correct ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-red-50 border-red-500 ring-1 ring-red-500')
                : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
              } ${isCorrect === true && selected !== idx ? 'opacity-50' : ''}`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className={`mt-3 p-2 rounded-lg text-center font-bold text-sm animate-bounce ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? "🎉 Correct! You're a natural." : "❌ Not quite. Try again!"}
        </div>
      )}
    </div>
  );
}
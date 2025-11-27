import React from 'react';
import { MousePointer2 } from 'lucide-react';
import Quiz from './ui/Quiz';
import * as Demos from './demos/Demos';
import { getTheme } from '../lib/theme';

export default function LessonCard({ lesson, theme }) {
  const badgeMap = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    green: 'bg-emerald-100 text-emerald-700',
  };

  const stripMap = {
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
    pink: 'bg-pink-400',
    indigo: 'bg-indigo-400',
    green: 'bg-emerald-400',
  };

  const DemoComponent = Demos[lesson.demoComponent];
  const themeStyles = getTheme(theme);

  return (
    <article className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className={`absolute top-0 left-0 w-full h-3 ${stripMap[lesson.color] || 'bg-slate-400'}`}></div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeMap[lesson.color]}`}>Mission</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{lesson.title}</h3>
          </div>
          
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">{lesson.desc}</p>

          <div className={`p-5 rounded-2xl border ${themeStyles.subtle} ${themeStyles.border}`}>
            <h4 className={`font-bold mb-3 flex items-center gap-2 ${themeStyles.text}`}>
              <MousePointer2 size={16} /> How to cast it:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 font-medium">
              {lesson.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
          <Quiz data={lesson.quiz} />
        </div>

        <div className="w-full lg:w-1/3 min-w-[300px]">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col justify-center">
             <div className="text-center mb-4"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive Lab</span></div>
             {DemoComponent ? <DemoComponent /> : <div className="text-center text-slate-400">Demo Loading...</div>}
          </div>
        </div>
      </div>
    </article>
  );
}
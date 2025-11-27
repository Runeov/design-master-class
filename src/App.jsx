import React, { useState } from 'react';
import { Paintbrush, Shirt, CheckCircle } from 'lucide-react';
import { COURSES } from './data/courses';
import { getTheme } from './lib/theme';
import LessonCard from './components/LessonCard';

export default function App() {
  const [activeCourseId, setActiveCourseId] = useState(COURSES[0].id);
  const activeCourse = COURSES.find(c => c.id === activeCourseId) || COURSES[0];
  const themeStyles = getTheme(activeCourse.theme);

  const getIcon = (name) => {
    if (name === 'Shirt') return <Shirt className="w-4 h-4" />;
    return <Paintbrush className="w-4 h-4" />;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${themeStyles.bg} text-slate-700`}>
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-sm">🎨</span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Design <span className={`transition-colors duration-500 ${themeStyles.text}`}>Master Class</span>
            </h1>
          </div>
          <nav className="flex bg-slate-100 p-1 rounded-full gap-1 overflow-x-auto max-w-full">
            {COURSES.map(course => (
              <button key={course.id} onClick={() => setActiveCourseId(course.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap
                  ${activeCourseId === course.id ? `bg-white shadow-sm ring-1 ring-black/5 ${getTheme(course.theme).text}` : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`}
              >
                {getIcon(course.iconName)} {course.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">{activeCourse.hero.title}</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{activeCourse.hero.desc}</p>
          {activeCourse.hero.downloads && activeCourse.hero.downloads.length > 0 && (
            <div className="mt-8 inline-flex flex-wrap justify-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <span className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-2">Right-Click & Save Assets</span>
              {activeCourse.hero.downloads.map((dl, idx) => (
                <a key={idx} href={dl.url} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-${activeCourse.theme}-100 transition-colors group`}>
                  <span className="text-xl group-hover:scale-110 transition-transform">{dl.icon}</span>
                  <span className="font-bold text-sm text-slate-700">{dl.label}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <div className="space-y-16">
          {activeCourse.lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} theme={activeCourse.theme} />
          ))}
        </div>

        <div className="text-center mt-20 pt-10 border-t border-slate-200/50">
           {activeCourse.id === 'intro-roblox' ? (
             <div className="text-slate-400 font-semibold flex items-center justify-center gap-2"><CheckCircle className="text-green-500" /> You've mastered your first item!</div>
           ) : (
             <button onClick={() => setActiveCourseId('intro-roblox')} className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-transform hover:scale-105 shadow-lg">Start Next Course: Roblox <Shirt size={18} /></button>
           )}
        </div>
      </main>
    </div>
  );
}
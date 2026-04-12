import Typer from "../Typer/Typer";
import RecentPosts from "../RecentPosts/RecentPosts";

export interface Note {
  title: string;
  path: string;
  category: string;
  date: string;
  description?: string;
}

interface HomePageProps {
  allNotes: Note[];
}

const HomePage = ({ allNotes }: HomePageProps) => {
  return (
    <>
      <div className="mt-12 sm:mt-16 px-1 sm:px-8 mx-auto" style={{ maxWidth: '896px' }}>
        <blockquote className="font-plex italic overflow-visible">
          <a href="/about" className="no-underline relative group/learn inline-block">
            <u>Learning</u>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 whitespace-nowrap opacity-0 group-hover/learn:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">Learn about me ✦</span>
          </a> in public. <a href="/fleeting-notes/favourite-fonts" className="no-underline relative group/write inline-block">
            <u>Writing</u>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 whitespace-nowrap opacity-0 group-hover/write:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">Want to type? ⌨</span>
          </a> things down so I remember, <a href="/chat" className="no-underline relative group/share inline-block">
            <u>sharing</u>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 whitespace-nowrap opacity-0 group-hover/share:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">Chat with me 💬</span>
          </a> in case it helps you too.
        </blockquote>
      </div>
      <RecentPosts allNotes={allNotes} />
      <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--footer-bg) 0%, transparent 100%)', paddingTop: '2rem' }}>
        <style>{`:root { --footer-bg: rgba(255,255,255,0.75); } .dark { --footer-bg: rgba(17,17,17,0.75); }`}</style>
        <div className="font-plex italic py-3 px-2 sm:px-4 flex items-baseline justify-center max-w-[90vw] sm:max-w-screen-sm mx-auto whitespace-nowrap">
          <span className="text-sm sm:text-base md:text-lg pr-1 sm:pr-2 text-gray-600 dark:text-gray-300 pointer-events-auto"><a href="/cv" className="underline" style={{ color: '#0AAFCE' }}>Who</a> is Xinyun Zhang —</span>
          <span className="text-sm sm:text-base md:text-lg text-gray-400 dark:text-gray-500 truncate"><Typer /></span>
        </div>
      </div>
    </>
  );
};

export default HomePage;

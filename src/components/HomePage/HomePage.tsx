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
      <div className="mt-8 sm:mt-12 px-4 sm:px-6 mx-auto" style={{ maxWidth: '896px' }}>
        <blockquote className="font-plex italic">
          <u>Learning</u> in public. <u>Writing</u> things down so I remember, <u>sharing</u> in case it helps you too.
        </blockquote>
      </div>
      <RecentPosts allNotes={allNotes} />
      <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none px-2 sm:px-4">
        <div className="font-plex italic py-3 grid grid-cols-[1fr_1fr] max-w-[90vw] sm:max-w-screen-sm mx-auto">
          <span className="text-right text-sm sm:text-base md:text-lg whitespace-nowrap pr-1 sm:pr-2 text-gray-600 dark:text-gray-300 pointer-events-auto"><a href="/cv" className="underline" style={{ color: '#0AAFCE' }}>Who</a> is Xinyun Zhang —</span>
          <span className="text-left text-sm sm:text-base md:text-lg text-gray-400 dark:text-gray-500"><Typer /></span>
        </div>
      </div>
    </>
  );
};

export default HomePage;

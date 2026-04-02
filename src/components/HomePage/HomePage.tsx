import dynamic from "next/dynamic";
import Typer from "../Typer/Typer";
import RecentPosts from "../RecentPosts/RecentPosts";

// Lazy-load TextString — no SSR (uses DOM APIs: canvas, Intl.Segmenter, pointer events)
const TextString = dynamic(() => import("../TextString"), { ssr: false });

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
      <div className="w-full font-plex italic pt-16">
        <div className="mx-auto text-4xl font-bold w-fit">
          <h1>Who is Xinyun Zhang</h1>
          <Typer />
        </div>
        <div className="text-center text-xl pt-8 w-full">
          <TextString
            text="This is a personal knowledge base to share the learning process publicly"
            fontSize={20}
            fontFamily="'IBM Plex Mono', monospace"
            initialUnlocked={8}
          />
        </div>
      </div>
      <RecentPosts allNotes={allNotes} />
    </>
  );
};

export default HomePage;

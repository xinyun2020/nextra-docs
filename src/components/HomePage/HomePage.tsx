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
      <div className="w-full font-plex italic pt-8 sm:pt-16 px-4 sm:px-6">
        <div className="mx-auto text-2xl sm:text-3xl md:text-4xl font-bold max-w-full sm:w-fit">
          <h1>Who is Xinyun Zhang</h1>
          <Typer />
        </div>
        <div className="text-center text-lg sm:text-xl pt-6 sm:pt-8 w-full">
          This is a personal knowledge base to share the learning process publicly
        </div>
      </div>
      <RecentPosts allNotes={allNotes} />
    </>
  );
};

export default HomePage;

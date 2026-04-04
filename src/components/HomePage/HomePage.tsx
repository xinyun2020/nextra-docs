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
      <div className="w-full font-plex italic pt-16">
        <div className="mx-auto text-4xl font-bold w-fit">
          <h1>Who is Xinyun Zhang</h1>
          <Typer />
        </div>
        <div className="text-center text-xl pt-8 w-full">
          This is a personal knowledge base to share the learning process publicly
        </div>
      </div>
      <RecentPosts allNotes={allNotes} />
    </>
  );
};

export default HomePage;

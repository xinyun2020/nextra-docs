import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Note } from '../HomePage/HomePage';

interface RecentPostsProps {
  allNotes: Note[];
}

const POSTS_MOBILE = 3;
const POSTS_DESKTOP = 10;

const RecentPosts = ({ allNotes }: RecentPostsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [initialCount, setInitialCount] = useState(POSTS_DESKTOP);

  useEffect(() => {
    setInitialCount(window.innerHeight < 800 ? POSTS_MOBILE : POSTS_DESKTOP);
  }, []);

  const displayedPosts = showAll ? allNotes : allNotes.slice(0, initialCount);
  const hasMorePosts = allNotes.length > initialCount;

  return (
    <div
      className="mt-8 sm:mt-12 px-6 sm:px-8"
      style={{
        maxWidth: isWide ? 'none' : '896px',
        width: isWide ? '100vw' : 'auto',
        position: isWide ? 'relative' : 'static',
        left: isWide ? '50%' : 'auto',
        right: isWide ? '50%' : 'auto',
        marginLeft: isWide ? '-50vw' : 'auto',
        marginRight: isWide ? '-50vw' : 'auto',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <h2 className="text-2xl font-bold mb-6 font-plex">Posts</h2>
      <div className="space-y-2">
        {displayedPosts.map((post, index) => (
          <Link
            key={index}
            href={post.path}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 sm:py-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
          >
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 shrink-0 font-fira tabular-nums">
              {post.date}
            </span>
            <span className="font-medium group-hover:underline">
              {post.title}
            </span>
            {post.description && (
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-1 truncate min-w-0 hidden sm:inline">
                {post.description}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {hasMorePosts && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 sm:py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label={showAll ? 'Show fewer posts' : 'Show all posts'}
          >
            {showAll ? '− Show Less' : '··· Load More'}
          </button>
        )}
        <button
          onClick={() => setIsWide(!isWide)}
          className="px-6 py-3 sm:py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hidden sm:flex items-center gap-2"
          aria-label={isWide ? 'Narrow width' : 'Expand width'}
        >
          <span className="font-mono">{isWide ? '><' : '<>'}</span>
          <span>{isWide ? 'Narrow' : 'Widen'}</span>
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/fleeting-notes/favourite-fonts" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-fira">
          Favourite Fonts →
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;

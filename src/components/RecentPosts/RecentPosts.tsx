import { useState } from 'react';
import Link from 'next/link';
import type { Note } from '../HomePage/HomePage';

interface RecentPostsProps {
  allNotes: Note[];
}

const INITIAL_POSTS_COUNT = 3;

const RecentPosts = ({ allNotes }: RecentPostsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isWide, setIsWide] = useState(false);

  const displayedPosts = showAll ? allNotes : allNotes.slice(0, INITIAL_POSTS_COUNT);
  const hasMorePosts = allNotes.length > INITIAL_POSTS_COUNT;

  return (
    <div
      className="mt-12 px-4"
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
            className="flex items-baseline gap-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
          >
            <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">
              {post.date}
            </span>
            <span className="font-medium group-hover:underline shrink-0">
              {post.title}
            </span>
            {post.description && (
              <span className="text-sm text-gray-600 dark:text-gray-400 flex-1 truncate min-w-0">
                {post.description}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        {hasMorePosts && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label={showAll ? 'Show fewer posts' : 'Show all posts'}
          >
            {showAll ? '− Show Less' : '··· Load More'}
          </button>
        )}
        <button
          onClick={() => setIsWide(!isWide)}
          className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
          aria-label={isWide ? 'Narrow width' : 'Expand width'}
        >
          <span className="font-mono">{isWide ? '><' : '<>'}</span>
          <span>{isWide ? 'Narrow' : 'Widen'}</span>
        </button>
      </div>
    </div>
  );
};

export default RecentPosts;

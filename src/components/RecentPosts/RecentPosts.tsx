import { useState } from 'react';
import Link from 'next/link';
import type { Note } from '../HomePage/HomePage';

interface RecentPostsProps {
  allNotes: Note[];
}

const INITIAL_POSTS_COUNT = 3;

const RecentPosts = ({ allNotes }: RecentPostsProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayedPosts = showAll ? allNotes : allNotes.slice(0, INITIAL_POSTS_COUNT);
  const hasMorePosts = allNotes.length > INITIAL_POSTS_COUNT;

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 font-plex">Recent Posts</h2>
      <div className="grid gap-4">
        {displayedPosts.map((post, index) => (
          <Link
            key={index}
            href={post.path}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                {post.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{post.description}</p>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>

      {hasMorePosts && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 mx-auto block px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label={showAll ? 'Show fewer posts' : 'Show all posts'}
        >
          {showAll ? '− Show Less' : '··· Load More'}
        </button>
      )}
    </div>
  );
};

export default RecentPosts;

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const NOTE_PREFIXES = ['/fleeting-notes', '/literature-notes', '/permanent-notes'];

const RandomNoteButton = () => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [notePaths, setNotePaths] = useState<string[]>([]);

  const isNotePage = NOTE_PREFIXES.some(prefix => router.pathname.startsWith(prefix));

  useEffect(() => {
    fetch('/notes-data.json')
      .then(res => res.json())
      .then(data => setNotePaths(data.notePaths))
      .catch(() => {});
  }, []);

  if (!isNotePage || notePaths.length === 0) return null;

  const handleClick = () => {
    setIsAnimating(true);
    const randomPath = notePaths[Math.floor(Math.random() * notePaths.length)];

    setTimeout(() => {
      router.push(randomPath);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAnimating}
      className={`
        fixed bottom-8 right-8 z-50
        px-4 py-3
        bg-white dark:bg-gray-900
        border-2 border-gray-800 dark:border-gray-200
        text-gray-800 dark:text-gray-200
        font-mono text-sm
        transition-all duration-200
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]
        active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]
        active:translate-x-[2px] active:translate-y-[2px]
        ${isAnimating ? 'opacity-50 cursor-wait' : 'opacity-100 cursor-pointer'}
      `}
      title="Navigate to a random note"
    >
      <div className="flex items-center gap-2">
        <svg
          className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Random</span>
      </div>
    </button>
  );
};

export default RandomNoteButton;

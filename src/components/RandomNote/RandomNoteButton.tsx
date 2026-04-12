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

  const handleClick = async () => {
    setIsAnimating(true);
    const currentPath = router.asPath;
    const candidates = notePaths.filter(p => p !== currentPath);
    const randomPath = candidates[Math.floor(Math.random() * candidates.length)] || '/';

    try {
      const res = await fetch(randomPath, { method: 'HEAD' });
      if (res.ok) {
        router.push(randomPath);
      } else {
        const fallback = candidates.filter(p => p !== randomPath)[0] || '/';
        router.push(fallback);
      }
    } catch {
      router.push('/');
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAnimating}
      className={`
        fixed bottom-4 right-4 z-50
        w-8 h-8 flex items-center justify-center
        bg-white/25 dark:bg-gray-900/25
        border border-gray-400/50 dark:border-gray-500/50 rounded
        text-gray-600 dark:text-gray-400
        transition-all duration-200
        hover:bg-white/50 dark:hover:bg-gray-900/50
        ${isAnimating ? 'opacity-30 cursor-wait' : 'cursor-pointer'}
      `}
      title="Navigate to a random note"
    >
      <svg
        className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`}
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
    </button>
  );
};

export default RandomNoteButton;

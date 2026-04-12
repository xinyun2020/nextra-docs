import React, { useState, useRef, useEffect } from "react";

interface NoteChunk {
  title: string;
  path: string;
  content: string;
}

interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: { title: string; path: string; snippet: string }[];
}

interface ChatProps {
  notes: NoteChunk[];
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "have", "has", "had", "will", "would", "could",
  "should", "may", "might", "can", "shall", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "about", "like",
  "through", "after", "before", "between", "under", "above",
  "it", "its", "he", "she", "they", "them", "we", "us", "me", "my",
  "your", "you", "his", "her", "our", "their", "this", "that", "these",
  "those", "what", "which", "who", "whom", "how", "when", "where", "why",
  "if", "or", "and", "but", "not", "no", "so", "than", "too", "very",
  "just", "also", "more", "most", "some", "any", "all", "each", "every",
  "tell", "know", "think", "get", "make",
]);

function searchNotes(query: string, notes: NoteChunk[], topK = 3) {
  const allTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  const terms = allTerms.filter((t) => !STOP_WORDS.has(t));
  // if all terms were stop words, use original terms
  const searchTerms = terms.length > 0 ? terms : allTerms;
  if (searchTerms.length === 0) return [];

  const scored = notes
    .map((note) => {
      const titleLower = note.title.toLowerCase();
      const contentLower = note.content.toLowerCase();
      let score = 0;

      for (const term of searchTerms) {
        // title match worth more
        const titleMatches = titleLower.match(new RegExp(term, "gi"));
        if (titleMatches) score += titleMatches.length * 5;

        const contentMatches = contentLower.match(new RegExp(term, "gi"));
        if (contentMatches) score += contentMatches.length;
      }

      // boost exact phrase match
      const fullQuery = query.toLowerCase();
      if (titleLower.includes(fullQuery)) score += 20;
      if (contentLower.includes(fullQuery)) score += 10;

      return { note, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map(({ note }) => {
    const lowerContent = note.content.toLowerCase();
    // find the best snippet — prefer content terms over stop words
    let bestIdx = -1;
    let bestTermLen = 0;
    for (const term of searchTerms) {
      const idx = lowerContent.indexOf(term);
      if (idx >= 0 && term.length > bestTermLen) {
        bestIdx = idx;
        bestTermLen = term.length;
      }
    }
    if (bestIdx < 0) bestIdx = 0;

    // find sentence boundary near the match
    const sentenceStart = Math.max(0, lowerContent.lastIndexOf(".", Math.max(0, bestIdx - 20)) + 1);
    const start = Math.max(0, sentenceStart);
    const end = Math.min(note.content.length, start + 250);
    const snippet =
      (start > 0 ? "..." : "") +
      note.content.slice(start, end).trim() +
      (end < note.content.length ? "..." : "");

    return { title: note.title, path: note.path, snippet };
  });
}

function generateResponse(
  query: string,
  sources: { title: string; path: string; snippet: string }[]
): string {
  if (sources.length === 0) {
    const noResults = [
      "I don't have notes on that yet. Try asking about keyboards, fonts, code, or system architecture.",
      "Nothing in my notes matches that. I write about programming, keyboards, photography, and how I organize things.",
      "Hmm, I haven't written about that. Try something like 'zettelkasten', 'keyboards', or 'system design'.",
    ];
    return noResults[Math.floor(Math.random() * noResults.length)];
  }

  const intro = [
    "Here's what I found in my notes:",
    "I wrote about this! Here are the relevant bits:",
    "Good question. My notes have something on this:",
  ];

  let response = intro[Math.floor(Math.random() * intro.length)] + "\n\n";

  for (const source of sources) {
    response += `**[${source.title}](${source.path})**\n`;
    response += `> ${source.snippet}\n\n`;
  }

  return response.trim();
}

const SUGGESTIONS = [
  "What is Zettelkasten?",
  "Tell me about your system architecture",
  "How do you organize your notes?",
  "What keyboard do you use?",
  "What fonts do you like?",
];

const Chat: React.FC<ChatProps> = ({ notes }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! Ask me anything about my notes. I'll search through what I've written and show you the relevant bits. No AI generation — just my actual words.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // shrink chat container when virtual keyboard opens
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      if (containerRef.current) {
        const navHeight = 64; // 4rem top navbar
        containerRef.current.style.height = `${vv.height - navHeight}px`;
      }
    };
    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onResize);
    };
  }, []);

  const handleSubmit = (query: string) => {
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", text: query.trim() };
    const sources = searchNotes(query.trim(), notes);
    const responseText = generateResponse(query.trim(), sources);
    const assistantMsg: Message = {
      role: "assistant",
      text: responseText,
      sources,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  return (
    <div ref={containerRef} className="font-plex fixed inset-0 top-16 flex flex-col bg-white dark:bg-zinc-900 overflow-hidden" style={{ zIndex: 10, height: 'calc(100dvh - 4rem)' }}>
      {/* messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4" role="log" aria-label="Chat messages" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-4 py-3 text-sm sm:text-base ${
                msg.role === "user"
                  ? "bg-blue-500/10 dark:bg-blue-400/10 text-gray-800 dark:text-gray-200"
                  : "bg-slate-500/10 text-gray-800 dark:text-gray-200"
              }`}
            >
              {msg.text.split("\n").map((line, j) => {
                const parsed = line.replace(
                  /\*\*\[(.+?)\]\((.+?)\)\*\*/g,
                  '<a href="$2" class="font-bold underline hover:text-blue-500">$1</a>'
                ).replace(
                  /> (.+)/,
                  '<blockquote class="border-l-2 border-gray-300 dark:border-gray-600 pl-3 text-gray-600 dark:text-gray-400 italic text-sm">$1</blockquote>'
                );
                return (
                  <div
                    key={j}
                    className={line === "" ? "h-2" : ""}
                    dangerouslySetInnerHTML={{ __html: parsed || "&nbsp;" }}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSubmit(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-500/10 text-gray-600 dark:text-gray-400 hover:bg-slate-500/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* input — always at bottom */}
      <div ref={inputBarRef} className="shrink-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-plex flex-1 p-3 rounded-lg bg-slate-500/10 outline-none focus-visible:ring-2 focus-visible:ring-[#0AAFCE] text-base"
            placeholder="Ask my notes something..."
            aria-label="Search my notes"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
          <button
            onClick={() => handleSubmit(input)}
            aria-label="Submit search"
            className="px-4 py-3 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 transition-colors text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
          >
            Ask
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          No AI — just full-text search over my actual notes, powered by 🔗 XinyunChain
        </p>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState, useCallback, useRef, useEffect } from "react";

const LETTER_EN = [
  "Hey, you found me.",
  "I'm Xinyun, but most people call me Alice.",
  "I write code for a living, and notes for myself.",
  "I collect fonts the way some people collect vinyl.",
  "I build tiny keyboards and type on them too much.",
  "I take photos of things that won't stay still.",
  "I learn French badly but with great enthusiasm.",
  "This site is where I think out loud.",
  "Nothing here is polished. That's the point.",
  "Thank you for typing along with me.",
  "I'm glad you're here.",
];

const LETTER_FR = [
  "Salut, vous m'avez trouvee.",
  "Je m'appelle Xinyun, mais on m'appelle Alice.",
  "J'ecris du code pour vivre, et des notes pour moi.",
  "Je collectionne les polices comme d'autres le vinyle.",
  "Je fabrique de petits claviers et je tape trop dessus.",
  "Je photographie ce qui ne reste pas immobile.",
  "J'apprends le francais mal mais avec enthousiasme.",
  "Ce site est l'endroit ou je pense tout haut.",
  "Rien ici n'est parfait. C'est le but.",
  "Merci de taper avec moi.",
  "Je suis contente que vous soyez la.",
];

const LETTER_ZH = [
  "呀哈哈，你找到我了。",
  "我叫馨云，大家都叫我Alice。",
  "我靠写代码谋生，靠写笔记认识自己。",
  "我收集字体，就像别人收集黑胶唱片。",
  "我做小键盘，然后在上面敲个不停。",
  "我拍照，拍那些留不住的瞬间。",
  "我学法语，学得很烂但很有热情。",
  "这个网站是我自言自语的地方。",
  "这里没有什么是完美的，这就是意义所在。",
  "谢谢你陪我一起打字。",
  "很高兴你在这里。",
];

const FONTS = ["IBM Plex", "Fira Code", "Handwriting"] as const;
const FONT_CLASSES = ["font-plex italic", "font-fira", "font-eleyang"] as const;
const SOUND_PROFILES = ["clicky", "thocky", "creamy"] as const;

const FrenchTypingGame: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [fontIdx, setFontIdx] = useState(0);
  const [userFontIdx, setUserFontIdx] = useState(0); // tracks manual font choice
  const [soundIdx, setSoundIdx] = useState(0);
  const [langIdx, setLangIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentLineRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const ALL_LETTERS = [LETTER_EN, LETTER_FR, LETTER_ZH];
  const LANG_LABELS = ["EN", "FR", "中文"] as const;
  const lines = ALL_LETTERS[langIdx];
  const fontClass = FONT_CLASSES[fontIdx];
  const isHandwriting = fontIdx === 2;
  const textSize = isHandwriting ? "text-lg sm:text-2xl md:text-3xl" : "text-sm sm:text-base md:text-lg";
  const inputTextSize = isHandwriting ? "text-lg sm:text-2xl md:text-3xl" : "text-sm sm:text-base md:text-lg";

  const normalize = (c: string) =>
    c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const charsMatch = (typed: string, expected: string) =>
    normalize(typed) === normalize(expected);

  const getCtx = () => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    return audioCtxRef.current;
  };

  const playClicky = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800 + Math.random() * 400;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  const playThocky = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    // deep thock body — low resonant hit like a heavy switch bottoming out
    const body = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    body.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    body.frequency.setValueAtTime(80 + Math.random() * 30, t);
    body.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    body.type = "sine";
    bodyGain.gain.setValueAtTime(0.12, t);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    body.start(t);
    body.stop(t + 0.1);
    // short noise burst — the plastic/housing impact
    const bufLen = Math.floor(ctx.sampleRate * 0.025);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1);
    const noise = ctx.createBufferSource();
    const nFilter = ctx.createBiquadFilter();
    const nGain = ctx.createGain();
    noise.buffer = buf;
    nFilter.type = "bandpass";
    nFilter.frequency.value = 800 + Math.random() * 400;
    nFilter.Q.value = 2;
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(ctx.destination);
    nGain.gain.setValueAtTime(0.06, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    noise.start(t);
  }, []);

  const playCreamy = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    // soft muted press — like lubed linear switches
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    filter.type = "lowpass";
    filter.frequency.value = 400;
    filter.Q.value = 0.5;
    osc.frequency.setValueAtTime(150 + Math.random() * 50, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);
    osc.type = "sine";
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.start(t);
    osc.stop(t + 0.07);
    // very soft warm noise — the smooth bottom-out
    const bufLen = Math.floor(ctx.sampleRate * 0.04);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1);
    const noise = ctx.createBufferSource();
    const nFilter = ctx.createBiquadFilter();
    const nGain = ctx.createGain();
    noise.buffer = buf;
    nFilter.type = "lowpass";
    nFilter.frequency.value = 300;
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(ctx.destination);
    nGain.gain.setValueAtTime(0.025, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    noise.start(t);
  }, []);

  const playKeySound = useCallback(() => {
    [playClicky, playThocky, playCreamy][soundIdx]();
  }, [soundIdx, playClicky, playThocky, playCreamy]);

  const finished = currentLine >= lines.length;
  const target = finished ? "" : lines[currentLine];

  useEffect(() => {
    if (finished) {
      const timer = setTimeout(() => {
        // 3s pause so visitor can read the finished letter
        const nextLang = (langIdx + 1) % 3;
        setLangIdx(nextLang);
        if (nextLang === 2) setFontIdx(2);
        else setFontIdx(userFontIdx);
        setCurrentLine(0);
        setInput("");
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [finished]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    playKeySound();
    setInput(value);

    const correctChars = value.split("").filter((c, i) => i < target.length && charsMatch(c, target[i])).length;
    setAccuracy(value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100);

    if (startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      const words = value.length / 5;
      setWpm(minutes > 0 ? Math.round(words / minutes) : 0);
    }

    const allMatch = value.length === target.length && value.split("").every((c, i) => charsMatch(c, target[i]));
    if (allMatch) {
      setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setInput("");
        inputRef.current?.focus();
        setTimeout(() => currentLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
      }, 300);
    }
  };

  const skipLine = () => {
    setCurrentLine((prev) => prev + 1);
    setInput("");
    inputRef.current?.focus();
    setTimeout(() => currentLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
  };

  const switchLang = () => {
    const nextLang = (langIdx + 1) % 3;
    setLangIdx(nextLang);
    if (nextLang === 2) setFontIdx(2); // Chinese → handwriting
    else setFontIdx(userFontIdx); // non-Chinese → restore user's manual choice
    setCurrentLine(0);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className={`${fontClass} mt-6 space-y-3`}>
      <div className={`flex items-center justify-between gap-x-2 text-xs text-gray-500 dark:text-gray-400`}>
        <span>{wpm} WPM · {accuracy}% · {currentLine}/{lines.length}</span>
        <span className="flex items-center gap-x-2">
          <button onClick={() => setSoundIdx((prev) => (prev + 1) % 3)} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{SOUND_PROFILES[soundIdx]} ♪</button>
          <button onClick={() => { const next = (fontIdx + 1) % 3; setFontIdx(next); setUserFontIdx(next); }} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{FONTS[fontIdx]} ↻</button>
          <button onClick={switchLang} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{LANG_LABELS[langIdx]} ↻</button>
        </span>
      </div>

      <div
        className={`p-4 rounded-md bg-slate-500/10 select-none cursor-text ${isHandwriting ? 'leading-loose tracking-widest space-y-3' : 'leading-relaxed tracking-wide space-y-1'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} ref={lineIdx === currentLine ? currentLineRef : undefined} className={textSize}>
            {lineIdx < currentLine ? (
              <span className="text-green-600 dark:text-green-400">{line}</span>
            ) : lineIdx === currentLine ? (
              line.split("").map((char, i) => {
                let color = "text-gray-300 dark:text-gray-600";
                if (i < input.length) {
                  color = charsMatch(input[i], char)
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400 underline";
                }
                return <span key={i} className={color}>{char}</span>;
              })
            ) : (
              <span className="text-gray-300 dark:text-gray-600">{line}</span>
            )}
          </div>
        ))}
      </div>

      {/* spacer on mobile so fixed input doesn't cover content */}
      <div className="sm:hidden h-24" />

      {!finished ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-3 sm:static sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none sm:border-0 sm:p-0 sm:space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            className={`${fontClass} w-full p-3 sm:p-4 rounded-md bg-slate-500/10 outline-none ${inputTextSize} tracking-wide`}
            placeholder={["Type to read the letter...", "Tapez pour lire la lettre...", "打字来阅读这封信..."][langIdx]}
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
          <button
            onClick={skipLine}
            className={`${isHandwriting ? 'text-sm sm:text-base md:text-lg' : 'text-xs'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-1 sm:mt-0`}
          >
            skip line →
          </button>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          {["You read the whole letter. Next: French...", "Vous avez lu toute la lettre. Next: 中文...", "你读完了整封信。Next: English..."][langIdx]}
        </div>
      )}
    </div>
  );
};

export default FrenchTypingGame;

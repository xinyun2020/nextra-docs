import { useState, useEffect, useRef } from "react";
import styles from "./Typer.module.css";

const WORDS = [
  "Computer Programmer",
  "Full Stack Developer",
  "UX & DX",
  "Data Science Postgrad",
  "Keyboard Enthusiast",
  "Software Engineer",
  "Amateur Photographer",
  "Monash University Alumni",
  "University of Melbourne Alumni"
] as const;

const Typer = () => {
  const [text, setText] = useState(WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = WORDS[wordIndexRef.current];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentWord.slice(0, charIndexRef.current - 1));
        charIndexRef.current -= 1;

        if (charIndexRef.current === 0) {
          setIsDeleting(false);
          wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
        }
      } else {
        setText(currentWord.slice(0, charIndexRef.current + 1));
        charIndexRef.current += 1;

        if (charIndexRef.current === currentWord.length) {
          setIsPaused(true);
        }
      }
    }, 32);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPaused]);

  useEffect(() => {
    if (!isPaused) return;

    const pauseTimeout = setTimeout(() => {
      setIsPaused(false);
      setIsDeleting(true);
    }, 3000);

    return () => clearTimeout(pauseTimeout);
  }, [isPaused]);

  return (
    <div className={styles.contentTitle}>
      <span className={styles.underline}>{text}</span>
      <div className={styles.cursor}>&#8203;</div>
    </div>
  );
};

export default Typer;

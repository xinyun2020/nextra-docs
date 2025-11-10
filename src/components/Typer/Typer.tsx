import { useState, useEffect, useRef } from "react";
import styles from "./Typer.module.css";

const WORDS = [
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
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  useEffect(() => {
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
          setTimeout(() => setIsDeleting(true), 3000);
        }
      }
    }, 32);

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <div className={styles.contentTitle}>
      <span className={styles.underline}>{text}</span>
      <div className={styles.cursor}>&#8203;</div>
    </div>
  );
};

export default Typer;

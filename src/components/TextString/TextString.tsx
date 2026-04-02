/**
 * TextString — physics-based text animation
 * Ported from pushmatrix/textstring (Verlet integration)
 * Self-contained: remove this folder to remove the feature
 */
import { useRef, useEffect, useCallback } from "react";
import styles from "./TextString.module.css";

interface TextStringProps {
  text: string;
  className?: string;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  color?: string;
  /** How many letters from the end start unlocked (draggable) */
  initialUnlocked?: number;
}

interface Letter {
  ch: string;
  w: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  px: number;
  py: number;
  locked: boolean;
}

// Physics constants
const CONSTRAINT_DIST = 1.2;
const UNLOCK_THRESHOLD = 1;
const ITERATIONS = 12;
const DAMPING = 0.97;
const GRAVITY = 0.15;
const COLLISION_RADIUS = 7;
const BOUNCE = 0.4;
const FIXED_DT = 1 / 120;
const MAX_STEPS = 4;

const TextString = ({
  text,
  className = "",
  fontSize = 36,
  lineHeight: lineHeightProp,
  fontFamily = "Georgia, serif",
  color,
  initialUnlocked = 6,
}: TextStringProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Letter[]>([]);
  const elsRef = useRef<HTMLSpanElement[]>([]);
  const restLengthsRef = useRef<number[]>([]);
  const dragsRef = useRef<Map<number, { idx: number; offsetX: number; offsetY: number }>>(new Map());
  const gravityOnRef = useRef(true);
  const unravelingRef = useRef(false);
  const unravelIdxRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(-1);
  const accumulatorRef = useRef(0);

  const LINE_HEIGHT = lineHeightProp ?? Math.round(fontSize * 1.4);
  const FONT = `${fontSize}px ${fontFamily}`;

  const isDragged = useCallback((idx: number) => {
    for (const d of dragsRef.current.values()) {
      if (d.idx === idx) return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous render
    container.innerHTML = "";
    elsRef.current = [];
    dragsRef.current.clear();

    // Measure graphemes
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const graphemes = Array.from(segmenter.segment(text)).map((s) => s.segment);
    const measureCtx = document.createElement("canvas").getContext("2d")!;
    measureCtx.font = FONT;
    const widths = graphemes.map((g) => measureCtx.measureText(g).width);

    // Layout: simple word-wrap, using viewport coordinates (position: fixed)
    const containerRect = container.getBoundingClientRect();
    const originX = containerRect.left;
    const originY = containerRect.top;
    const maxWidth = containerRect.width || 600;
    const positions: { x: number; y: number; w: number }[] = [];
    let x = 0;
    let lineY = 0;

    for (let i = 0; i < graphemes.length; i++) {
      const w = widths[i];
      // Word-wrap at spaces
      if (graphemes[i] === " " && x > 0) {
        let wordW = 0;
        for (let j = i + 1; j < graphemes.length && graphemes[j] !== " "; j++) {
          wordW += widths[j];
        }
        if (x + w + wordW > maxWidth) {
          positions.push({ x: originX + x, y: originY + lineY, w });
          x = 0;
          lineY += LINE_HEIGHT;
          continue;
        }
      }
      positions.push({ x: originX + x, y: originY + lineY, w });
      x += w;
    }

    // Build letters in viewport coordinates
    const letters: Letter[] = positions.map((p, i) => ({
      ch: graphemes[i],
      w: p.w,
      x: p.x,
      y: p.y,
      ox: p.x,
      oy: p.y,
      px: p.x,
      py: p.y,
      locked: true,
    }));

    // Compute rest lengths between consecutive letters
    const restLengths: number[] = [];
    for (let i = 0; i < letters.length - 1; i++) {
      const a = letters[i],
        b = letters[i + 1];
      const dist = Math.hypot(
        b.ox + b.w / 2 - (a.ox + a.w / 2),
        b.oy + LINE_HEIGHT / 2 - (a.oy + LINE_HEIGHT / 2)
      );
      restLengths.push(dist * CONSTRAINT_DIST);
    }

    // Create DOM spans
    const els: HTMLSpanElement[] = [];
    for (const l of letters) {
      const span = document.createElement("span");
      span.className = styles.letter;
      span.textContent = l.ch;
      span.style.fontSize = `${fontSize}px`;
      span.style.fontFamily = fontFamily;
      if (color) span.style.color = color;
      container.appendChild(span);
      els.push(span);
    }

    // Unlock last N letters
    const lastIdx = letters.length - 1;
    for (let i = lastIdx; i > Math.max(lastIdx - initialUnlocked, -1); i--) {
      letters[i].locked = false;
      els[i].classList.add(styles.draggable);
    }

    lettersRef.current = letters;
    elsRef.current = els;
    restLengthsRef.current = restLengths;

    // Set container height to fit text
    const totalHeight = lineY + LINE_HEIGHT;
    container.style.height = `${totalHeight}px`;

    // Pointer events — viewport coordinates (letters are position: fixed)
    const onPointerDown = (e: PointerEvent) => {
      const idx = els.indexOf(e.target as HTMLSpanElement);
      if (idx === -1 || letters[idx].locked) return;
      if (isDragged(idx)) return;
      dragsRef.current.set(e.pointerId, {
        idx,
        offsetX: e.clientX - letters[idx].x,
        offsetY: e.clientY - letters[idx].y,
      });
      els[idx].classList.add(styles.dragging);
      (e.target as HTMLSpanElement).setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = dragsRef.current.get(e.pointerId);
      if (!d) return;
      const l = letters[d.idx];
      l.x = e.clientX - d.offsetX;
      l.y = e.clientY - d.offsetY;
      l.px = l.x;
      l.py = l.y;
      l.locked = false;
    };

    const onPointerUp = (e: PointerEvent) => {
      const d = dragsRef.current.get(e.pointerId);
      if (!d) return;
      els[d.idx].classList.remove(styles.dragging);
      dragsRef.current.delete(e.pointerId);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        gravityOnRef.current = !gravityOnRef.current;
        if (gravityOnRef.current && !unravelingRef.current) {
          unravelingRef.current = true;
          unravelIdxRef.current = letters.length - 1;
          while (unravelIdxRef.current >= 0 && !letters[unravelIdxRef.current].locked) {
            unravelIdxRef.current--;
          }
        }
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("keydown", onKeyDown);

    // Physics simulation
    const simulate = () => {
      const drags = dragsRef.current;

      // Unravel
      if (unravelingRef.current) {
        const idx = unravelIdxRef.current;
        if (!gravityOnRef.current || idx < 0) {
          unravelingRef.current = false;
        } else if (letters[idx].locked) {
          letters[idx].locked = false;
          letters[idx].px = letters[idx].x;
          letters[idx].py = letters[idx].y - 0.5;
          unravelIdxRef.current--;
        } else {
          unravelIdxRef.current--;
        }
      }

      // Unlock propagation
      for (let i = letters.length - 2; i >= 0; i--) {
        if (letters[i].locked && !letters[i + 1].locked) {
          const a = letters[i],
            b = letters[i + 1];
          const dx = b.x + b.w / 2 - (a.ox + a.w / 2);
          const dy = b.y + LINE_HEIGHT / 2 - (a.oy + LINE_HEIGHT / 2);
          const dist = Math.hypot(dx, dy);
          if (dist > restLengths[i] + UNLOCK_THRESHOLD) {
            a.locked = false;
            a.px = a.x;
            a.py = a.y;
          }
        }
      }

      // Verlet integration
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.locked || isDragged(i)) continue;
        const vx = (l.x - l.px) * DAMPING;
        const vy = (l.y - l.py) * DAMPING;
        l.px = l.x;
        l.py = l.y;
        l.x += vx;
        l.y += vy + (gravityOnRef.current ? GRAVITY : 0);
      }

      // Distance constraints
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < letters.length - 1; i++) {
          const a = letters[i],
            b = letters[i + 1];
          if (a.locked && b.locked) continue;
          const ax = a.x + a.w / 2,
            ay = a.y + LINE_HEIGHT / 2;
          const bx = b.x + b.w / 2,
            by = b.y + LINE_HEIGHT / 2;
          const dx = bx - ax,
            dy = by - ay;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - restLengths[i]) / dist;
          const aFixed = a.locked || isDragged(i);
          const bFixed = b.locked || isDragged(i + 1);
          if (aFixed && !bFixed) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else if (!aFixed && bFixed) {
            a.x += dx * diff;
            a.y += dy * diff;
          } else if (!aFixed && !bFixed) {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
      }

      // Letter collision
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].locked) continue;
        const a = letters[i];
        const acx = a.x + a.w / 2,
          acy = a.y + LINE_HEIGHT / 2;
        for (let j = i + 1; j < letters.length; j++) {
          if (letters[j].locked) continue;
          if (Math.abs(i - j) === 1) continue;
          const b = letters[j];
          const bcx = b.x + b.w / 2,
            bcy = b.y + LINE_HEIGHT / 2;
          const dx = bcx - acx,
            dy = bcy - acy;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = COLLISION_RADIUS * 2;
          if (dist < minDist) {
            const overlap = ((minDist - dist) / dist) * 0.5;
            const aD = isDragged(i);
            const bD = isDragged(j);
            if (aD) {
              b.x += dx * overlap;
              b.y += dy * overlap;
            } else if (bD) {
              a.x -= dx * overlap;
              a.y -= dy * overlap;
            } else {
              a.x -= dx * overlap;
              a.y -= dy * overlap;
              b.x += dx * overlap;
              b.y += dy * overlap;
            }
          }
        }
      }

      // Boundary bounce — full viewport since letters are position: fixed
      const minX = 0;
      const minY = 0;
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.locked || isDragged(i)) continue;
        if (l.x < minX) {
          l.x = minX;
          l.px = l.x + (l.x - l.px) * BOUNCE;
        }
        if (l.x + l.w > maxX) {
          l.x = maxX - l.w;
          l.px = l.x + (l.x - l.px) * BOUNCE;
        }
        if (l.y < minY) {
          l.y = minY;
          l.py = l.y + (l.y - l.py) * BOUNCE;
        }
        if (l.y + LINE_HEIGHT > maxY) {
          l.y = maxY - LINE_HEIGHT;
          l.py = l.y + (l.y - l.py) * BOUNCE;
        }
      }
    };

    // Render loop with fixed timestep
    const render = (now: number) => {
      if (lastTimeRef.current < 0) {
        lastTimeRef.current = now;
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((now - lastTimeRef.current) / 1000, MAX_STEPS * FIXED_DT);
      lastTimeRef.current = now;
      accumulatorRef.current += dt;

      while (accumulatorRef.current >= FIXED_DT) {
        simulate();
        accumulatorRef.current -= FIXED_DT;
      }

      for (let i = 0; i < letters.length; i++) {
        if (!letters[i].locked) els[i].classList.add(styles.draggable);
        els[i].style.transform = `translate(${letters[i].x}px, ${letters[i].y}px)`;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      lastTimeRef.current = -1;
      accumulatorRef.current = 0;
    };
  }, [text, fontSize, fontFamily, color, LINE_HEIGHT, initialUnlocked, isDragged]);

  return <div ref={containerRef} className={`${styles.container} ${className}`} />;
};

export default TextString;

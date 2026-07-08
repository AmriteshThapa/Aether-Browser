import { useEffect, useRef, useState } from "react";
import "./DecodeText.css";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "0123456789" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";

const CHAR_LIST = CHARS.split("");

function randomChar() {
  return CHAR_LIST[Math.floor(Math.random() * CHAR_LIST.length)];
}

export default function DecodeText({ text, speed = 70, lockEvery = 6, className = "" }) {
  const [display, setDisplay] = useState(text.split("").map(() => ""));
  const [justLocked, setJustLocked] = useState(-1);
  const lockedCount = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    lockedCount.current = 0;
    frame.current = 0;

    const interval = setInterval(() => {
      frame.current++;

      setDisplay(
        text.split("").map((char, i) => {
          if (i < lockedCount.current) return char;
          if (char === " ") return " ";
          return randomChar();
        })
      );

      if (frame.current % lockEvery === 0 && lockedCount.current < text.length) {
        setJustLocked(lockedCount.current);
        lockedCount.current++;
      }

      if (lockedCount.current >= text.length && frame.current % lockEvery === 1) {
        clearInterval(interval);
        setDisplay(text.split(""));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, lockEvery]);

  return (
    <span className={`decode-text ${className}`}>
      {display.map((char, i) => (
        <span
        key={i}
          className={`decode-char ${i < lockedCount.current ? "locked" : ""} ${
            i === justLocked ? "flash" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
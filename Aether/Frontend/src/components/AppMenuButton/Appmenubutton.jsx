import { useRef } from "react";
import { gsap } from "gsap";

// Drop this into your navbar, to the left of your logo/brand text.
// Requires: npm install gsap
export default function AppMenuButton({ onClick }) {
  const btnRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);

  const handleEnter = () => {
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.6,
      duration: 0.45,
      ease: "power2.out",
    });
    gsap.to(btnRef.current, {
      boxShadow:
        "0 0 12px 2px rgba(168,139,250,0.55), 0 0 28px 6px rgba(139,92,246,0.35)",
      borderColor: "rgba(196,181,253,0.8)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(dotsRef.current, {
      backgroundColor: "#e9d5ff",
      boxShadow: "0 0 6px 1px rgba(233,213,255,0.9)",
      stagger: 0.03,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(btnRef.current, {
      boxShadow: "0 0 0px 0px rgba(139,92,246,0)",
      borderColor: "rgba(255,255,255,0.12)",
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(dotsRef.current, {
      backgroundColor: "#c4b5fd",
      boxShadow: "0 0 0px 0px rgba(0,0,0,0)",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  const handleDown = () => {
    gsap.to(btnRef.current, { scale: 0.92, duration: 0.12, ease: "power2.out" });
  };

  const handleUp = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: "back.out(3)" });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      aria-label="Open app menu"
      className="relative w-11 h-11 rounded-xl flex items-center justify-center
                 bg-white/5 border border-white/10 backdrop-blur-sm
                 transition-colors"
    >
      {/* soft ambient glow behind the icon */}
      <span
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(168,139,250,0.55) 0%, rgba(139,92,246,0.15) 55%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      {/* 3x3 dot grid icon */}
      <div className="relative grid grid-cols-3 gap-[3px] z-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-[5px] h-[5px] rounded-full"
            style={{ backgroundColor: "#c4b5fd" }}
          />
        ))}
      </div>
    </button>
  );
}
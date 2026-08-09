import { useState, useEffect, useCallback, useRef } from "react";
import { Shell } from "./components/Shell";
import { BOARDS, type Board, type BoardItem } from "./components/BoardData";
import { playSound, setVolume } from "./components/AudioEngine";

// ─── Particle ────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  vx: number;
  vy: number;
  life: number;
  scale: number;
}

let pid = 0;
function spawnParticles(x: number, y: number, board: Board, count = 6): Particle[] {
  const emojis = board.ambientEmojis;
  return Array.from({ length: count }, () => ({
    id: pid++,
    x,
    y,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: -Math.random() * 3 - 1,
    life: 1,
    scale: 0.6 + Math.random() * 0.8,
  }));
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
function HomeScreen({ onSelect }: { onSelect: (b: Board) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="text-center mb-10 pt-4">
        <div
          className="text-5xl mb-3"
          style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}
        >
          ✨ ASMR Boards
        </div>
        <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
          Choose your world. Tap, click & relax.
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {BOARDS.map((board) => (
          <button
            key={board.id}
            onClick={() => onSelect(board)}
            onMouseEnter={() => setHovered(board.id)}
            onMouseLeave={() => setHovered(null)}
            className="text-left relative overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              border: "none",
              cursor: "pointer",
              background: board.gradient,
              padding: 0,
              transform: hovered === board.id ? "scale(1.03) translateY(-3px)" : "scale(1) translateY(0)",
              transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease",
              boxShadow:
                hovered === board.id
                  ? `0 16px 40px ${board.particleColor}55`
                  : "0 4px 16px rgba(0,0,0,0.10)",
            }}
          >
            {/* Floating ambient emojis */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: "1.25rem" }}
            >
              {board.ambientEmojis.slice(0, 5).map((em, i) => (
                <span
                  key={i}
                  className="absolute select-none"
                  style={{
                    fontSize: `${0.8 + (i % 3) * 0.3}rem`,
                    left: `${10 + i * 17}%`,
                    top: `${5 + (i % 2) * 15}%`,
                    opacity: 0.25,
                    animation: `float${(i % 3) + 1} ${3 + i * 0.7}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {em}
                </span>
              ))}
            </div>

            <div className="relative p-6">
              {/* Big emoji */}
              <div
                className="text-5xl mb-3"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
                  transition: "transform 0.2s ease",
                  transform: hovered === board.id ? "scale(1.15) rotate(-5deg)" : "scale(1)",
                  display: "inline-block",
                }}
              >
                {board.emoji}
              </div>

              <div
                className="font-bold text-xl mb-1"
                style={{
                  fontFamily: "Fraunces, serif",
                  color: board.textColor,
                  textShadow: "0 1px 3px rgba(255,255,255,0.4)",
                }}
              >
                {board.name}
              </div>
              <div
                className="text-sm mb-4"
                style={{ color: board.textColor, opacity: 0.75 }}
              >
                {board.tagline}
              </div>

              {/* Sound preview pills */}
              <div className="flex flex-wrap gap-1.5">
                {board.items.slice(0, 4).map((item) => (
                  <span
                    key={item.id}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.35)",
                      color: board.textColor,
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.emoji} {item.label}
                  </span>
                ))}
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.35)",
                    color: board.textColor,
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  +{board.items.length - 4} more
                </span>
              </div>

              {/* Enter button */}
              <div
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
                style={{
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.5)",
                  color: board.textColor,
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  transition: "background 0.2s",
                }}
              >
                Enter World →
              </div>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-5deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(8deg); } }
      `}</style>
    </div>
  );
}

// ─── Board Item Button ────────────────────────────────────────────────────────
function ItemButton({
  item,
  board,
  onActivate,
  muted,
}: {
  item: BoardItem;
  board: Board;
  onActivate: (x: number, y: number) => void;
  muted: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const [ripple, setRipple] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleInteract = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!muted) playSound(item.sound);
      setPressed(true);
      setRipple(true);
      setTimeout(() => setPressed(false), 200);
      setTimeout(() => setRipple(false), 400);

      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        onActivate(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    },
    [item.sound, muted, onActivate]
  );

  const sizeMap = { sm: "4.5rem", md: "6rem", lg: "7.5rem" };
  const fontMap = { sm: "2rem", md: "2.6rem", lg: "3.2rem" };

  return (
    <button
      ref={btnRef}
      onMouseDown={handleInteract}
      onTouchStart={handleInteract}
      className="relative flex flex-col items-center justify-center gap-1 select-none"
      style={{
        width: sizeMap[item.size],
        height: sizeMap[item.size],
        borderRadius: "1.25rem",
        border: "2px solid rgba(255,255,255,0.3)",
        background: item.color + "cc",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(.34,1.56,.64,1), box-shadow 0.15s ease",
        boxShadow: pressed
          ? `0 2px 8px ${board.particleColor}44`
          : `0 4px 16px ${board.particleColor}33`,
        overflow: "hidden",
      }}
    >
      {/* Ripple */}
      {ripple && (
        <span
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${board.particleColor}55 0%, transparent 70%)`,
            animation: "rippleOut 0.4s ease-out forwards",
          }}
        />
      )}
      <span style={{ fontSize: fontMap[item.size], lineHeight: 1 }}>{item.emoji}</span>
      <span
        className="text-center leading-tight"
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          color: board.textColor,
          maxWidth: "90%",
          opacity: 0.85,
        }}
      >
        {item.label}
      </span>
    </button>
  );
}

// ─── Board Screen ─────────────────────────────────────────────────────────────
function BoardScreen({ board, onBack }: { board: Board; onBack: () => void }) {
  const [volume, setVolumeState] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  // Sync volume
  useEffect(() => {
    setVolume(muted ? 0 : volume);
  }, [volume, muted]);

  // Particle animation loop
  useEffect(() => {
    const loop = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.04,
          life: p.life - 0.025,
        }))
        .filter((p) => p.life > 0);
      setParticles([...particlesRef.current]);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleActivate = useCallback((x: number, y: number) => {
    const newP = spawnParticles(x, y, board, 7);
    particlesRef.current = [...particlesRef.current, ...newP].slice(-60);
  }, [board]);

  // Dark board check
  const isDark = board.id === "mystery" || board.id === "magical-forest";

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: board.gradient }}
    >
      {/* Ambient floating emojis background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {board.ambientEmojis.map((em, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              fontSize: `${1.2 + (i % 4) * 0.5}rem`,
              left: `${(i * 13 + 5) % 90}%`,
              top: `${(i * 17 + 8) % 85}%`,
              opacity: 0.12,
              animation: `float${(i % 3) + 1} ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {em}
          </span>
        ))}
      </div>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute select-none"
            style={{
              left: p.x,
              top: p.y,
              fontSize: `${p.scale * 1.2}rem`,
              opacity: p.life,
              transform: `translate(-50%, -50%) scale(${p.scale})`,
              transition: "none",
              pointerEvents: "none",
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
        style={{
          background: isDark ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${board.particleColor}44`,
        }}
      >
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 font-semibold text-sm"
          style={{
            borderRadius: "0.75rem",
            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
            color: board.textColor,
            border: `1px solid ${board.particleColor}55`,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          ← Back
        </button>

        {/* Title */}
        <div
          className="font-bold text-lg flex items-center gap-2"
          style={{ fontFamily: "Fraunces, serif", color: board.textColor }}
        >
          {board.emoji} {board.name}
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            className="text-lg px-2 py-1"
            style={{
              borderRadius: "0.75rem",
              background: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
              border: `1px solid ${board.particleColor}55`,
              cursor: "pointer",
              color: board.textColor,
            }}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolumeState(parseFloat(e.target.value));
              setMuted(false);
            }}
            className="w-20 md:w-28"
            style={{ accentColor: board.accentColor, cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Board content */}
      <div className="relative z-10 p-4 md:p-8">
        {/* Tagline */}
        <div className="text-center mb-6">
          <p
            className="text-sm font-medium"
            style={{ color: board.textColor, opacity: 0.7 }}
          >
            Tap anything to hear its sound ✨
          </p>
        </div>

        {/* Items grid */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          {board.items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1">
              <ItemButton
                item={item}
                board={board}
                onActivate={handleActivate}
                muted={muted}
              />
              <span
                className="text-xs text-center"
                style={{ color: board.textColor, opacity: 0.6, maxWidth: "5rem" }}
              >
                {item.description}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <div className="text-center mt-10 pb-6">
          <span
            className="text-xs px-4 py-2 rounded-full"
            style={{
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)",
              color: board.textColor,
              opacity: 0.7,
              backdropFilter: "blur(8px)",
            }}
          >
            🎧 Best experienced with headphones
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-5deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(8deg); } }
        @keyframes rippleOut { 0% { opacity: 0.8; transform: scale(0.5); } 100% { opacity: 0; transform: scale(2); } }
      `}</style>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  // Persist last board in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("asmrboards_last");
    if (saved) {
      const found = BOARDS.find((b) => b.id === saved);
      if (found) setActiveBoard(found);
    }
  }, []);

  const handleSelect = (board: Board) => {
    localStorage.setItem("asmrboards_last", board.id);
    setActiveBoard(board);
  };

  const handleBack = () => {
    localStorage.removeItem("asmrboards_last");
    setActiveBoard(null);
  };

  if (activeBoard) {
    // Full-screen board — no Shell chrome
    return <BoardScreen board={activeBoard} onBack={handleBack} />;
  }

  return (
    <Shell>
      <HomeScreen onSelect={handleSelect} />
    </Shell>
  );
}

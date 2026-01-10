"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/dw3l2zv8i/video/upload/v1736500724/yandere_3_video_r3nh8r.mp4";
const TARGETS_URL =
  "https://res.cloudinary.com/dw3l2zv8i/raw/upload/v1736501889/targets_u25uwa.mind";

declare global {
  interface Window {
    AFRAME: any;
    MINDAR: any;
  }
}

// Quotes from Yandere 3 - translated to Vietnamese
const QUOTES = [
  "Cuộc sống của chúng ta như những cuốn sách phủ đầy bụi trên kệ, nhạt nhẽo đến không gợn sóng",
  "Nếu không thể nương tựa vào nhau để sống, vậy thì cùng nhau xuống địa ngục đi",
  "Nếu tôi bẩn thỉu hơn, liệu có thể đến gần bạn hơn không?",
  "Bảy linh hồn cô đơn, một thân xác tan vỡ",
  "Chúng ta gần như bình thường... nhưng không hoàn toàn",
];

// Generate stable random values for particles (seeded by index)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Loading screen component with Yandere 3 theme - Split Personality / Psychological Horror
function LoadingScreen({ progress }: { progress: number }) {
  const [glitchText, setGlitchText] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [flickerOpacity, setFlickerOpacity] = useState(1);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [shatterEffect, setShatterEffect] = useState(false);
  const [mirrorCrack, setMirrorCrack] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Word-by-word reveal for quotes
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [quoteKey, setQuoteKey] = useState(0);

  // Mark as mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current quote words
  const currentQuoteWords = QUOTES[currentQuote].split(" ");

  // Randomly reveal words one by one
  useEffect(() => {
    setVisibleWords([]);
    const wordCount = currentQuoteWords.length;
    const indices = Array.from({ length: wordCount }, (_, i) => i);

    // Shuffle indices for random order appearance
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    const timers = shuffledIndices.map((wordIndex, order) =>
      setTimeout(() => {
        setVisibleWords(prev => [...prev, wordIndex]);
      }, 80 + order * 60) // Faster word appearance
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, [quoteKey, currentQuote]);

  useEffect(() => {
    // Glitch effect - faster and more frequent
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
      // Sometimes trigger shatter
      if (Math.random() > 0.5) {
        setShatterEffect(true);
        setTimeout(() => setShatterEffect(false), 200);
      }
    }, 1500);

    // Heartbeat effect - faster double beat
    const heartbeatInterval = setInterval(() => {
      setHeartbeat(true);
      setTimeout(() => setHeartbeat(false), 100);
      setTimeout(() => {
        setHeartbeat(true);
        setTimeout(() => setHeartbeat(false), 100);
      }, 180);
    }, 1200);

    // Random flicker effect - faster
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const flickers = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < flickers; i++) {
          setTimeout(() => {
            setFlickerOpacity(0.3 + Math.random() * 0.4);
            setTimeout(() => setFlickerOpacity(1), 20 + Math.random() * 30);
          }, i * 50);
        }
      }
    }, 300);

    // Mirror crack effect
    const crackInterval = setInterval(() => {
      setMirrorCrack(true);
      setTimeout(() => setMirrorCrack(false), 300);
    }, 1200);

    // Cycle through quotes - faster
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
      setQuoteKey(prev => prev + 1);
    }, 2500);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(heartbeatInterval);
      clearInterval(flickerInterval);
      clearInterval(crackInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        overflow: "hidden",
        opacity: flickerOpacity,
        transition: "opacity 0.03s",
      }}
    >
      {/* Cracked glass overlay effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(45deg, transparent 48%, rgba(139,0,0,0.1) 49%, rgba(139,0,0,0.1) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(139,0,0,0.05) 49%, rgba(139,0,0,0.05) 51%, transparent 52%),
            linear-gradient(135deg, transparent 48%, rgba(100,0,0,0.08) 49%, rgba(100,0,0,0.08) 51%, transparent 52%)
          `,
          backgroundSize: "60px 60px, 80px 80px, 100px 100px",
          opacity: mirrorCrack ? 1 : 0.3,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Rain/water droplet effect - like condensation on glass */}
      {isMounted && [...Array(50)].map((_, i) => (
        <div
          key={`rain-${i}`}
          style={{
            position: "absolute",
            left: `${seededRandom(i) * 100}%`,
            top: `-${seededRandom(i + 100) * 20}%`,
            width: "1px",
            height: `${20 + seededRandom(i + 200) * 60}px`,
            background: `linear-gradient(to bottom, transparent, rgba(139, 0, 0, ${0.1 + seededRandom(i + 300) * 0.2}), transparent)`,
            animation: `rain ${2 + seededRandom(i + 400) * 3}s linear infinite`,
            animationDelay: `-${seededRandom(i + 500) * 3}s`,
          }}
        />
      ))}

      {/* Shattered mirror fragments */}
      {isMounted && shatterEffect && [...Array(12)].map((_, i) => (
        <div
          key={`shard-${i}`}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${10 + seededRandom(i + 600) * 30}px`,
            height: `${10 + seededRandom(i + 700) * 30}px`,
            background: `linear-gradient(${seededRandom(i + 800) * 360}deg, rgba(139,0,0,0.3), transparent)`,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            transform: `translate(-50%, -50%) rotate(${seededRandom(i + 900) * 360}deg) translate(${seededRandom(i + 1000) * 100 - 50}px, ${seededRandom(i + 1100) * 100 - 50}px)`,
            animation: "shardExplode 0.5s ease-out forwards",
            opacity: 0.8,
          }}
        />
      ))}

      {/* Blood drips - slower, more viscous */}
      {[...Array(7)].map((_, i) => (
        <div
          key={`drip-${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: `${10 + i * 13}%`,
            width: "2px",
            height: "0%",
            background: "linear-gradient(to bottom, #8b0000, #4a0000, transparent)",
            borderRadius: "0 0 50% 50%",
            animation: `drip ${5 + i * 0.7}s ease-in infinite`,
            animationDelay: `${i * 0.6}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Floating dust particles - like dusty books */}
      {isMounted && [...Array(40)].map((_, i) => (
        <div
          key={`dust-${i}`}
          style={{
            position: "absolute",
            width: `${1 + seededRandom(i + 1200) * 3}px`,
            height: `${1 + seededRandom(i + 1300) * 3}px`,
            background: `rgba(${100 + seededRandom(i + 1400) * 55}, ${seededRandom(i + 1500) * 20}, ${seededRandom(i + 1600) * 20}, ${0.2 + seededRandom(i + 1700) * 0.4})`,
            borderRadius: "50%",
            left: `${seededRandom(i + 1800) * 100}%`,
            top: `${seededRandom(i + 1900) * 100}%`,
            animation: `dustFloat ${8 + seededRandom(i + 2000) * 12}s ease-in-out infinite`,
            animationDelay: `-${seededRandom(i + 2100) * 8}s`,
            boxShadow: `0 0 ${3 + seededRandom(i + 2200) * 5}px rgba(139, 0, 0, 0.3)`,
          }}
        />
      ))}

      {/* Pulsing dark vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center,
            transparent 0%,
            transparent 20%,
            rgba(20, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.9) 100%)`,
          animation: "vignettePulse 1.5s ease-in-out infinite",
        }}
      />


      {/* Main content container with heartbeat */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "50px",
          transform: heartbeat ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.08s ease-out",
        }}
      >
        {/* Decorative frame with crack effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(139, 0, 0, 0.3)",
            opacity: mirrorCrack ? 0.8 : 0.4,
            transition: "opacity 0.3s",
          }}
        >
          {/* Corner decorations */}
          <div style={{ position: "absolute", top: -1, left: -1, width: "20px", height: "20px", borderTop: "2px solid #8b0000", borderLeft: "2px solid #8b0000" }} />
          <div style={{ position: "absolute", top: -1, right: -1, width: "20px", height: "20px", borderTop: "2px solid #8b0000", borderRight: "2px solid #8b0000" }} />
          <div style={{ position: "absolute", bottom: -1, left: -1, width: "20px", height: "20px", borderBottom: "2px solid #8b0000", borderLeft: "2px solid #8b0000" }} />
          <div style={{ position: "absolute", bottom: -1, right: -1, width: "20px", height: "20px", borderBottom: "2px solid #8b0000", borderRight: "2px solid #8b0000" }} />
        </div>

        {/* Main title with glitch effect */}
        <div
          style={{
            position: "relative",
            marginBottom: "8px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: 700,
              color: "#8b0000",
              textShadow: glitchText
                ? "3px 0 #00ffff, -3px 0 #ff00ff, 0 0 30px rgba(139,0,0,1)"
                : "0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.4), 0 0 60px rgba(139, 0, 0, 0.2)",
              margin: 0,
              letterSpacing: "0.2em",
              transform: glitchText ? `skewX(${Math.random() * 4 - 2}deg) translateX(${Math.random() * 4 - 2}px)` : "none",
              transition: "transform 0.05s",
              animation: "textGlow 1.5s ease-in-out infinite",
            }}
          >
            YANDERE 3
          </h1>
          {/* Glitch duplicate layers */}
          {glitchText && (
            <>
              <h1
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  fontWeight: 700,
                  color: "#00ffff",
                  opacity: 0.7,
                  margin: 0,
                  letterSpacing: "0.2em",
                  transform: "translateX(-3px)",
                  clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                }}
              >
                YANDERE 3
              </h1>
              <h1
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  fontWeight: 700,
                  color: "#ff00ff",
                  opacity: 0.7,
                  margin: 0,
                  letterSpacing: "0.2em",
                  transform: "translateX(3px)",
                  clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                }}
              >
                YANDERE 3
              </h1>
            </>
          )}
        </div>

        {/* Subtitle */}
        <h3
          style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: "clamp(0.8rem, 3vw, 1.1rem)",
            fontWeight: 400,
            color: "#555",
            margin: "0 0 30px 0",
            letterSpacing: "0.15em",
            fontStyle: "italic",
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          Chúng Ta Gần Như Bình Thường
        </h3>

        {/* Loading bar */}
        <div
          style={{
            width: "260px",
            maxWidth: "75vw",
            margin: "0 auto 25px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "rgba(139, 0, 0, 0.15)",
              borderRadius: "1px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.2), transparent)",
                animation: "shimmer 1s infinite",
              }}
            />
            {/* Progress fill */}
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #4a0000, #8b0000, #cc0000, #8b0000)",
                borderRadius: "1px",
                transition: "width 0.4s ease-out",
                boxShadow: "0 0 8px rgba(139, 0, 0, 0.8), 0 0 16px rgba(139, 0, 0, 0.4)",
                position: "relative",
              }}
            >
              {/* Pulsing tip */}
              <div
                style={{
                  position: "absolute",
                  right: "-2px",
                  top: "-3px",
                  width: "8px",
                  height: "8px",
                  background: "radial-gradient(circle, #ff4444, #cc0000)",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #ff0000, 0 0 16px #ff0000",
                  animation: "glowPulse 0.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Loading text */}
          <p
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: "0.75rem",
              color: "#555",
              marginTop: "15px",
              letterSpacing: "0.08em",
              animation: "textPulse 0.8s ease-in-out infinite",
            }}
          >
            {progress < 25
              ? "Đang thức tỉnh ý thức..."
              : progress < 50
              ? "Đang kết nối bảy linh hồn..."
              : progress < 75
              ? "Đang mở cánh cửa ký ức..."
              : progress < 95
              ? "Đang chuẩn bị trải nghiệm..."
              : "Xin mời bước vào..."}
          </p>
        </div>

        {/* Rotating quotes with word-by-word random reveal */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            maxWidth: "85vw",
          }}
        >
          <p
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: "0.7rem",
              color: "#3a3a3a",
              letterSpacing: "0.03em",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            「{" "}
            {currentQuoteWords.map((word, index) => (
              <span
                key={`${quoteKey}-${index}`}
                style={{
                  opacity: visibleWords.includes(index) ? 1 : 0,
                  transform: visibleWords.includes(index) ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                  display: "inline-block",
                  marginRight: "0.25em",
                }}
              >
                {word}
              </span>
            ))}
            {" "}」
          </p>
        </div>
      </div>

      {/* Scanning line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 10%, rgba(139, 0, 0, 0.6) 50%, transparent 90%)",
          boxShadow: "0 0 15px rgba(139, 0, 0, 0.5), 0 2px 10px rgba(139, 0, 0, 0.3)",
          animation: "scanLine 2s linear infinite",
        }}
      />

      {/* Second scanning line - opposite direction */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 10%, rgba(139, 0, 0, 0.4) 50%, transparent 90%)",
          boxShadow: "0 0 10px rgba(139, 0, 0, 0.3)",
          animation: "scanLineReverse 2.5s linear infinite",
        }}
      />

      {/* Static noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: "none",
          animation: "noiseFlicker 0.1s steps(5) infinite",
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+SC:wght@400;700&display=swap');

        @keyframes rain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes dustFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(90deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-45px) translateX(8px) rotate(270deg);
            opacity: 0.4;
          }
        }

        @keyframes drip {
          0% { height: 0%; opacity: 0; }
          5% { opacity: 0.8; }
          60% { height: 25%; opacity: 0.6; }
          100% { height: 50%; opacity: 0; }
        }

        @keyframes vignettePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 0, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.3);
            opacity: 0.8;
          }
          50% {
            text-shadow: 0 0 30px rgba(139, 0, 0, 0.9), 0 0 60px rgba(139, 0, 0, 0.5), 0 0 80px rgba(139, 0, 0, 0.3);
            opacity: 1;
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        @keyframes textPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes scanLine {
          0% { top: -5%; }
          100% { top: 105%; }
        }

        @keyframes scanLineReverse {
          0% { bottom: -5%; }
          100% { bottom: 105%; }
        }

        @keyframes shardExplode {
          0% { opacity: 0.8; transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(180deg) scale(0) translateY(50px); }
        }

        @keyframes noiseFlicker {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.05; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [scriptsReady, setScriptsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Detect if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // Load scripts dynamically with progress tracking
  useEffect(() => {
    const loadScripts = async () => {
      // Start progress animation
      setLoadingProgress(10);

      // Check if already loaded
      if (window.AFRAME && window.MINDAR) {
        setLoadingProgress(100);
        setTimeout(() => {
          setScriptsReady(true);
          setIsLoading(false);
        }, 500);
        return;
      }

      try {
        // Suppress DPDB fetch error by setting WebVR config before A-Frame loads
        (window as any).WebVRConfig = {
          DPDB_URL: "data:application/json,{}", // Empty JSON to prevent fetch
          CARDBOARD_UI_DISABLED: true,
          ROTATE_INSTRUCTIONS_DISABLED: true,
          BUFFER_SCALE: 1.0,
          ENABLE_DEPRECATED_API: false,
        };

        setLoadingProgress(20);

        // Load A-Frame first
        if (!window.AFRAME) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
            script.onload = () => {
              console.log("A-Frame loaded");
              setLoadingProgress(50);
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Load MindAR after A-Frame
        if (!window.MINDAR) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";
            script.onload = () => {
              console.log("MindAR loaded");
              setLoadingProgress(80);
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        setLoadingProgress(85);

        // Delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setLoadingProgress(95);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setLoadingProgress(100);

        // Fade out loading screen
        setTimeout(() => {
          setScriptsReady(true);
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error("Failed to load scripts:", error);
        console.error("Failed to load AR libraries");
        setIsLoading(false);
      }
    };

    loadScripts();
  }, []);

  // Initialize AR after scripts are loaded
  useEffect(() => {
    if (!scriptsReady) return;

    // Mirror transform only for desktop/laptop (webcam facing user)
    const mirrorTransform = isMobile ? "" : "scaleX(-1)";

    let mounted = true;

    const initAR = async () => {
      try {
        if (!mounted || !containerRef.current) return;

        // Create AR scene - MindAR will handle camera automatically
        containerRef.current.innerHTML = `
          <style>
            #ar-container {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              height: 100dvh !important;
              overflow: hidden !important;
            }
            #ar-container a-scene {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
            }
            #ar-container canvas {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              transform: ${mirrorTransform} !important;
            }
            #ar-container video:not(#ar-video) {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              transform: ${mirrorTransform} !important;
            }
            #ar-video {
              transform: none !important;
            }
          </style>
          <div id="ar-container">
          <a-scene
            mindar-image="imageTargetSrc: ${TARGETS_URL}; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; filterBeta: 0.001;"
            color-space="sRGB"
            renderer="colorManagement: true, antialias: true, alpha: true"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            loading-screen="enabled: false"
            embedded
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          >
            <a-assets>
              <video
                id="ar-video"
                src="${VIDEO_URL}"
                preload="auto"
                loop
                crossorigin="anonymous"
                playsinline
                webkit-playsinline
              ></video>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false" camera="active: true"></a-camera>

            <a-entity mindar-image-target="targetIndex: 0">
              <a-video
                src="#ar-video"
                position="0 0 0"
                rotation="0 0 0"
                width="1.2"
                height="1.8"
                opacity="1"
              ></a-video>
            </a-entity>
          </a-scene>
          </div>
        `;

        // Wait for scene to load
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!mounted) return;

        const scene = containerRef.current?.querySelector("a-scene") as any;
        const arVideo = document.getElementById("ar-video") as HTMLVideoElement;
        const target = containerRef.current?.querySelector(
          "[mindar-image-target]"
        );

        if (!scene) {
          console.error("Scene creation failed");
          return;
        }

        // Listen for scene ready - use arReady for MindAR
        const clearStatus = () => {
          if (!mounted) return;
          console.log("AR ready - camera should be visible");
          setStatus("");
        };

        // Force canvas and video to fill viewport
        const resizeCanvas = () => {
          const canvas = scene.querySelector("canvas");
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          if (canvas) {
            // Force canvas to fill screen
            canvas.style.width = windowWidth + "px";
            canvas.style.height = windowHeight + "px";
            canvas.style.position = "fixed";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.transform = mirrorTransform;
            canvas.width = windowWidth;
            canvas.height = windowHeight;
          }

          // Also resize any video elements from camera
          const videos = document.querySelectorAll("video");
          videos.forEach((v: any) => {
            v.style.width = windowWidth + "px";
            v.style.height = windowHeight + "px";
            v.style.objectFit = "cover";
            v.style.position = "fixed";
            v.style.top = "0";
            v.style.left = "0";
            v.style.transform = mirrorTransform;
          });

          // Force renderer resize
          if (scene.renderer) {
            scene.renderer.setSize(windowWidth, windowHeight);
          }
        };

        scene.addEventListener("arReady", () => {
          clearStatus();
          resizeCanvas();
        });
        scene.addEventListener("loaded", () => {
          clearStatus();
          resizeCanvas();
        });

        // Resize on window resize
        window.addEventListener("resize", resizeCanvas);

        // Also clear status after a timeout as fallback
        setTimeout(() => {
          if (mounted) {
            console.log("Timeout fallback - forcing resize");
            setStatus("");
            resizeCanvas();
          }
        }, 2000);

        // Keep trying to resize for a few seconds to ensure it takes effect
        let resizeAttempts = 0;
        const resizeInterval = setInterval(() => {
          if (!mounted || resizeAttempts > 10) {
            clearInterval(resizeInterval);
            return;
          }
          resizeCanvas();
          resizeAttempts++;
        }, 500);

        // Handle target detection
        if (target) {
          target.addEventListener("targetFound", () => {
            if (mounted) {
              console.log("Target found!");
              if (arVideo) {
                arVideo
                  .play()
                  .catch((e) => console.log("Video play error:", e));
              }
            }
          });

          target.addEventListener("targetLost", () => {
            if (mounted) {
              console.log("Target lost");
              if (arVideo) {
                arVideo.pause();
                arVideo.currentTime = 0;
              }
            }
          });
        }
      } catch (error) {
        console.error("AR initialization error:", error);
        if (mounted) {
          console.error("Failed to load AR");
        }
      }
    };

    initAR();

    // Cleanup
    return () => {
      mounted = false;
      const scene = containerRef.current?.querySelector("a-scene") as any;
      if (scene?.systems?.["mindar-image-system"]) {
        try {
          scene.systems["mindar-image-system"].stop();
        } catch (e) {
          console.log("Error stopping MindAR:", e);
        }
      }
    };
  }, [scriptsReady, isMobile]);

  return (
    <>
      {/* Global styles to hide A-Frame default loading UI */}
      <style>{`
        .a-loader-title,
        .a-enter-vr,
        .a-enter-vr-button,
        .a-enter-ar,
        .a-enter-ar-button,
        .a-loader,
        .a-modal,
        .a-dialog,
        .a-orientation-modal,
        a-scene .a-loader-title,
        a-scene .a-canvas + div,
        a-scene > div:not([id]) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen progress={loadingProgress} />}

      <div
        style={{
          padding: 0,
          margin: 0,
          background: "#000",
          width: "100vw",
          height: "100dvh",
          minHeight: "100vh",
          overflow: "hidden",
          position: "fixed",
          inset: 0,
          touchAction: "none",
          WebkitOverflowScrolling: "touch",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* AR Scene Container - MindAR handles camera */}
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Status message */}
        {status && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              borderRadius: "10px",
              fontSize: "16px",
              zIndex: 9999,
              textAlign: "center",
            }}
          >
            {status}
          </div>
        )}
      </div>
    </>
  );
}

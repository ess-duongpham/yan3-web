"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/dw3l2zv8i/video/upload/v1766573361/Yan_3_vid_kvg71i.mp4";
const TARGETS_URL =
  "https://res.cloudinary.com/dw3l2zv8i/raw/upload/v1766657251/targets_zk9tjc.mind";

declare global {
  interface Window {
    AFRAME: any;
    MINDAR: any;
  }
}

// Loading screen component with Yandere 3 theme
function LoadingScreen({ progress }: { progress: number }) {
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        overflow: "hidden",
      }}
    >
      {/* Animated blood drip effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 0%, rgba(139, 0, 0, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(139, 0, 0, 0.15) 0%, transparent 50%)
          `,
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            background: `rgba(${139 + Math.random() * 50}, 0, 0, ${0.3 + Math.random() * 0.4})`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Main content container */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "40px",
        }}
      >
        {/* Chinese title with glitch effect */}
        <h1
          style={{
            fontFamily: "'Noto Serif SC', 'STSong', serif",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 900,
            color: "#8b0000",
            textShadow: glitchText
              ? "3px 0 #00ffff, -3px 0 #ff00ff, 0 0 20px rgba(139,0,0,0.8)"
              : "0 0 30px rgba(139, 0, 0, 0.8), 0 0 60px rgba(139, 0, 0, 0.4)",
            marginBottom: "8px",
            letterSpacing: "0.15em",
            transform: glitchText ? "skewX(-2deg)" : "none",
            transition: "transform 0.1s",
          }}
        >
          病娇3
        </h1>

        {/* Subtitle */}
        <h2
          style={{
            fontFamily: "'Noto Serif SC', 'STSong', serif",
            fontSize: "clamp(1rem, 4vw, 1.5rem)",
            fontWeight: 400,
            color: "#666",
            marginBottom: "16px",
            letterSpacing: "0.3em",
          }}
        >
          近乎正常的我们
        </h2>

        {/* English subtitle */}
        <p
          style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            color: "#4a4a4a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "50px",
          }}
        >
          Nearly Normal Us
        </p>

        {/* Decorative line */}
        <div
          style={{
            width: "200px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #8b0000, transparent)",
            margin: "0 auto 40px",
          }}
        />

        {/* Loading bar container */}
        <div
          style={{
            width: "280px",
            maxWidth: "80vw",
            margin: "0 auto",
          }}
        >
          {/* Progress bar background */}
          <div
            style={{
              width: "100%",
              height: "3px",
              background: "rgba(139, 0, 0, 0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Progress bar fill */}
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #8b0000, #cc0000, #8b0000)",
                borderRadius: "2px",
                transition: "width 0.3s ease-out",
                boxShadow: "0 0 10px rgba(139, 0, 0, 0.8), 0 0 20px rgba(139, 0, 0, 0.4)",
              }}
            />
          </div>

          {/* Loading text */}
          <p
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "20px",
              letterSpacing: "0.15em",
            }}
          >
            {progress < 30
              ? "Initializing..."
              : progress < 60
              ? "Loading AR Engine..."
              : progress < 90
              ? "Preparing Experience..."
              : "Almost Ready..."}
          </p>
        </div>

        {/* Bottom quote */}
        <p
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "0.75rem",
            color: "#3a3a3a",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          「 爱是病，我们都无药可救 」
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.5;
          }
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

        setLoadingProgress(95);

        // Small delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 500));

        setLoadingProgress(100);

        // Fade out loading screen
        setTimeout(() => {
          setScriptsReady(true);
          setIsLoading(false);
        }, 300);
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
            #ar-container video {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              transform: ${mirrorTransform} !important;
            }
          </style>
          <div id="ar-container">
          <a-scene
            mindar-image="imageTargetSrc: ${TARGETS_URL}; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; filterBeta: 0.001;"
            color-space="sRGB"
            renderer="colorManagement: true, antialias: true, alpha: true"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
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
                muted
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

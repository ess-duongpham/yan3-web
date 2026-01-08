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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [scriptsReady, setScriptsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Load scripts dynamically
  useEffect(() => {
    const loadScripts = async () => {
      // Check if already loaded
      if (window.AFRAME && window.MINDAR) {
        setScriptsReady(true);
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

        // Load A-Frame first
        if (!window.AFRAME) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
            script.onload = () => {
              console.log("A-Frame loaded");
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
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        setScriptsReady(true);
      } catch (error) {
        console.error("Failed to load scripts:", error);
        console.error("Failed to load AR libraries");
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
  );
}

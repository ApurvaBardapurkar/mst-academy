"use client";

import { useEffect, useRef, useCallback } from "react";
import { Video, VideoOff, AlertTriangle } from "lucide-react";
import { playWarning } from "@/lib/sounds";

export type CameraViolationType = "camera_off" | "camera_covered" | "camera_denied";

interface AssessmentCameraProctorProps {
  active: boolean;
  onViolation: (type: CameraViolationType) => void;
}

/** Samples video frames for camera-off / covered-camera heuristics. */
export function AssessmentCameraProctor({
  active,
  onViolation,
}: AssessmentCameraProctorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const darkStreakRef = useRef(0);
  const violationFiredRef = useRef<Set<CameraViolationType>>(new Set());

  const fireOnce = useCallback(
    (type: CameraViolationType) => {
      if (violationFiredRef.current.has(type)) return;
      violationFiredRef.current.add(type);
      playWarning();
      onViolation(type);
    },
    [onViolation]
  );

  useEffect(() => {
    if (!active) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => {});
        }

        stream.getVideoTracks()[0]?.addEventListener("ended", () => {
          fireOnce("camera_off");
        });

        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 120;
        canvasRef.current = canvas;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        intervalId = setInterval(() => {
          const v = videoRef.current;
          if (!v || v.readyState < 2 || !ctx) return;

          try {
            ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let sum = 0;
            for (let i = 0; i < data.length; i += 4) {
              sum += data[i]! + data[i + 1]! + data[i + 2]!;
            }
            const avg = sum / (data.length / 4) / 3;

            if (avg < 18) {
              darkStreakRef.current += 1;
              if (darkStreakRef.current >= 4) {
                fireOnce("camera_covered");
              }
            } else {
              darkStreakRef.current = 0;
            }
          } catch {
            fireOnce("camera_off");
          }
        }, 1500);
      } catch {
        fireOnce("camera_denied");
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [active, fireOnce]);

  if (!active) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[150] flex flex-col items-end gap-2">
      <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 shadow-lg backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Camera active
      </div>
      <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/50 bg-black shadow-2xl shadow-emerald-500/20">
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          className="h-24 w-32 object-cover sm:h-28 sm:w-36"
        />
        <div className="flex items-center justify-center gap-1 bg-black/90 px-2 py-1 text-[9px] font-bold text-[var(--text-muted)]">
          <Video className="h-3 w-3 text-emerald-500" />
          Proctoring
        </div>
      </div>
    </div>
  );
}

export async function requestCameraPermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    stream.getTracks().forEach((t) => t.stop());
    return true;
  } catch {
    return false;
  }
}

export function CameraRequiredNotice({ ok }: { ok: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
        ok
          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
          : "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400"
      }`}
    >
      {ok ? <Video className="h-5 w-5 shrink-0" /> : <VideoOff className="h-5 w-5 shrink-0" />}
      <span>
        {ok
          ? "Camera verified. Proctoring will run during the assessment."
          : "Camera access is required. Allow camera in your browser to continue."}
      </span>
      {!ok && <AlertTriangle className="ml-auto h-4 w-4 shrink-0" />}
    </div>
  );
}

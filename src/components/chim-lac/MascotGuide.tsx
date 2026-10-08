"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { ChimLacArt } from "./ChimLacArt";
import type { MascotGuideHandle, MascotGuideProps } from "./types";
import styles from "./MascotGuide.module.css";

type Phase = "docked" | "guiding" | "celebrate";
type Position = { x: number; y: number };
type TargetBox = { x: number; y: number; width: number; height: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Portable guided mascot. It only needs step target selectors and text.
 * The host app owns its pages and decides when to call startTour()/showStep().
 */
export const MascotGuide = forwardRef<MascotGuideHandle, MascotGuideProps>(
  function MascotGuide(
    { steps, storageKey = "chim-lac:guided-tour", imageSrc, onComplete },
    ref,
  ) {
    const [phase, setPhase] = useState<Phase>("docked");
    const [stepIndex, setStepIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [targetBox, setTargetBox] = useState<TargetBox | null>(null);
    const [ready, setReady] = useState(false);
    const [viewport, setViewport] = useState({ width: 1280, height: 820 });
    const [completed, setCompleted] = useState(false);
    const step = steps[stepIndex];

    useEffect(() => {
      try {
        setCompleted(window.localStorage.getItem(storageKey) === "done");
      } catch {
        // Local storage may be blocked; the tour still works.
      }
    }, [storageKey]);

    const reposition = useCallback(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const small = width < 650;
      const birdWidth = small ? 102 : 138;
      const birdHeight = small ? 116 : 156;
      const dock = {
        x: Math.max(8, width - birdWidth - (small ? 8 : 22)),
        y: Math.max(80, height - birdHeight - (small ? 9 : 15)),
      };
      setViewport({ width, height });

      if (phase !== "guiding" || !step) {
        setPosition(dock);
        setTargetBox(null);
        setReady(true);
        return;
      }

      let target: HTMLElement | null = null;
      try { target = document.querySelector<HTMLElement>(step.target); }
      catch { /* Invalid selectors never crash the host app. */ }

      if (!target) {
        setPosition(dock);
        setTargetBox(null);
        setReady(true);
        return;
      }

      const box = target.getBoundingClientRect();
      setTargetBox({
        x: box.left - 7,
        y: box.top - 7,
        width: box.width + 14,
        height: box.height + 14,
      });

      const leftSide = box.left > birdWidth + 36;
      const rawX = leftSide
        ? box.left - birdWidth - 23
        : box.right + 18;
      const rawY = box.top + box.height / 2 - birdHeight / 2;
      setPosition({
        x: clamp(rawX, 8, Math.max(8, width - birdWidth - 8)),
        y: clamp(rawY, 76, Math.max(76, height - birdHeight - 8)),
      });
      setReady(true);
    }, [phase, step]);

    useEffect(() => {
      if (phase === "guiding" && step) {
        let target: HTMLElement | null = null;
        try { target = document.querySelector<HTMLElement>(step.target); }
        catch { /* A missing selector simply leaves the bird docked. */ }
        if (target) {
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "instant" : "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }
      reposition();
      const delayed = window.setTimeout(reposition, 430);
      window.addEventListener("resize", reposition);
      window.addEventListener("scroll", reposition, true);
      return () => {
        window.clearTimeout(delayed);
        window.removeEventListener("resize", reposition);
        window.removeEventListener("scroll", reposition, true);
      };
    }, [phase, step, reposition]);

    const startTour = useCallback(() => {
      if (steps.length === 0) return;
      setVisible(true);
      setStepIndex(0);
      setPhase("guiding");
    }, [steps.length]);

    const showStep = useCallback((index: number) => {
      if (steps.length === 0) return;
      setVisible(true);
      setStepIndex(clamp(index, 0, steps.length - 1));
      setPhase("guiding");
    }, [steps.length]);

    const dock = useCallback(() => {
      setPhase("docked");
      setVisible(true);
    }, []);

    const hide = useCallback(() => setVisible(false), []);
    const show = useCallback(() => setVisible(true), []);
    const resetProgress = useCallback(() => {
      try { window.localStorage.removeItem(storageKey); } catch { /* optional */ }
      setCompleted(false);
      startTour();
    }, [storageKey, startTour]);

    useImperativeHandle(ref, () => ({
      startTour, showStep, dock, hide, show, resetProgress,
    }), [startTour, showStep, dock, hide, show, resetProgress]);

    const next = () => {
      if (stepIndex < steps.length - 1) {
        setStepIndex((previous) => previous + 1);
        return;
      }
      try { window.localStorage.setItem(storageKey, "done"); } catch { /* optional */ }
      setCompleted(true);
      setPhase("celebrate");
      onComplete?.();
    };

    if (!visible) return null;

    const isGuide = phase === "guiding" && Boolean(step);
    const isCelebrating = phase === "celebrate";
    const isDocked = phase === "docked";
    const compact = viewport.width < 650;
    const bubbleWidth = compact ? Math.min(310, viewport.width - 24) : 292;
    const preferLeft = position.x > viewport.width * 0.52;
    const bubbleX = compact
      ? 12
      : clamp(preferLeft ? position.x - bubbleWidth - 4 : position.x + 135,
        14, Math.max(14, viewport.width - bubbleWidth - 14));
    const bubbleY = compact
      ? clamp(position.y - 186, 68, Math.max(68, viewport.height - 225))
      : clamp(position.y + 8, 78, Math.max(78, viewport.height - 208));

    return (
      <div className={styles.layer} aria-label="Trợ lý hướng dẫn Chim Lạc">
        {isGuide && targetBox && (
          <div
            className={styles.highlight}
            aria-hidden="true"
            style={{
              left: targetBox.x,
              top: targetBox.y,
              width: targetBox.width,
              height: targetBox.height,
            }}
          />
        )}

        <div
          className={[
            styles.bird,
            ready ? styles.ready : "",
            isGuide ? styles.flying : "",
            isCelebrating ? styles.celebrating : "",
          ].join(" ")}
          style={ready ? { left: position.x, top: position.y } : undefined}
        >
          <button
            type="button"
            className={styles.birdButton}
            aria-label={isGuide ? "Chim Lạc đang hướng dẫn" : "Mở hướng dẫn với Chim Lạc"}
            onClick={isGuide ? next : isCelebrating ? dock : startTour}
          >
            <ChimLacArt celebrating={isCelebrating} imageSrc={imageSrc} />
          </button>
          {isDocked && (
            <button type="button" className={styles.dockChip} onClick={startTour}>
              {completed ? "Xem lại hướng dẫn" : "Chạm để khám phá"} <span>✦</span>
            </button>
          )}
        </div>

        {(isGuide || isCelebrating) && (
          <section
            className={styles.bubble}
            role="region"
            aria-label="Hướng dẫn của Chim Lạc"
            aria-live="polite"
            style={{ left: bubbleX, top: bubbleY, width: bubbleWidth }}
          >
            <div className={styles.bubbleTop}>
              <span className={styles.eyebrow}>
                <span className={styles.pulseDot} />
                {isCelebrating ? "HOÀN THÀNH" : "CHIM LẠC ĐỒNG HÀNH"}
              </span>
              <button type="button" className={styles.iconButton} onClick={dock} aria-label="Đóng hướng dẫn">
                <X size={16} />
              </button>
            </div>
            {isCelebrating ? (
              <>
                <h3 className={styles.bubbleTitle}>Bạn giỏi lắm! 🎉</h3>
                <p className={styles.bubbleBody}>Vậy là bạn đã khám phá hết những điểm chính của trang học rồi đó.</p>
                <button type="button" className={styles.primaryButton} onClick={dock}>
                  Về góc màn hình <Check size={15} />
                </button>
              </>
            ) : (
              <>
                <div className={styles.progressRow}>
                  {steps.map((s, index) => (
                    <span key={s.target + index} className={index <= stepIndex ? styles.progressActive : styles.progressItem} />
                  ))}
                  <span className={styles.stepCount}>{stepIndex + 1}/{steps.length}</span>
                </div>
                <h3 className={styles.bubbleTitle}>{step.title}</h3>
                <p className={styles.bubbleBody}>{step.description}</p>
                <div className={styles.actions}>
                  <button type="button" className={styles.skipButton} onClick={dock}>
                    Bỏ qua
                  </button>
                  <div className={styles.directionActions}>
                    {stepIndex > 0 && (
                      <button type="button" className={styles.backButton} onClick={() => setStepIndex((index) => index - 1)} aria-label="Bước trước">
                        <ArrowLeft size={16} />
                      </button>
                    )}
                    <button type="button" className={styles.primaryButton} onClick={next}>
                      {stepIndex === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"}
                      {stepIndex === steps.length - 1 ? <Check size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {isCelebrating && (
          <div className={styles.confetti} aria-hidden="true">
            {Array.from({ length: 13 }, (_, index) => (
              <i key={index} style={{ left: (7 + index * 7) + "%", animationDelay: (index % 5) * 0.18 + "s" }} />
            ))}
          </div>
        )}
        {isDocked && completed && (
          <button type="button" className={styles.resetHint} onClick={resetProgress} title="Học lại từ đầu">
            <RotateCcw size={13} />
            <span className={styles.srOnly}>Xem lại tất cả bước</span>
          </button>
        )}
      </div>
    );
  },
);

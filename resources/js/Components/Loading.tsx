import { useState, useEffect } from "react";

// ── Customize ────────────────────────────────────────────────────
const BRAND = "STUDIO";
const TAGLINE = "Where Ideas Take Form";
// ────────────────────────────────────────────────────────────────

interface LoadingProps {
    onComplete?: () => void;
}

function useCounter(target: number, duration: number, start: boolean) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        const startTime = performance.now();
        const raf = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, [start, target, duration]);
    return value;
}

export default function Loading({ onComplete }: LoadingProps) {
    // phases: loading → exit (split curtain) → curtain (black) → lifting → done
    const [phase, setPhase] = useState("loading");
    const [counterStart, setCounterStart] = useState(false);

    const count = useCounter(100, 2800, counterStart);

    useEffect(() => {
        const t1 = setTimeout(() => setCounterStart(true), 900);
        const t2 = setTimeout(() => setPhase("exit"), 3000); // split curtain opens
        const t3 = setTimeout(() => setPhase("curtain"), 4100); // black curtain drops
        const t4 = setTimeout(() => setPhase("lifting"), 4300); // black curtain lifts up
        const t5 = setTimeout(() => {
            setPhase("done");
            onComplete?.(); // notify parent
        }, 6600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, []);

    if (phase === "done") return null;

    const isExit = phase === "exit";
    const isCurtain = phase === "curtain";
    const isLifting = phase === "lifting";

    return (
        <>
            {/* ── Black curtain that slides up over the split-curtain reveal ── */}
            {(isCurtain || isLifting) && (
                <div
                    className={`fixed inset-0 z-[9998] bg-[#0a0a0a] will-change-transform
                        transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                        ${isLifting ? "-translate-y-full" : "translate-y-0"}`}
                />
            )}

            {/* ── Loader screen ── */}
            {!isCurtain && !isLifting && (
                <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between px-14 py-12 overflow-hidden font-syne">
                    {/* Split curtain — top half */}
                    <div
                        className={`absolute left-0 right-0 top-0 h-1/2 bg-[#0a0a0a] z-10
                            transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                            ${isExit ? "-translate-y-full" : "translate-y-0"}`}
                    />
                    {/* Split curtain — bottom half */}
                    <div
                        className={`absolute left-0 right-0 bottom-0 h-1/2 bg-[#0a0a0a] z-10
                            transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                            ${isExit ? "translate-y-full" : "translate-y-0"}`}
                    />

                    {/* Content above curtain halves */}
                    <div className="relative z-20 h-full flex flex-col justify-between pointer-events-none">
                        {/* Top row */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3 opacity-0 translate-y-4 animate-fade-up [animation-delay:0.2s]">
                                <span className="w-2 h-2 rounded-full bg-[#e8e2d4]" />
                                <span className="text-[13px] tracking-[0.2em] text-[#e8e2d4] font-normal uppercase">
                                    {BRAND}
                                </span>
                            </div>
                            <span className="font-dm-sans text-[12px] text-[#555] tracking-[0.05em] opacity-0 translate-y-4 animate-fade-up [animation-delay:0.4s]">
                                Est. 2024
                            </span>
                        </div>

                        {/* Center headlines */}
                        <div className="flex flex-col">
                            {/* Line 1 */}
                            <div className="overflow-hidden mb-1">
                                <span
                                    className="inline-block font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em] translate-y-[110%] animate-slide-up [animation-delay:0.5s]"
                                    style={{
                                        fontSize: "clamp(52px, 10vw, 120px)",
                                    }}
                                >
                                    Creative
                                </span>
                            </div>
                            {/* Line 2 — outline */}
                            <div className="overflow-hidden mb-1">
                                <span
                                    className="inline-block font-extrabold leading-[0.92] tracking-[-0.03em] translate-y-[110%] animate-slide-up [animation-delay:0.65s]"
                                    style={{
                                        fontSize: "clamp(52px, 10vw, 120px)",
                                        color: "transparent",
                                        WebkitTextStroke: "1.5px #e8e2d4",
                                    }}
                                >
                                    Studio
                                </span>
                            </div>

                            <p className="font-dm-sans text-sm text-[#555] font-light tracking-[0.08em] uppercase mt-6 opacity-0 animate-fade-up [animation-delay:1s]">
                                {TAGLINE}
                            </p>
                        </div>

                        {/* Bottom — progress + counter */}
                        <div className="flex justify-between items-end">
                            {/* Progress bar */}
                            <div className="flex-1 pr-12 opacity-0 animate-fade-in [animation-delay:0.8s]">
                                <div className="w-full max-w-[400px] h-px bg-[#222] relative overflow-hidden mb-4">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-[#e8e2d4] transition-[width] duration-[50ms] linear"
                                        style={{ width: `${count}%` }}
                                    />
                                </div>
                                <span className="font-dm-sans text-[12px] text-[#444] tracking-[0.05em] uppercase">
                                    Loading experience
                                </span>
                            </div>

                            {/* Counter */}
                            <div
                                className="font-extrabold text-[#e8e2d4] tracking-[-0.04em] leading-none opacity-0 animate-fade-in [animation-delay:0.8s]"
                                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
                            >
                                {count}
                                <sup className="text-[0.45em] font-normal text-[#555] align-super ml-0.5">
                                    %
                                </sup>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

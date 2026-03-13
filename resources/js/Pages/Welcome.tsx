import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import Guest from "@/Layouts/GuestLayout";
// import PortfolioLayout from "@/Layouts/PortfolioLayout";

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    const revealed = (delay: string) =>
        `transition-all duration-700 ${delay} ${
            loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
        }`;

    return (
        <Guest fullScreen>
            <Head title="John Doe — Frontend Developer & Designer" />

            {/* Loading overlay — unmounts after curtain fully lifts */}
            <Loading onComplete={() => setLoaded(true)} />

            {/* <PortfolioLayout> */}
                <section className="relative min-h-screen bg-[#0e0e0e] flex flex-col justify-end px-8 md:px-14 pb-16 overflow-hidden">
                    {/* Large background number */}
                    <span
                        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.03] select-none pointer-events-none leading-none"
                        style={{ fontSize: "clamp(180px, 30vw, 400px)" }}
                    >
                        01
                    </span>

                    {/* Eyebrow */}
                    <div
                        className={`flex items-center gap-4 font-dm-sans text-[11px] font-light text-[#c8b97a] tracking-[0.25em] uppercase mb-5 ${revealed("delay-300")}`}
                    >
                        <span className="block w-8 h-px bg-[#c8b97a]" />
                        Available for work · 2026
                    </div>

                    {/* Name */}
                    <h1
                        className={`font-extrabold leading-[0.88] tracking-[-0.04em] text-[#e8e2d4] ${revealed("delay-[450ms]")}`}
                        style={{ fontSize: "clamp(56px, 9vw, 128px)" }}
                    >
                        Jhovanie
                        <br />
                        <span
                            style={{
                                color: "transparent",
                                WebkitTextStroke: "1.5px #e8e2d4",
                            }}
                        >
                            Flores
                        </span>
                    </h1>

                    {/* Role + CTA */}
                    <div
                        className={`flex flex-col md:flex-row md:justify-between md:items-end gap-8 mt-12 ${revealed("delay-[650ms]")}`}
                    >
                        <div className="flex flex-col gap-2">
                            <p className="font-dm-sans text-sm font-light text-[#666] tracking-[0.05em] italic leading-relaxed">
                                FullStack Developer
                            </p>
                            <p className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase">
                                Based in the Philippines · Remote friendly
                            </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <Link
                                href={route("work")}
                                className="inline-flex items-center gap-4 border border-[#333] text-[#e8e2d4] px-7 py-3.5 font-syne text-[11px] font-bold tracking-[0.18em] uppercase no-underline hover:bg-[#e8e2d4] hover:text-[#0e0e0e] hover:border-[#e8e2d4] transition-all duration-300 group"
                            >
                                View my work
                                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                    →
                                </span>
                            </Link>
                            <Link
                                href={route("contact")}
                                className="font-dm-sans text-[11px] text-[#555] tracking-[0.1em] uppercase no-underline hover:text-[#e8e2d4] transition-colors duration-200"
                            >
                                Let's talk
                            </Link>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div
                        className={`absolute bottom-10 left-8 md:left-14 flex items-center gap-3 font-dm-sans text-[11px] text-[#333] tracking-[0.12em] uppercase ${revealed("delay-[900ms]")}`}
                    >
                        <span className="block w-10 h-px bg-[#333]" />
                        Scroll down
                    </div>

                    {/* Status */}
                    <div
                        className={`absolute bottom-10 right-8 md:right-14 flex items-center gap-2 font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase ${revealed("delay-[1000ms]")}`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Open to opportunities
                    </div>
                </section>
            {/* </PortfolioLayout> */}
        </Guest>
    );
}

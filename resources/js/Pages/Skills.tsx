import { useRef, useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import Loading from "@/Components/Loading";

const SKILL_GROUPS = [
    {
        category: "Frontend",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 95 },
            { name: "Framer Motion", level: 80 },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Laravel", level: 90 },
            { name: "Node.js", level: 75 },
            { name: "MySQL / Postgres", level: 80 },
            { name: "REST / GraphQL", level: 85 },
        ],
    },
    {
        category: "Design & Tools",
        skills: [
            { name: "Figma", level: 88 },
            { name: "Git / GitHub", level: 92 },
            { name: "Docker", level: 70 },
            { name: "Inertia.js", level: 88 },
        ],
    },
];

const TOOLS = [
    "React",
    "TypeScript",
    "Laravel",
    "Inertia",
    "Tailwind",
    "Figma",
    "Next.js",
    "Vite",
    "MySQL",
    "Git",
    "Docker",
    "Node.js",
];

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setInView(true);
            },
            { threshold },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, inView };
}

export default function Skills() {
    const [loaded, setLoaded] = useState(false);
    const { ref, inView } = useInView();

    return (
        <>
            <Head title="Skills — John Doe" />
            <Loading
                onComplete={() => {
                    setLoaded(true);
                }}
            />
            <Guest>
                <div className="px-8 md:px-14 pb-32">
                    {/* Page header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 border-b border-white/5 pb-16">
                        <div>
                            <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                                <span className="block w-6 h-px bg-[#c8b97a]" />{" "}
                                What I work with
                            </span>
                            <h1
                                className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
                            >
                                Skills
                            </h1>
                        </div>
                        <p className="font-dm-sans text-sm text-[#555] font-light max-w-xs leading-relaxed mt-6 md:mt-0">
                            Technologies and tools I use to bring ideas to life.
                        </p>
                    </div>

                    {/* Skill bars */}
                    <div
                        ref={ref}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24"
                    >
                        {SKILL_GROUPS.map((group, gi) => (
                            <div key={group.category}>
                                <h3 className="font-dm-sans text-[20px] text-[#444] tracking-[0.15em] uppercase mb-7 mt-4 pb-3 border-b border-white/5 ">
                                    {group.category}
                                </h3>
                                <div className="flex flex-col gap-6">
                                    {group.skills.map((s, si) => (
                                        <div key={s.name}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-dm-sans text-[13px] text-[#888] font-light">
                                                    {s.name}
                                                </span>
                                                <span className="font-dm-sans text-[11px] text-[#444] tracking-[0.05em]">
                                                    {s.level}%
                                                </span>
                                            </div>
                                            <div className="h-px bg-[#1a1a1a] relative overflow-hidden">
                                                <div
                                                    className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: inView
                                                            ? `${s.level}%`
                                                            : "0%",
                                                        background:
                                                            "linear-gradient(90deg, #c8b97a, #e8e2d4)",
                                                        transitionDelay: `${gi * 120 + si * 80 + 100}ms`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Scrolling ticker */}
                    <div className="border-t border-b border-white/5 py-6 overflow-hidden">
                        <div className="flex gap-12 animate-ticker whitespace-nowrap w-max">
                            {[...TOOLS, ...TOOLS, ...TOOLS].map((t, i) => (
                                <span
                                    key={i}
                                    className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-[#2a2a2a] hover:text-[#c8b97a] transition-colors duration-200 cursor-default"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
}

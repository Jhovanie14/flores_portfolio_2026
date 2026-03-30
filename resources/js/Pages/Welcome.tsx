import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import Guest from "@/Layouts/GuestLayout";
import { Skill, Stack } from "@/types";

// Static fallback when the DB has no skills yet
const STATIC_STACK: { category: string; skills: string[] }[] = [
    {
        category: "Frontend",
        skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    },
    {
        category: "Backend",
        skills: ["Laravel", "Node.js", "MySQL", "REST API"],
    },
    {
        category: "Design & Tools",
        skills: ["Figma", "Git", "Docker", "Inertia.js"],
    },
];

const CATEGORY_ORDER = ["Frontend", "Backend", "Design & Tools"];

interface Props {
    skills: Pick<Skill, "name" | "category">[];
    stacks: Pick<Stack, "name" | "image">[];
}

/* ── Marquee row ── */
function MarqueeRow({
    items,
    reverse = false,
}: {
    items: Pick<Stack, "name" | "image">[];
    reverse?: boolean;
}) {
    // Triplicate so the loop is seamless at any viewport width
    const repeated = [...items, ...items, ...items];

    return (
        <div className="overflow-hidden">
            <div
                className={`flex gap-4 w-full ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
            >
                {repeated.map((item, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 flex flex-col items-center justify-center gap-2.5 w-28 h-28 border border-white/5 bg-white/[0.02] hover:border-[#c8b97a]/30 hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        ) : (
                            <span
                                className="font-syne font-bold text-[#2a2a2a] group-hover:text-[#c8b97a] transition-colors duration-300 text-center leading-tight px-1"
                                style={{ fontSize: "clamp(9px, 1.2vw, 13px)" }}
                            >
                                {item.name}
                            </span>
                        )}
                        <span className="font-dm-sans text-[9px] text-[#2a2a2a] tracking-[0.08em] uppercase group-hover:text-[#555] transition-colors duration-300 text-center truncate w-full px-2">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home({ skills, stacks }: Props) {
    const [loaded, setLoaded] = useState(false);

    const revealed = (delay: string) =>
        `transition-all duration-700 ${delay} ${
            loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none"
        }`;

    // Skills grouped for the text-based section
    const skillGroups =
        skills.length > 0
            ? (() => {
                  const ordered = CATEGORY_ORDER.reduce<
                      { category: string; skills: string[] }[]
                  >((acc, cat) => {
                      const group = skills
                          .filter((s) => s.category === cat)
                          .map((s) => s.name);
                      if (group.length)
                          acc.push({ category: cat, skills: group });
                      return acc;
                  }, []);
                  const extra = [
                      ...new Set(skills.map((s) => s.category)),
                  ].filter((c) => !CATEGORY_ORDER.includes(c));
                  extra.forEach((cat) =>
                      ordered.push({
                          category: cat,
                          skills: skills
                              .filter((s) => s.category === cat)
                              .map((s) => s.name),
                      }),
                  );
                  return ordered;
              })()
            : STATIC_STACK;

    // Split stacks into two rows for the dual-marquee
    const half = Math.ceil(stacks.length / 2);
    const rowA = stacks.length > 0 ? stacks.slice(0, half) : [];
    const rowB = stacks.length > 0 ? stacks.slice(half) : [];

    return (
        <Guest fullScreen>
            <Head title="Jhovanie Flores — FullStack Developer" />
            <Loading onComplete={() => setLoaded(true)} />

            {/* ── Hero ── */}
            <section className="relative min-h-screen bg-[#0e0e0e] flex flex-col justify-end px-8 md:px-14 pb-16 overflow-hidden">
                <span
                    className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 font-extrabold select-none pointer-events-none leading-none tracking-[-0.06em]"
                    style={{
                        fontSize: "clamp(180px, 30vw, 400px)",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                    }}
                >
                    JF
                </span>

                <div
                    className={`flex items-center gap-4 font-dm-sans text-[11px] font-light text-[#c8b97a] tracking-[0.25em] uppercase mb-5 ${revealed("delay-300")}`}
                >
                    <span className="block w-8 h-px bg-[#c8b97a]" />
                    Available for work · 2026
                </div>

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
                        <a
                            href="https://github.com/jhovanie14"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-9 h-9 border border-white/10 text-[#555] no-underline hover:border-white/20 hover:text-[#e8e2d4] transition-all duration-200"
                            aria-label="GitHub profile"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div
                    className={`absolute bottom-10 left-8 md:left-14 flex items-center gap-3 font-dm-sans text-[11px] text-[#333] tracking-[0.12em] uppercase ${revealed("delay-[900ms]")}`}
                >
                    <span className="block w-10 h-px bg-[#333]" />
                    Scroll down
                </div>

                <div
                    className={`absolute bottom-10 right-8 md:right-14 flex items-center gap-2 font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase ${revealed("delay-[1000ms]")}`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to opportunities
                </div>
            </section>

            {/* ── Stack marquee (shown when stacks exist) ── */}
            {stacks.length > 0 && (
                <section className="py-20 border-t border-white/5 overflow-hidden">
                    <div className="px-8 md:px-14 mb-10 flex items-end justify-between gap-4">
                        <div>
                            <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                                <span className="block w-6 h-px bg-[#c8b97a]" />
                                Technologies
                            </span>
                            <h2
                                className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                            >
                                What I build with
                            </h2>
                        </div>
                        <Link
                            href={route("skills")}
                            className="flex-shrink-0 font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase no-underline hover:text-[#c8b97a] transition-colors duration-200 flex items-center gap-2 group"
                        >
                            Full skill set
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    <div className="flex">
                        {rowA.length > 0 && <MarqueeRow items={rowA} />}
                        {/* {rowB.length > 0 && <MarqueeRow items={rowB} reverse />} */}
                    </div>
                </section>
            )}

            {/* {stacks.length === 0 && (
                <section className="px-8 md:px-14 py-24 border-t border-white/5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
                        <div>
                            <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                                <span className="block w-6 h-px bg-[#c8b97a]" />
                                Tech stack
                            </span>
                            <h2
                                className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
                            >
                                What I build with
                            </h2>
                        </div>
                        <Link
                            href={route("skills")}
                            className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase no-underline hover:text-[#c8b97a] transition-colors duration-200 flex items-center gap-2 group self-start md:self-auto"
                        >
                            Full skill set
                            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                        {skillGroups.map((group) => (
                            <div key={group.category} className="bg-[#0e0e0e] p-8">
                                <p className="font-dm-sans text-[10px] text-[#333] tracking-[0.25em] uppercase mb-6">
                                    {group.category}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((name) => (
                                        <span
                                            key={name}
                                            className="font-dm-sans text-[12px] text-[#666] font-light border border-white/5 px-3 py-1.5 hover:border-[#c8b97a]/30 hover:text-[#c8b97a] transition-all duration-200 cursor-default"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )} */}
        </Guest>
    );
}

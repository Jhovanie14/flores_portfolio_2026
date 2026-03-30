import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import Guest from "@/Layouts/GuestLayout";
import Loading from "@/Components/Loading";
import { useState } from "react";

const STATS = [
    { value: "3+", label: "Years experience" },
    { value: "20+", label: "Projects delivered" },
    { value: "15+", label: "Happy clients" },
    { value: "∞", label: "Cups of coffee" },
];

export default function About({}: PageProps) {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            <Head title="About — Jhovanie Flores" />
            <Loading onComplete={() => setLoaded(true)} />
            <Guest>
                <div className="px-8 md:px-14 pb-32">
                    {/* Page header */}
                    <div className="mb-20 border-b border-white/5 pb-16">
                        <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                            <span className="block w-6 h-px bg-[#c8b97a]" />{" "}
                            About me
                        </span>
                        <h1
                            className="font-extrabold text-[#e8e2d4] leading-normal tracking-[-0.03em]"
                            style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
                        >
                            The person
                            <br />
                            <span
                                style={{
                                    color: "transparent",
                                    WebkitTextStroke: "1.5px #e8e2d4",
                                }}
                            >
                                behind it
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        {/* Left — bio */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-5 font-dm-sans text-[15px] text-[#666] font-light leading-[1.8]">
                                <p>
                                    I'm a frontend developer and designer based
                                    in the Philippines with a passion for
                                    building products that feel as good as they
                                    look.
                                </p>
                                <p>
                                    My stack centers around{" "}
                                    <span className="text-[#e8e2d4]">
                                        React
                                    </span>
                                    ,{" "}
                                    <span className="text-[#e8e2d4]">
                                        TypeScript
                                    </span>
                                    , and{" "}
                                    <span className="text-[#e8e2d4]">
                                        Laravel
                                    </span>{" "}
                                    — but I adapt to whatever the project
                                    demands.
                                </p>
                                <p>
                                    When I'm not building, I'm exploring design
                                    trends, contributing to open source, or
                                    brewing a fresh batch of coffee.
                                </p>
                            </div>

                            <Link
                                href={route("contact")}
                                className="inline-flex items-center gap-3 mt-4 font-syne text-[11px] font-bold tracking-[0.18em] uppercase text-[#c8b97a] no-underline hover:gap-5 transition-all duration-300 group w-fit"
                            >
                                Get in touch
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {STATS.map((s) => (
                                    <div
                                        key={s.label}
                                        className="border border-white/5 p-5"
                                    >
                                        <div
                                            className="font-extrabold text-[#c8b97a] leading-none tracking-[-0.03em] mb-2"
                                            style={{
                                                fontSize:
                                                    "clamp(28px, 4vw, 44px)",
                                            }}
                                        >
                                            {s.value}
                                        </div>
                                        <div className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — photo placeholder */}
                        <div className="relative w-full aspect-[4/5] bg-[#161616] border border-white/5 overflow-hidden">
                           <img src="/favicon.ico" alt="Jhovanie Flores" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-end p-6">
                                <span className="font-dm-sans text-[11px] text-[#2a2a2a] tracking-[0.08em]">
                                    Replace with &lt;img&gt; tag
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#c8b97a]/30" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#c8b97a]/30" />
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
}

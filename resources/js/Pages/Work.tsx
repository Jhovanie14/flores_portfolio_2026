import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import Loading from "@/Components/Loading";

const PROJECTS = [
    {
        number: "01",
        title: "E-Commerce Platform",
        tags: ["React", "Laravel", "Tailwind"],
        desc: "Full-stack e-commerce solution with real-time inventory, payment integration, and an admin dashboard.",
        year: "2024",
        link: "#",
    },
    {
        number: "02",
        title: "SaaS Dashboard",
        tags: ["Next.js", "TypeScript", "Prisma"],
        desc: "Analytics dashboard with live charts, user management, and role-based access control.",
        year: "2024",
        link: "#",
    },
    {
        number: "03",
        title: "Portfolio CMS",
        tags: ["Laravel", "Inertia", "React"],
        desc: "Custom headless CMS built for creative professionals with drag-and-drop page building.",
        year: "2023",
        link: "#",
    },
    {
        number: "04",
        title: "Mobile Banking UI",
        tags: ["React Native", "Figma", "API"],
        desc: "UI/UX design and frontend implementation for a fintech mobile application.",
        year: "2023",
        link: "#",
    },
];

export default function Work() {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            <Head title="Work — Jhovanie Flores" />

              <Loading onComplete={() => setLoaded(true)} />
            <Guest>
                <div className="px-8 md:px-14 pb-32">
                    {/* Page header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 border-b border-white/5 pb-16">
                        <div>
                            <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                                <span className="block w-6 h-px bg-[#c8b97a]" />{" "}
                                Selected work
                            </span>
                            <h1
                                className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
                            >
                                Projects
                            </h1>
                        </div>
                        <p className="font-dm-sans text-sm text-[#555] font-light max-w-xs leading-relaxed mt-6 md:mt-0">
                            A selection of work I've built — from concept to
                            deployment.
                        </p>
                    </div>

                    {/* Projects */}
                    <div className="flex flex-col">
                        {PROJECTS.map((p, i) => (
                            <ProjectRow key={p.number} project={p} index={i} />
                        ))}
                    </div>
                </div>
            </Guest>
        </>
    );
}

function ProjectRow({
    project,
    index,
}: {
    project: (typeof PROJECTS)[0];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={project.link}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-t border-white/5 no-underline cursor-pointer hover:border-[#c8b97a]/30 transition-all duration-300"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Left */}
            <div className="flex items-start md:items-center gap-6 md:gap-10">
                <span className="font-dm-sans text-[11px] text-[#2a2a2a] tracking-[0.1em] mt-1 md:mt-0 min-w-[24px]">
                    {project.number}
                </span>
                <div>
                    <h2
                        className={`font-extrabold tracking-[-0.02em] leading-none transition-colors duration-300 ${hovered ? "text-[#c8b97a]" : "text-[#e8e2d4]"}`}
                        style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
                    >
                        {project.title}
                    </h2>
                    <p className="font-dm-sans text-sm text-[#555] font-light mt-2 leading-relaxed max-w-md">
                        {project.desc}
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:items-end gap-3 mt-5 md:mt-0 ml-10 md:ml-6 shrink-0">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                        <span
                            key={t}
                            className="font-dm-sans text-[10px] text-[#444] tracking-[0.1em] uppercase border border-[#222] px-2.5 py-1"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-dm-sans text-[11px] text-[#333]">
                        {project.year}
                    </span>
                    <span
                        className={`text-[#c8b97a] transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}
                    >
                        →
                    </span>
                </div>
            </div>
        </a>
    );
}

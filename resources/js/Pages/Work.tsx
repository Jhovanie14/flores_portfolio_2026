import { useState } from "react";
import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import Loading from "@/Components/Loading";
import { Project } from "@/types";

interface Props {
    projects: Project[];
}

export default function Work({ projects }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);

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
                        {projects.length > 0 ? (
                            projects.map((p, i) => (
                                <ProjectRow
                                    key={p.id}
                                    project={p}
                                    index={i}
                                    onClick={() => setSelected(p)}
                                />
                            ))
                        ) : (
                            <p className="font-dm-sans text-sm text-[#333] tracking-[0.05em] text-center py-20">
                                Projects coming soon.
                            </p>
                        )}
                    </div>
                </div>
            </Guest>

            {/* Project detail dialog */}
            {selected && (
                <ProjectDetail
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
}

/* ─── Project Row ─── */

function ProjectRow({
    project,
    index,
    onClick,
}: {
    project: Project;
    index: number;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const number = String(index + 1).padStart(2, "0");
    const thumbnail = project.images?.[0];

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-t border-white/5 cursor-pointer hover:border-[#c8b97a]/30 transition-all duration-300 bg-transparent border-l-0 border-r-0 border-b-0 text-left w-full"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Left */}
            <div className="flex items-start md:items-center gap-6 md:gap-10 min-w-0 md:flex-1">
                <span className="font-dm-sans text-[11px] text-[#2a2a2a] tracking-[0.1em] mt-1 md:mt-0 min-w-[24px]">
                    {number}
                </span>

                {/* Thumbnail */}
                {thumbnail && (
                    <div className="hidden md:block w-16 h-12 bg-white/[0.02] border border-white/5 overflow-hidden flex-shrink-0">
                        <img
                            src={thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <h2
                        className={`font-extrabold tracking-[-0.02em] leading-none transition-colors duration-300 break-words ${hovered ? "text-[#c8b97a]" : "text-[#e8e2d4]"}`}
                        style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
                    >
                        {project.title}
                    </h2>
                    <p className="font-dm-sans text-sm text-[#555] font-light mt-2 leading-relaxed max-w-md">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:items-end gap-3 mt-5 md:mt-0 ml-10 md:ml-6 md:max-w-[45%] w-full md:w-auto min-w-0">
                <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.tags?.map((t) => (
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
        </button>
    );
}

/* ─── Project Detail Dialog ─── */

function ProjectDetail({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const images = project.images ?? [];
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center font-syne">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-[#0e0e0e]/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-4xl mx-4 bg-[#0a0a0a] border border-white/5 max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-[#555] hover:text-[#e8e2d4] transition-colors bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image gallery */}
                {images.length > 0 && (
                    <div className="border-b border-white/5">
                        {/* Main image */}
                        <div className="aspect-video bg-white/[0.02] overflow-hidden">
                            <img
                                src={images[activeImage]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-1.5 p-3 overflow-x-auto">
                                {images.map((src, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveImage(i)}
                                        className={`w-16 h-12 flex-shrink-0 overflow-hidden cursor-pointer border bg-transparent p-0 transition-all duration-200 ${
                                            i === activeImage
                                                ? "border-[#c8b97a] opacity-100"
                                                : "border-white/5 opacity-50 hover:opacity-80"
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-10">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3">
                            <span className="block w-6 h-px bg-[#c8b97a]" />
                            {project.year}
                        </span>
                    </div>

                    {/* Title */}
                    <h2
                        className="font-extrabold text-[#e8e2d4] leading-[0.95] tracking-[-0.03em] mb-6"
                        style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
                    >
                        {project.title}
                    </h2>

                    {/* Description */}
                    {project.description && (
                        <p className="font-dm-sans text-sm text-[#666] font-light leading-relaxed max-w-2xl mb-8">
                            {project.description}
                        </p>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((t) => (
                                <span
                                    key={t}
                                    className="font-dm-sans text-[10px] text-[#444] tracking-[0.1em] uppercase border border-[#222] px-3 py-1.5"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    {(project.link || project.github) && (
                        <div className="flex flex-wrap items-center gap-3">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-4 border border-[#333] text-[#e8e2d4] px-7 py-3.5 font-syne text-[11px] font-bold tracking-[0.18em] uppercase no-underline hover:bg-[#e8e2d4] hover:text-[#0e0e0e] hover:border-[#e8e2d4] transition-all duration-300 group"
                                >
                                    View project
                                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 border border-white/10 text-[#555] px-7 py-3.5 font-syne text-[11px] font-bold tracking-[0.18em] uppercase no-underline hover:border-white/20 hover:text-[#e8e2d4] transition-all duration-300 group"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProjectModal from "@/Components/ProjectModal";
import { Head, router } from "@inertiajs/react";
import { Project } from "@/types";
import { useState } from "react";

interface Props {
    projects: Project[];
}

export default function Projects({ projects }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);

    const openCreate = () => {
        setEditing(null);
        setShowModal(true);
    };

    const openEdit = (project: Project) => {
        setEditing(project);
        setShowModal(true);
    };

    const handleDelete = (project: Project) => {
        if (confirm(`Delete "${project.title}"?`)) {
            router.delete(route("admin.projects.destroy", project.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />

            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Portfolio
                </span>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                            Projects
                        </h1>
                        <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-1">
                            {projects.length} project{projects.length !== 1 && "s"} total
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-3 bg-[#e8e2d4] text-[#0e0e0e] px-6 py-3 font-syne text-[11px] font-bold tracking-[0.15em] uppercase border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 group"
                    >
                        Add project
                        <span className="transition-transform duration-300 group-hover:rotate-90">
                            +
                        </span>
                    </button>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-16 flex flex-col items-center justify-center gap-4">
                    <svg className="w-10 h-10 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <p className="font-dm-sans text-[13px] text-[#333] tracking-[0.05em]">
                        No projects yet. Add your first project to get started.
                    </p>
                    <button
                        onClick={openCreate}
                        className="mt-2 inline-flex items-center gap-2 border border-white/10 text-[#e8e2d4] px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase bg-transparent cursor-pointer hover:bg-white/5 transition-all duration-200"
                    >
                        Add project +
                    </button>
                </div>
            ) : (
                <div className="border border-white/5 overflow-hidden">
                    {/* Table header */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bg-white/[0.02] border-b border-white/5">
                        <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase">
                            Project
                        </span>
                        <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase w-20 text-center">
                            Year
                        </span>
                        <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase w-20 text-center">
                            Order
                        </span>
                        <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase w-24 text-center">
                            Status
                        </span>
                        <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase w-24 text-right">
                            Actions
                        </span>
                    </div>

                    {/* Table rows */}
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 md:gap-4 items-center px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors duration-200 group"
                        >
                            {/* Project info */}
                            <div className="min-w-0 flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-14 h-10 bg-white/[0.02] border border-white/5 overflow-hidden flex-shrink-0">
                                    {project.images && project.images.length > 0 ? (
                                        <img
                                            src={project.images[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-syne font-bold text-[#e8e2d4] text-sm tracking-[-0.01em] truncate">
                                        {project.title}
                                        {project.images && project.images.length > 0 && (
                                            <span className="font-dm-sans text-[9px] text-[#333] ml-2 font-normal">
                                                {project.images.length} img{project.images.length !== 1 && "s"}
                                            </span>
                                        )}
                                    </h3>
                                    <p className="font-dm-sans text-[11px] text-[#444] truncate mt-0.5">
                                        {project.description || "No description"}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {project.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-dm-sans text-[9px] text-[#555] tracking-[0.1em] uppercase border border-[#1e1e1e] px-2 py-0.5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Year */}
                            <span className="font-dm-sans text-[12px] text-[#555] w-20 text-center hidden md:block">
                                {project.year}
                            </span>

                            {/* Sort order */}
                            <span className="font-dm-sans text-[12px] text-[#333] w-20 text-center hidden md:block">
                                {project.sort_order}
                            </span>

                            {/* Status */}
                            <div className="w-24 hidden md:flex justify-center">
                                <span
                                    className={`inline-flex items-center gap-1.5 font-dm-sans text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border ${
                                        project.is_published
                                            ? "text-green-400 border-green-400/20"
                                            : "text-[#555] border-white/5"
                                    }`}
                                >
                                    <span
                                        className={`w-1 h-1 rounded-full ${
                                            project.is_published ? "bg-green-400" : "bg-[#333]"
                                        }`}
                                    />
                                    {project.is_published ? "Live" : "Draft"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="w-24 flex justify-end gap-1">
                                <button
                                    onClick={() => openEdit(project)}
                                    className="w-8 h-8 flex items-center justify-center text-[#444] hover:text-[#c8b97a] bg-transparent border-none cursor-pointer transition-colors duration-200"
                                    title="Edit"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(project)}
                                    className="w-8 h-8 flex items-center justify-center text-[#444] hover:text-red-400 bg-transparent border-none cursor-pointer transition-colors duration-200"
                                    title="Delete"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ProjectModal
                show={showModal}
                project={editing}
                onClose={() => setShowModal(false)}
            />
        </AuthenticatedLayout>
    );
}

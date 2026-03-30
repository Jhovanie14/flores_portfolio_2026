import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SkillModal from "@/Components/SkillModal";
import { Head, router } from "@inertiajs/react";
import { Skill } from "@/types";
import { useState } from "react";

interface Props {
    skills: Skill[];
}

const CATEGORY_ORDER = ["Frontend", "Backend", "Design & Tools"];

export default function Skills({ skills }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Skill | null>(null);

    const openCreate = () => {
        setEditing(null);
        setShowModal(true);
    };

    const openEdit = (skill: Skill) => {
        setEditing(skill);
        setShowModal(true);
    };

    const handleDelete = (skill: Skill) => {
        if (!confirm(`Delete "${skill.name}"?`)) return;
        router.delete(route("admin.skills.destroy", skill.id));
    };

    // Group skills by category in defined order
    const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
        acc[cat] = skills.filter((s) => s.category === cat);
        return acc;
    }, {});

    // Any skills with categories not in CATEGORY_ORDER go to "Other"
    const otherSkills = skills.filter((s) => !CATEGORY_ORDER.includes(s.category));
    if (otherSkills.length > 0) grouped["Other"] = otherSkills;

    return (
        <AuthenticatedLayout>
            <Head title="Skills" />

            {/* Header */}
            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Tech stack
                </span>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                            Skills
                        </h1>
                        <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-1">
                            {skills.length} skill{skills.length !== 1 && "s"} total
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-3 bg-[#e8e2d4] text-[#0e0e0e] px-6 py-3 font-syne text-[11px] font-bold tracking-[0.15em] uppercase border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 group"
                    >
                        Add skill
                        <span className="transition-transform duration-300 group-hover:rotate-90">+</span>
                    </button>
                </div>
            </div>

            {skills.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-16 flex flex-col items-center justify-center gap-4">
                    <svg className="w-10 h-10 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                    </svg>
                    <p className="font-dm-sans text-[13px] text-[#333] tracking-[0.05em]">
                        No skills yet. Start building your tech stack.
                    </p>
                    <button
                        onClick={openCreate}
                        className="mt-2 inline-flex items-center gap-2 border border-white/10 text-[#e8e2d4] px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase bg-transparent cursor-pointer hover:bg-white/5 transition-all duration-200"
                    >
                        Add skill +
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.entries(grouped).map(([category, group]) =>
                        group.length === 0 ? null : (
                            <div key={category} className="border border-white/5">
                                {/* Category header */}
                                <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                                    <span className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase">
                                        {category}
                                    </span>
                                    <span className="font-dm-sans text-[10px] text-[#2a2a2a] ml-2">
                                        ({group.length})
                                    </span>
                                </div>

                                {/* Skills */}
                                <div className="divide-y divide-white/[0.04]">
                                    {group.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="px-5 py-3.5 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors duration-150"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-dm-sans text-[13px] text-[#888] font-light truncate">
                                                        {skill.name}
                                                    </span>
                                                    <span className="font-dm-sans text-[10px] text-[#444] tracking-[0.05em] ml-2 flex-shrink-0">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="h-px bg-[#1a1a1a] relative overflow-hidden">
                                                    <div
                                                        className="absolute inset-y-0 left-0"
                                                        style={{
                                                            width: `${skill.level}%`,
                                                            background: "linear-gradient(90deg, #c8b97a, #e8e2d4)",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                                                <button
                                                    onClick={() => openEdit(skill)}
                                                    className="w-7 h-7 flex items-center justify-center text-[#444] hover:text-[#c8b97a] bg-transparent border-none cursor-pointer transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill)}
                                                    className="w-7 h-7 flex items-center justify-center text-[#444] hover:text-red-400 bg-transparent border-none cursor-pointer transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            <SkillModal
                show={showModal}
                skill={editing}
                onClose={() => setShowModal(false)}
            />
        </AuthenticatedLayout>
    );
}

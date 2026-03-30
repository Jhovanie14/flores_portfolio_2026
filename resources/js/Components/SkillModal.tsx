import { useForm } from "@inertiajs/react";
import { Skill } from "@/types";
import { useEffect } from "react";

interface Props {
    show: boolean;
    skill?: Skill | null;
    onClose: () => void;
}

const CATEGORIES = ["Frontend", "Backend", "Design & Tools"];

export default function SkillModal({ show, skill, onClose }: Props) {
    const isEditing = !!skill;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: "",
        category: CATEGORIES[0],
        level: 80,
        sort_order: 0,
    });

    useEffect(() => {
        if (!show) return;
        clearErrors();
        if (skill) {
            setData({
                name: skill.name,
                category: skill.category,
                level: skill.level,
                sort_order: skill.sort_order,
            });
        } else {
            reset();
        }
    }, [show, skill]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
        };
        if (isEditing) {
            put(route("admin.skills.update", skill!.id), options);
        } else {
            post(route("admin.skills.store"), options);
        }
    };

    if (!show) return null;

    const inputClass =
        "w-full bg-transparent border-b border-[#1e1e1e] py-3 font-dm-sans text-[14px] text-[#e8e2d4] placeholder-[#333] focus:outline-none focus:border-[#c8b97a] transition-colors duration-300";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />

            <div className="relative w-full max-w-md mx-4 bg-[#0a0a0a] border border-white/5">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div>
                        <span className="font-dm-sans text-[10px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-2 mb-1">
                            <span className="block w-4 h-px bg-[#c8b97a]" />
                            {isEditing ? "Edit" : "New"}
                        </span>
                        <h2 className="font-syne font-extrabold text-[#e8e2d4] text-lg tracking-[-0.02em]">
                            {isEditing ? "Edit skill" : "Add skill"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#e8e2d4] transition-colors bg-transparent border-none cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={submit} className="px-6 py-6 flex flex-col gap-5">
                    {/* Name */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="e.g. React / Next.js"
                            className={inputClass}
                            autoFocus
                        />
                        {errors.name && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-2 block">Category</label>
                        <div className="flex gap-2 flex-wrap">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setData("category", cat)}
                                    className={`font-dm-sans text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border cursor-pointer bg-transparent transition-all duration-200
                                        ${data.category === cat
                                            ? "border-[#c8b97a] text-[#c8b97a]"
                                            : "border-[#222] text-[#555] hover:border-white/10 hover:text-[#888]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        {errors.category && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.category}</p>}
                    </div>

                    {/* Level */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase">Proficiency</label>
                            <span className="font-dm-sans text-[11px] text-[#c8b97a]">{data.level}%</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={data.level}
                            onChange={(e) => setData("level", parseInt(e.target.value))}
                            className="w-full accent-[#c8b97a] bg-transparent cursor-pointer"
                        />
                        <div className="flex justify-between font-dm-sans text-[9px] text-[#2a2a2a] tracking-[0.05em] mt-1">
                            <span>Beginner</span>
                            <span>Expert</span>
                        </div>
                    </div>

                    {/* Sort order */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Sort order</label>
                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) => setData("sort_order", parseInt(e.target.value) || 0)}
                            className={inputClass}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-[#555] bg-transparent border border-white/5 cursor-pointer hover:text-[#e8e2d4] hover:border-white/10 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase bg-[#e8e2d4] text-[#0e0e0e] border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Saving..." : isEditing ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

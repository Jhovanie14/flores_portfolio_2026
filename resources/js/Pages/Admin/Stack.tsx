import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Stack } from "@/types";
import { useRef, useState } from "react";

interface Props {
    stacks: Stack[];
}

export default function StackPage({ stacks }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Stack | null>(null);

    const openCreate = () => { setEditing(null); setShowForm(true); };
    const openEdit   = (s: Stack) => { setEditing(s); setShowForm(true); };
    const closeForm  = () => { setEditing(null); setShowForm(false); };

    const handleDelete = (s: Stack) => {
        if (!confirm(`Delete "${s.name}"?`)) return;
        router.delete(route("admin.stack.destroy", s.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Stack" />

            {/* Header */}
            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Homepage
                </span>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                            Tech Stack
                        </h1>
                        <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-1">
                            {stacks.length} item{stacks.length !== 1 && "s"} · displayed as a marquee on the home page
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-3 bg-[#e8e2d4] text-[#0e0e0e] px-6 py-3 font-syne text-[11px] font-bold tracking-[0.15em] uppercase border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 group"
                    >
                        Add item
                        <span className="transition-transform duration-300 group-hover:rotate-90">+</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            {stacks.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-16 flex flex-col items-center justify-center gap-4">
                    <svg className="w-10 h-10 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                    </svg>
                    <p className="font-dm-sans text-[13px] text-[#333] tracking-[0.05em]">
                        No stack items yet. Add your first technology.
                    </p>
                    <button
                        onClick={openCreate}
                        className="mt-2 inline-flex items-center gap-2 border border-white/10 text-[#e8e2d4] px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase bg-transparent cursor-pointer hover:bg-white/5 transition-all duration-200"
                    >
                        Add item +
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {stacks.map((item) => (
                        <div
                            key={item.id}
                            className="group relative border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-200 aspect-square flex flex-col items-center justify-center gap-3 p-4"
                        >
                            {/* Image */}
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-contain"
                                />
                            ) : (
                                <div className="w-10 h-10 border border-white/5 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909" />
                                    </svg>
                                </div>
                            )}
                            <span className="font-dm-sans text-[11px] text-[#555] tracking-[0.05em] text-center truncate w-full text-center">
                                {item.name}
                            </span>

                            {/* Hover actions */}
                            <div className="absolute inset-0 bg-[#0a0a0a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#c8b97a] bg-transparent border border-white/10 cursor-pointer transition-colors"
                                    title="Edit"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-red-400 bg-transparent border border-white/10 cursor-pointer transition-colors"
                                    title="Delete"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>

                            {/* Sort order badge */}
                            <span className="absolute top-1.5 left-2 font-dm-sans text-[9px] text-[#2a2a2a]">
                                {item.sort_order}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showForm && (
                <StackFormModal
                    item={editing}
                    onClose={closeForm}
                />
            )}
        </AuthenticatedLayout>
    );
}

/* ── Inline form modal ── */

function StackFormModal({ item, onClose }: { item: Stack | null; onClose: () => void }) {
    const isEditing = !!item;
    const fileRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(item?.name ?? "");
    const [sortOrder, setSortOrder] = useState(item?.sort_order ?? 0);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(item?.image ?? null);
    const [processing, setProcessing] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const fd = new window.FormData();
        fd.append("name", name);
        fd.append("sort_order", String(sortOrder));
        if (file) fd.append("image", file);
        if (isEditing) fd.append("_method", "PUT");

        const url = isEditing
            ? route("admin.stack.update", item!.id)
            : route("admin.stack.store");

        router.post(url, fd, {
            forceFormData: true,
            onSuccess: () => { setProcessing(false); onClose(); },
            onError: () => setProcessing(false),
        });
    };

    const inputClass = "w-full bg-transparent border-b border-[#1e1e1e] py-3 font-dm-sans text-[14px] text-[#e8e2d4] placeholder-[#333] focus:outline-none focus:border-[#c8b97a] transition-colors duration-300";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative w-full max-w-sm mx-4 bg-[#0a0a0a] border border-white/5">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div>
                        <span className="font-dm-sans text-[10px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-2 mb-1">
                            <span className="block w-4 h-px bg-[#c8b97a]" />
                            {isEditing ? "Edit" : "New"}
                        </span>
                        <h2 className="font-syne font-extrabold text-[#e8e2d4] text-lg tracking-[-0.02em]">
                            {isEditing ? "Edit stack item" : "Add stack item"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#e8e2d4] transition-colors bg-transparent border-none cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={submit} className="px-6 py-6 flex flex-col gap-5">
                    {/* Image upload */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-2 block">Logo / Icon</label>
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-full border border-dashed border-white/10 bg-transparent py-5 flex flex-col items-center gap-2 cursor-pointer hover:border-[#c8b97a]/30 transition-colors duration-200 group"
                        >
                            {preview ? (
                                <img src={preview} alt="preview" className="w-12 h-12 object-contain" />
                            ) : (
                                <svg className="w-6 h-6 text-[#333] group-hover:text-[#c8b97a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                                </svg>
                            )}
                            <span className="font-dm-sans text-[10px] text-[#444] tracking-[0.1em] uppercase group-hover:text-[#555]">
                                {preview ? "Click to change" : "Upload logo"}
                            </span>
                            <span className="font-dm-sans text-[9px] text-[#2a2a2a]">PNG, SVG, WEBP · max 2MB</span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. React"
                            className={inputClass}
                            autoFocus
                            required
                        />
                    </div>

                    {/* Sort order */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Sort order</label>
                        <input
                            type="number"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                            className={inputClass}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-2">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-[#555] bg-transparent border border-white/5 cursor-pointer hover:text-[#e8e2d4] hover:border-white/10 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="px-6 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase bg-[#e8e2d4] text-[#0e0e0e] border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {processing ? "Saving..." : isEditing ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

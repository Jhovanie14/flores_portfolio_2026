import { router } from "@inertiajs/react";
import { Project } from "@/types";
import { useEffect, useRef, useState } from "react";

interface Props {
    show: boolean;
    project?: Project | null;
    onClose: () => void;
}

interface FormData {
    title: string;
    description: string;
    tags: string[];
    year: string;
    link: string;
    github: string;
    sort_order: number;
    is_published: boolean;
}

const defaultForm: FormData = {
    title: "",
    description: "",
    tags: [],
    year: new Date().getFullYear().toString(),
    link: "",
    github: "",
    sort_order: 0,
    is_published: true,
};

export default function ProjectModal({ show, project, onClose }: Props) {
    const isEditing = !!project;
    const tagInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tagInput, setTagInput] = useState("");
    const [form, setForm] = useState<FormData>(defaultForm);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (show && project) {
            setForm({
                title: project.title,
                description: project.description ?? "",
                tags: project.tags ?? [],
                year: project.year,
                link: project.link ?? "",
                github: project.github ?? "",
                sort_order: project.sort_order,
                is_published: project.is_published,
            });
            setExistingImages(project.images ?? []);
            setNewFiles([]);
            setNewPreviews([]);
            setErrors({});
        } else if (show && !project) {
            setForm(defaultForm);
            setExistingImages([]);
            setNewFiles([]);
            setNewPreviews([]);
            setErrors({});
        }
    }, [show, project]);

    // Clean up preview URLs
    useEffect(() => {
        return () => {
            newPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [newPreviews]);

    const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setForm((f) => ({ ...f, [key]: value }));
    };

    const addTag = (refocus = false) => {
        const tag = tagInput.trim();
        if (tag && !form.tags.includes(tag)) {
            setField("tags", [...form.tags, tag]);
        }
        setTagInput("");
        if (refocus) tagInputRef.current?.focus();
    };

    const removeTag = (tag: string) => {
        setField("tags", form.tags.filter((t) => t !== tag));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(true);
        }
        if (e.key === "Backspace" && !tagInput && form.tags.length > 0) {
            removeTag(form.tags[form.tags.length - 1]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setNewFiles((prev) => [...prev, ...files]);
        const previews = files.map((f) => URL.createObjectURL(f));
        setNewPreviews((prev) => [...prev, ...previews]);

        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        URL.revokeObjectURL(newPreviews[index]);
        setNewFiles((prev) => prev.filter((_, i) => i !== index));
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new window.FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        form.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
        formData.append("year", form.year);
        formData.append("link", form.link);
        formData.append("github", form.github);
        formData.append("sort_order", String(form.sort_order));
        formData.append("is_published", form.is_published ? "1" : "0");

        if (isEditing) {
            existingImages.forEach((img, i) =>
                formData.append(`existing_images[${i}]`, img),
            );
        }

        newFiles.forEach((file, i) => formData.append(`new_images[${i}]`, file));

        const url = isEditing
            ? route("admin.projects.update", project!.id)
            : route("admin.projects.store");

        if (isEditing) {
            formData.append("_method", "PUT");
        }

        router.post(url, formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
                onClose();
            },
            onError: (errs) => {
                setProcessing(false);
                setErrors(errs);
            },
        });
    };

    if (!show) return null;

    const inputClass =
        "w-full bg-transparent border-b border-[#1e1e1e] py-3 font-dm-sans text-[14px] text-[#e8e2d4] placeholder-[#333] focus:outline-none focus:border-[#c8b97a] transition-colors duration-300";

    const totalImages = existingImages.length + newPreviews.length;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />

            <div className="relative w-full max-w-2xl mx-4 bg-[#0a0a0a] border border-white/5 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                    <div>
                        <span className="font-dm-sans text-[10px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-2 mb-1">
                            <span className="block w-4 h-px bg-[#c8b97a]" />
                            {isEditing ? "Edit" : "New"}
                        </span>
                        <h2 className="font-syne font-extrabold text-[#e8e2d4] text-lg tracking-[-0.02em]">
                            {isEditing ? "Edit project" : "Add project"}
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
                    {/* Title */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setField("title", e.target.value)}
                            placeholder="Project title"
                            className={inputClass}
                            autoFocus
                        />
                        {errors.title && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setField("description", e.target.value)}
                            placeholder="Brief project description..."
                            rows={3}
                            className={`${inputClass} resize-none`}
                        />
                        {errors.description && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.description}</p>}
                    </div>

                    {/* Images */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-2 block">
                            Images {totalImages > 0 && `(${totalImages})`}
                        </label>

                        {/* Image grid */}
                        {totalImages > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                                {existingImages.map((src, i) => (
                                    <div key={`existing-${i}`} className="relative group aspect-[4/3] bg-white/[0.02] border border-white/5 overflow-hidden">
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(i)}
                                            className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-red-400 flex items-center justify-center text-[10px] border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {newPreviews.map((src, i) => (
                                    <div key={`new-${i}`} className="relative group aspect-[4/3] bg-white/[0.02] border border-[#c8b97a]/20 overflow-hidden">
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(i)}
                                            className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-red-400 flex items-center justify-center text-[10px] border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                        <span className="absolute bottom-1 left-1 font-dm-sans text-[8px] text-[#c8b97a] bg-black/70 px-1.5 py-0.5 uppercase tracking-widest">
                                            New
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border border-dashed border-white/10 bg-transparent py-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#c8b97a]/30 transition-colors duration-200 group"
                        >
                            <svg className="w-6 h-6 text-[#333] group-hover:text-[#c8b97a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                            <span className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase group-hover:text-[#555]">
                                Click to upload images
                            </span>
                            <span className="font-dm-sans text-[9px] text-[#2a2a2a] tracking-[0.05em]">
                                PNG, JPG, WEBP up to 5MB each
                            </span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        {errors['new_images'] && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors['new_images']}</p>}
                        {Object.keys(errors).filter(k => k.startsWith('new_images.')).map(k => (
                            <p key={k} className="font-dm-sans text-[11px] text-red-400 mt-1">{errors[k]}</p>
                        ))}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {form.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 font-dm-sans text-[10px] text-[#c8b97a] tracking-[0.1em] uppercase border border-[#c8b97a]/20 px-2.5 py-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-[#c8b97a]/50 hover:text-red-400 bg-transparent border-none cursor-pointer p-0 text-[12px] leading-none"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            ref={tagInputRef}
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            onBlur={() => addTag(false)}
                            placeholder="Type a tag and press Enter"
                            className={inputClass}
                        />
                    </div>

                    {/* Year + Link */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Year</label>
                            <input
                                type="text"
                                value={form.year}
                                onChange={(e) => setField("year", e.target.value)}
                                placeholder="2024"
                                maxLength={4}
                                className={inputClass}
                            />
                            {errors.year && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.year}</p>}
                        </div>
                        <div>
                            <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Live link</label>
                            <input
                                type="text"
                                value={form.link}
                                onChange={(e) => setField("link", e.target.value)}
                                placeholder="https://..."
                                className={inputClass}
                            />
                            {errors.link && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.link}</p>}
                        </div>
                    </div>

                    {/* GitHub repo */}
                    <div>
                        <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">GitHub repo</label>
                        <input
                            type="text"
                            value={form.github}
                            onChange={(e) => setField("github", e.target.value)}
                            placeholder="https://github.com/..."
                            className={inputClass}
                        />
                        {errors.github && <p className="font-dm-sans text-[11px] text-red-400 mt-1">{errors.github}</p>}
                    </div>

                    {/* Sort order + Published */}
                    <div className="grid grid-cols-2 gap-4 items-end">
                        <div>
                            <label className="font-dm-sans text-[10px] text-[#555] tracking-[0.15em] uppercase mb-1 block">Sort order</label>
                            <input
                                type="number"
                                value={form.sort_order}
                                onChange={(e) => setField("sort_order", parseInt(e.target.value) || 0)}
                                className={inputClass}
                            />
                        </div>
                        <div className="pb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.is_published}
                                    onChange={(e) => setField("is_published", e.target.checked)}
                                    className="w-3.5 h-3.5 bg-transparent border border-[#333] rounded-none text-[#c8b97a] focus:ring-[#c8b97a] focus:ring-offset-0 focus:ring-1"
                                />
                                <span className="font-dm-sans text-[11px] text-[#555] tracking-[0.1em] uppercase">Published</span>
                            </label>
                        </div>
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

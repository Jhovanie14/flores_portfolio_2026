import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Message } from "@/types";
import { useState } from "react";

interface Props {
    messages: Message[];
    unreadCount: number;
}

export default function Messages({ messages, unreadCount }: Props) {
    const [selected, setSelected] = useState<Message | null>(null);

    const handleMarkRead = (msg: Message) => {
        if (msg.read_at) return;
        router.patch(route("admin.messages.read", msg.id));
    };

    const handleDelete = (msg: Message) => {
        if (!confirm(`Delete message from "${msg.name}"?`)) return;
        router.delete(route("admin.messages.destroy", msg.id));
        if (selected?.id === msg.id) setSelected(null);
    };

    const openMessage = (msg: Message) => {
        setSelected(msg);
        if (!msg.read_at) {
            router.patch(route("admin.messages.read", msg.id), {}, { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Messages" />

            {/* Header */}
            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Inbox
                </span>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                            Messages
                        </h1>
                        <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-1">
                            {messages.length} total
                            {unreadCount > 0 && (
                                <span className="ml-2 inline-flex items-center gap-1 text-[#c8b97a]">
                                    · {unreadCount} unread
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-16 flex flex-col items-center justify-center gap-4">
                    <svg className="w-10 h-10 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p className="font-dm-sans text-[13px] text-[#333] tracking-[0.05em]">
                        No messages yet. Your inbox is empty.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
                    {/* Message list */}
                    <div className="border border-white/5 overflow-hidden">
                        {messages.map((msg) => {
                            const isUnread = !msg.read_at;
                            const isActive = selected?.id === msg.id;
                            return (
                                <button
                                    key={msg.id}
                                    type="button"
                                    onClick={() => openMessage(msg)}
                                    className={`w-full flex items-start gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 text-left bg-transparent cursor-pointer transition-all duration-200
                                        ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
                                >
                                    {/* Unread dot */}
                                    <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${isUnread ? "bg-[#c8b97a]" : "bg-transparent"}`} />

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className={`font-syne text-[13px] tracking-[-0.01em] truncate ${isUnread ? "font-bold text-[#e8e2d4]" : "font-normal text-[#888]"}`}>
                                                {msg.name}
                                            </span>
                                            <span className="font-dm-sans text-[10px] text-[#333] tracking-[0.05em] flex-shrink-0">
                                                {new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </span>
                                        </div>
                                        <p className="font-dm-sans text-[11px] text-[#555] tracking-[0.03em] truncate">
                                            {msg.email}
                                        </p>
                                        <p className="font-dm-sans text-[12px] text-[#444] font-light mt-1 line-clamp-1 leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Message detail */}
                    <div className="border border-white/5 bg-white/[0.01]">
                        {selected ? (
                            <div className="flex flex-col h-full">
                                {/* Detail header */}
                                <div className="px-6 py-5 border-b border-white/5 flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-syne font-bold text-[#e8e2d4] text-sm tracking-[-0.01em]">
                                            {selected.name}
                                        </h3>
                                        <a
                                            href={`mailto:${selected.email}`}
                                            className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.05em] no-underline hover:text-[#e8e2d4] transition-colors"
                                        >
                                            {selected.email}
                                        </a>
                                        <p className="font-dm-sans text-[10px] text-[#333] tracking-[0.05em] mt-1">
                                            {new Date(selected.created_at).toLocaleString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(selected)}
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#333] hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
                                        title="Delete message"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Message body */}
                                <div className="px-6 py-6 flex-1">
                                    <p className="font-dm-sans text-sm text-[#888] font-light leading-[1.9] whitespace-pre-wrap">
                                        {selected.message}
                                    </p>
                                </div>

                                {/* Reply action */}
                                <div className="px-6 py-5 border-t border-white/5">
                                    <a
                                        href={`mailto:${selected.email}?subject=Re: Your message`}
                                        className="inline-flex items-center gap-3 border border-[#333] text-[#e8e2d4] px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase no-underline hover:bg-[#e8e2d4] hover:text-[#0e0e0e] hover:border-[#e8e2d4] transition-all duration-300 group"
                                    >
                                        Reply via email
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center gap-3">
                                <svg className="w-8 h-8 text-[#1e1e1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <p className="font-dm-sans text-[11px] text-[#2a2a2a] tracking-[0.1em]">
                                    Select a message to read
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

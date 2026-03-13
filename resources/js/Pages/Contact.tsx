import { useState } from "react";
import { Head } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Guest from "@/Layouts/GuestLayout";
import Loading from "@/Components/Loading";

const SOCIALS = [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Threads", href: "https://threads.com" },
];

export default function Contact({}: PageProps) {
    const [loaded, setLoaded] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const { props } = usePage<PageProps & { flash: { success?: string } }>();
    const success = props.flash?.success;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("contact.send"), { onSuccess: () => reset() });
    };

    const inputClass =
        "w-full bg-transparent border-b border-[#1e1e1e] py-3.5 font-dm-sans text-[14px] text-[#e8e2d4] placeholder-[#333] focus:outline-none focus:border-[#c8b97a] transition-colors duration-300";

    return (
        <>
            <Head title="Contact — John Doe" />
            <Loading onComplete={() => setLoaded(true)} />
            <Guest>
                <div className="px-8 md:px-14 pb-32">
                    {/* Page header */}
                    <div className="mb-20 border-b border-white/5 pb-16">
                        <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                            <span className="block w-6 h-px bg-[#c8b97a]" /> Get
                            in touch
                        </span>
                        <h1
                            className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                            style={{ fontSize: "clamp(48px, 8vw, 100px)" }}
                        >
                            Let's build
                            <br />
                            <span
                                style={{
                                    color: "transparent",
                                    WebkitTextStroke: "1.5px #e8e2d4",
                                }}
                            >
                                something great
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        {/* Left — info */}
                        <div className="flex flex-col gap-6">
                            <p className="font-dm-sans text-sm text-[#555] font-light leading-relaxed max-w-xs">
                                I'm currently open to new projects and full-time
                                opportunities. Whether you have a question or
                                just want to say hi — my inbox is always open.
                            </p>
                            <div className="flex flex-col gap-2 mt-2">
                                <a
                                    href="mailto:hello@johndoe.com"
                                    className="font-syne text-[13px] font-bold tracking-[0.1em] text-[#c8b97a] no-underline hover:text-[#e8e2d4] transition-colors duration-200"
                                >
                                    connect.jhovanie@gmail.com
                                </a>
                                <span className="font-dm-sans text-[12px] text-[#444] tracking-[0.05em]">
                                    +63 9192903551
                                </span>
                            </div>
                            <div className="flex gap-6 mt-4">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase no-underline hover:text-[#e8e2d4] transition-colors duration-200"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 mt-6 border border-white/5 px-4 py-3 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase">
                                    Philippines · Open to remote
                                </span>
                            </div>
                        </div>

                        {/* Right — form */}
                        <div>
                            {success ? (
                                <div className="flex flex-col gap-4">
                                    <span
                                        className="font-extrabold text-[#c8b97a] tracking-[-0.02em]"
                                        style={{
                                            fontSize: "clamp(28px, 4vw, 48px)",
                                        }}
                                    >
                                        Message sent.
                                    </span>
                                    <p className="font-dm-sans text-sm text-[#555] font-light leading-relaxed">
                                        Thanks for reaching out! I'll get back
                                        to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-8"
                                >
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                        {errors.name && (
                                            <p className="font-dm-sans text-[11px] text-red-400 mt-2">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                        {errors.email && (
                                            <p className="font-dm-sans text-[11px] text-red-400 mt-2">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Tell me about your project..."
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value,
                                                )
                                            }
                                            rows={5}
                                            className={`${inputClass} resize-none`}
                                        />
                                        {errors.message && (
                                            <p className="font-dm-sans text-[11px] text-red-400 mt-2">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="self-start inline-flex items-center gap-4 bg-[#e8e2d4] text-[#0e0e0e] px-8 py-4 font-syne text-[11px] font-bold tracking-[0.18em] uppercase border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {processing
                                            ? "Sending..."
                                            : "Send message"}
                                        {!processing && (
                                            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                                →
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
}

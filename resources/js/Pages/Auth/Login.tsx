import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const inputClass =
        "w-full bg-transparent border-b border-[#1e1e1e] py-3.5 font-dm-sans text-[14px] text-[#e8e2d4] placeholder-[#333] focus:outline-none focus:border-[#c8b97a] transition-colors duration-300";

    return (
        <div className="min-h-screen bg-[#0e0e0e] font-syne text-[#e8e2d4] flex items-center justify-center px-6">
            <Head title="Login" />

            <div className="w-full max-w-md">
                {/* Brand */}
                <Link
                    href={route("home")}
                    className="text-sm font-extrabold tracking-[0.2em] uppercase text-[#e8e2d4] no-underline inline-block mb-16"
                >
                    Jhov<span className="text-[#c8b97a]">.</span>
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-4">
                        <span className="block w-6 h-px bg-[#c8b97a]" />
                        Admin access
                    </span>
                    <h1
                        className="font-extrabold text-[#e8e2d4] leading-[0.92] tracking-[-0.03em]"
                        style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
                    >
                        Welcome
                        <br />
                        <span
                            style={{
                                color: "transparent",
                                WebkitTextStroke: "1.5px #e8e2d4",
                            }}
                        >
                            back
                        </span>
                    </h1>
                </div>

                {status && (
                    <div className="mb-6 font-dm-sans text-[13px] text-green-400 tracking-[0.05em]">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            className={inputClass}
                        />
                        {errors.email && (
                            <p className="font-dm-sans text-[11px] text-red-400 mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={inputClass}
                        />
                        {errors.password && (
                            <p className="font-dm-sans text-[11px] text-red-400 mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="w-3.5 h-3.5 bg-transparent border border-[#333] rounded-none text-[#c8b97a] focus:ring-[#c8b97a] focus:ring-offset-0 focus:ring-1"
                            />
                            <span className="font-dm-sans text-[11px] text-[#555] tracking-[0.1em] uppercase">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="font-dm-sans text-[11px] text-[#555] tracking-[0.1em] uppercase no-underline hover:text-[#c8b97a] transition-colors duration-200"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-4 bg-[#e8e2d4] text-[#0e0e0e] px-8 py-4 font-syne text-[11px] font-bold tracking-[0.18em] uppercase border-none cursor-pointer hover:bg-[#c8b97a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group mt-4"
                    >
                        {processing ? "Signing in..." : "Sign in"}
                        {!processing && (
                            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                →
                            </span>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <Link
                        href={route("home")}
                        className="font-dm-sans text-[11px] text-[#333] tracking-[0.1em] uppercase no-underline hover:text-[#555] transition-colors duration-200 flex items-center gap-2"
                    >
                        <span>←</span> Back to portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}

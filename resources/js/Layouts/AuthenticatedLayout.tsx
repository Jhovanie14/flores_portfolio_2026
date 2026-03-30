import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

export default function Authenticated({ children }: PropsWithChildren) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0e0e0e] font-syne text-[#e8e2d4]">
            <Sidebar
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed((c) => !c)}
                mobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
            />

            {/* Main content */}
            <div
                className={`transition-all duration-300 ease-in-out ${collapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}`}
            >
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 lg:px-10">
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
                        aria-label="Toggle menu"
                    >
                        <span className="block h-px w-5 bg-[#e8e2d4]" />
                        <span className="block h-px w-5 bg-[#e8e2d4]" />
                        <span className="block h-px w-5 bg-[#e8e2d4]" />
                    </button>

                    {/* Spacer */}
                    <div className="hidden lg:block" />

                    {/* Right section */}
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("home")}
                            className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase no-underline hover:text-[#e8e2d4] transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            View site
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6 lg:p-10">{children}</main>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

const NAV_LINKS = [
    { label: "Home", routeName: "home" },
    { label: "Work", routeName: "work" },
    { label: "About", routeName: "about" },
    { label: "Skills", routeName: "skills" },
    { label: "Contact", routeName: "contact" },
];

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [url]);

    const isActive = (routeName: string) => {
        try {
            return (
                url === route(routeName) ||
                url.startsWith(route(routeName) + "/")
            );
        } catch {
            return false;
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                ${
                    scrolled
                        ? "py-4 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/5"
                        : "py-8"
                }`}
        >
            <div className="flex justify-between items-center px-8 md:px-14">
                {/* Logo */}
                <Link
                    href={route("home")}
                    className="text-sm font-extrabold tracking-[0.2em] uppercase text-[#e8e2d4] no-underline"
                >
                    Jhov<span className="text-[#c8b97a]">.</span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex gap-10 list-none">
                    {NAV_LINKS.map((l) => (
                        <li key={l.label}>
                            <Link
                                href={route(l.routeName)}
                                className={`font-dm-sans text-[11px] tracking-[0.12em] uppercase no-underline transition-colors duration-200
                                    ${
                                        isActive(l.routeName)
                                            ? "text-[#e8e2d4]"
                                            : "text-[#555] hover:text-[#e8e2d4]"
                                    }`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hire me CTA */}
                <Link
                    href={route("contact")}
                    className="hidden md:inline-flex items-center gap-2 border border-[#333] text-[#e8e2d4] px-5 py-2 font-syne text-[11px] font-bold tracking-[0.15em] uppercase no-underline hover:bg-[#e8e2d4] hover:text-[#0e0e0e] hover:border-[#e8e2d4] transition-all duration-300"
                >
                    Hire me
                </Link>

                {/* Hamburger (mobile) */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-px w-6 bg-[#e8e2d4] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                    />
                    <span
                        className={`block h-px w-6 bg-[#e8e2d4] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                    />
                    <span
                        className={`block h-px w-6 bg-[#e8e2d4] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                    />
                </button>
            </div>

            {/* Mobile drawer */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="flex flex-col px-8 pb-6 pt-4 gap-6 list-none border-t border-white/5 mt-4">
                    {NAV_LINKS.map((l) => (
                        <li key={l.label}>
                            <Link
                                href={route(l.routeName)}
                                className={`font-dm-sans text-sm tracking-[0.12em] uppercase no-underline transition-colors duration-200
                                    ${
                                        isActive(l.routeName)
                                            ? "text-[#e8e2d4]"
                                            : "text-[#888] hover:text-[#e8e2d4]"
                                    }`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href={route("contact")}
                            className="text-[#c8b97a] font-syne text-sm font-bold tracking-[0.15em] uppercase no-underline"
                        >
                            Hire me →
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

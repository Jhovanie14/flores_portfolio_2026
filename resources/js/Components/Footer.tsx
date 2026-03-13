import { Link } from "@inertiajs/react";

const LINKS = [
    { label: "Work", routeName: "work" },
    { label: "About", routeName: "about" },
    { label: "Skills", routeName: "skills" },
    { label: "Contact", routeName: "contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="px-8 md:px-14 py-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                {/* Brand */}
                <Link
                    href={route("home")}
                    className="text-sm font-extrabold tracking-[0.2em] uppercase text-[#e8e2d4] no-underline"
                >
                    Jhov<span className="text-[#c8b97a]">.</span>
                </Link>

                {/* Links */}
                <ul className="flex flex-wrap gap-6 list-none">
                    {LINKS.map((l) => (
                        <li key={l.label}>
                            <Link
                                href={route(l.routeName)}
                                className="font-dm-sans text-[11px] text-[#444] tracking-[0.1em] uppercase no-underline hover:text-[#e8e2d4] transition-colors duration-200"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Copyright */}
                <span className="font-dm-sans text-[11px] text-[#2a2a2a] tracking-[0.08em]">
                    © {year} Jhovanie Flores
                </span>
            </div>
        </footer>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { DashboardStats, PageProps } from "@/types";

interface Props extends PageProps {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: Props) {
    const statCards = [
        {
            label: "Projects",
            value: stats.projects,
            sub: "Total works",
            href: route("admin.projects"),
        },
        {
            label: "Messages",
            value: stats.messages,
            sub: stats.unread > 0 ? `${stats.unread} unread` : "Inbox",
            href: route("admin.messages"),
            highlight: stats.unread > 0,
        },
        {
            label: "Skills",
            value: stats.skills,
            sub: "Listed",
            href: route("admin.skills"),
        },
        {
            label: "Visitors",
            value: "—",
            sub: "This month",
            href: null,
        },
    ];

    const quickActions = [
        {
            title: "Add project",
            desc: "Showcase new work in your portfolio",
            href: route("admin.projects"),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            ),
        },
        {
            title: "Update skills",
            desc: "Keep your tech stack up to date",
            href: route("admin.skills"),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                </svg>
            ),
        },
        {
            title: "View messages",
            desc: stats.unread > 0
                ? `${stats.unread} unread message${stats.unread !== 1 ? "s" : ""}`
                : "Check your contact form inbox",
            href: route("admin.messages"),
            badge: stats.unread > 0 ? stats.unread : undefined,
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            ),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Page header */}
            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Overview
                </span>
                <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                    Dashboard
                </h1>
                <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-2">
                    Manage your portfolio content from here.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {statCards.map((stat) => {
                    const body = (
                        <>
                            <p className="font-dm-sans text-[10px] text-[#555] tracking-[0.2em] uppercase mb-3">
                                {stat.label}
                            </p>
                            <p className={`font-extrabold text-3xl tracking-[-0.02em] ${stat.highlight ? "text-[#c8b97a]" : "text-[#e8e2d4]"}`}>
                                {stat.value}
                            </p>
                            <p className={`font-dm-sans text-[11px] tracking-[0.1em] mt-1 ${stat.highlight ? "text-[#c8b97a]" : "text-[#333]"}`}>
                                {stat.sub}
                            </p>
                        </>
                    );
                    return stat.href ? (
                        <Link key={stat.label} href={stat.href} className="border border-white/5 bg-white/[0.02] p-6 no-underline hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                            {body}
                        </Link>
                    ) : (
                        <div key={stat.label} className="border border-white/5 bg-white/[0.02] p-6">
                            {body}
                        </div>
                    );
                })}
            </div>

            {/* Quick actions */}
            <div className="mb-12">
                <h2 className="font-syne text-[13px] font-bold text-[#e8e2d4] tracking-[0.1em] uppercase mb-5">
                    Quick actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="flex items-start gap-4 border border-white/5 p-5 no-underline hover:border-[#c8b97a]/30 hover:bg-white/[0.02] transition-all duration-300 group"
                        >
                            <span className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-[#555] group-hover:text-[#c8b97a] group-hover:border-[#c8b97a]/30 transition-all duration-300">
                                {action.icon}
                            </span>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-syne text-[12px] font-bold text-[#e8e2d4] tracking-[0.08em] uppercase">
                                        {action.title}
                                    </p>
                                    {action.badge && (
                                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#c8b97a] text-[#0e0e0e] font-syne font-bold text-[9px] rounded-full">
                                            {action.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="font-dm-sans text-[11px] text-[#444] tracking-[0.05em] mt-1">
                                    {action.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* View site banner */}
            <div className="border border-white/5 bg-white/[0.01] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <p className="font-syne text-[13px] font-bold text-[#e8e2d4] tracking-[0.08em] uppercase mb-1">
                        Your portfolio is live
                    </p>
                    <p className="font-dm-sans text-[12px] text-[#444] tracking-[0.05em]">
                        Changes you make here are reflected immediately on the public site.
                    </p>
                </div>
                <Link
                    href={route("home")}
                    className="flex-shrink-0 inline-flex items-center gap-3 border border-[#333] text-[#e8e2d4] px-5 py-2.5 font-syne text-[11px] font-bold tracking-[0.15em] uppercase no-underline hover:bg-[#e8e2d4] hover:text-[#0e0e0e] hover:border-[#e8e2d4] transition-all duration-300 group"
                >
                    View site
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}

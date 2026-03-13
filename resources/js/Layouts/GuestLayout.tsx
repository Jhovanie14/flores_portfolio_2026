import { ReactNode } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
// import Footer from "@/Components/Footer";

interface Props {
    children: ReactNode;
    fullScreen?: boolean; // for pages that don't need padding (e.g. welcome)
}

export default function Guest({ children, fullScreen }: Props) {
    return (
        <>
            <div className="min-h-screen bg-[#0e0e0e] font-syne text-[#e8e2d4]">
                <Navbar />
                <main className={fullScreen ? "" : "pt-24"}>{children}</main>
                <Footer />
            </div>
        </>
    );
}

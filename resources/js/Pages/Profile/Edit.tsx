import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            <div className="mb-10">
                <span className="font-dm-sans text-[11px] text-[#c8b97a] tracking-[0.25em] uppercase flex items-center gap-3 mb-3">
                    <span className="block w-6 h-px bg-[#c8b97a]" />
                    Account
                </span>
                <h1 className="font-extrabold text-[#e8e2d4] text-2xl md:text-3xl tracking-[-0.02em]">
                    Settings
                </h1>
                <p className="font-dm-sans text-[13px] text-[#444] tracking-[0.05em] mt-2">
                    Manage your account and preferences.
                </p>
            </div>

            <div className="max-w-2xl space-y-8">
                <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

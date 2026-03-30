import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Project {
    id: number;
    title: string;
    description: string | null;
    tags: string[] | null;
    year: string;
    link: string | null;
    github: string | null;
    images: string[] | null;
    sort_order: number;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    level: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Stack {
    id: number;
    name: string;
    image: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface DashboardStats {
    projects: number;
    messages: number;
    unread: number;
    skills: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    flash: {
        success?: string;
        error?: string;
    };
};

import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                syne: ["Syne", ...defaultTheme.fontFamily.sans],
                "dm-sans": ["DM Sans", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "slide-up": {
                    "0%": { transform: "translateY(110%)" },
                    "100%": { transform: "translateY(0)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "marquee": {
                    "0%":   { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-33.333%)" },
                },
                "marquee-reverse": {
                    "0%":   { transform: "translateX(-33.333%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            animation: {
                "slide-up":        "slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
                "fade-up":         "fade-up  0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
                "fade-in":         "fade-in  0.5s ease both",
                "marquee":         "marquee 20s linear infinite",
                "marquee-reverse": "marquee-reverse 20s linear infinite",
                "ticker":          "marquee 30s linear infinite",
            },
        },
    },

    plugins: [forms],
};

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
    extend: {
        animation: {
            'fade-in-down': 'fadeInDown 0.7s ease-out',
        },
        keyframes: {
            fadeInDown: {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
            },
        },
    },
};
export const plugins = [];


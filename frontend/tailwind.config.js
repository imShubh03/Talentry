/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
import daisyui from 'daisyui';

export default {
    darkMode: 'class', // Enables dark mode based on the 'class' strategy
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background, 0, 100%, 100%))',
                foreground: 'hsl(var(--foreground, 0, 0%, 0%))',
                card: {
                    DEFAULT: 'hsl(var(--card, 0, 100%, 100%))',
                    foreground: 'hsl(var(--card-foreground, 0, 0%, 0%))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover, 0, 100%, 100%))',
                    foreground: 'hsl(var(--popover-foreground, 0, 0%, 0%))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary, 200, 100%, 50%))',
                    foreground: 'hsl(var(--primary-foreground, 0, 100%, 100%))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary, 220, 100%, 50%))',
                    foreground: 'hsl(var(--secondary-foreground, 0, 100%, 100%))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted, 0, 0%, 80%))',
                    foreground: 'hsl(var(--muted-foreground, 0, 0%, 20%))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent, 150, 100%, 50%))',
                    foreground: 'hsl(var(--accent-foreground, 0, 100%, 100%))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive, 0, 100%, 50%))',
                    foreground: 'hsl(var(--destructive-foreground, 0, 100%, 100%))'
                },
                border: 'hsl(var(--border, 0, 0%, 90%))',
                input: 'hsl(var(--input, 0, 100%, 100%))',
                ring: 'hsl(var(--ring, 0, 100%, 100%))',
                chart: {
                    '1': 'hsl(var(--chart-1, 0, 100%, 100%))',
                    '2': 'hsl(var(--chart-2, 0, 0%, 20%))',
                    '3': 'hsl(var(--chart-3, 0, 0%, 30%))',
                    '4': 'hsl(var(--chart-4, 0, 0%, 40%))',
                    '5': 'hsl(var(--chart-5, 0, 0%, 50%))'
                }
            }
        }
    },
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#3b82f6",
                    "secondary": "#6366f1",
                    "accent": "#facc15",
                    "neutral": "#f3f4f6",
                    "base-100": "#ffffff",
                    "info": "#0ea5e9",
                    "success": "#10b981",
                    "warning": "#f97316",
                    "error": "#ef4444",
                }
            }
        ],
        base: true,
        utils: true
    },
    plugins: [tailwindcssAnimate, daisyui],
};

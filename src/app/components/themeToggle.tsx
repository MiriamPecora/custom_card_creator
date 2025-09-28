"use client";
import { useTheme } from "../custom_hooks/useTheme";

const themes = ["Pip-Boy", "Blush", "Cyberpunk", "YoRHa"] as const;

type Theme = (typeof themes)[number];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t as Theme)}
          className={`px-2 py-1 border rounded font-semibold shadow-[3px_3px_0px_0px_var(--accent-text)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition ${
              theme === t ? "border-[var(--primary-text)]" : ""
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

type Theme = "Pip-Boy" | "Blush" | "Cyberpunk" | "YoRHa";

export function useTheme(defaultTheme: Theme = "Pip-Boy") {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.className = saved;
    } else {
      document.documentElement.className = defaultTheme;
    }
  }, [defaultTheme]);

  const setNewTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return { theme, setTheme: setNewTheme };
}

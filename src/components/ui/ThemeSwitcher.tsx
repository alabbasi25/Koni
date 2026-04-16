import React from 'react';
import { Moon, Sun, Trees, Flower2 } from 'lucide-react';
import { Theme } from '../../types';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  const themes: { id: Theme; icon: React.ReactNode; label: string }[] = [
    { id: 'midnight', icon: <Moon size={18} />, label: 'مجرة' },
    { id: 'emerald', icon: <Trees size={18} />, label: 'زمرد' },
    { id: 'gold', icon: <Sun size={18} />, label: 'ذهب' },
    { id: 'rose', icon: <Flower2 size={18} />, label: 'ورد' },
  ];

  return (
    <div className="flex gap-2 p-1 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border)]">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
            currentTheme === t.id
              ? 'bg-[var(--color-primary)] text-white shadow-md'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)]'
          }`}
        >
          {t.icon}
          <span className="text-xs font-bold hidden sm:block">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

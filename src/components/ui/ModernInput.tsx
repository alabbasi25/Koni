import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const ModernInput: React.FC<ModernInputProps> = ({ label, icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-1 w-full group">
      <label 
        className={`absolute right-4 transition-all duration-300 pointer-events-none ${
          isFocused || props.value 
            ? '-top-2.5 text-xs bg-[var(--color-bg-card)] px-2 text-[var(--color-primary)] font-bold z-10' 
            : 'top-3.5 text-[var(--color-text-secondary)]'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
            {icon}
          </div>
        )}
        <input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`input-field font-medium ${icon ? 'pl-12' : ''}`}
        />
      </div>
    </div>
  );
};

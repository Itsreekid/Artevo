import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  /** When true, the switch is green when ON and red when OFF (status indicator). */
  statusColors?: boolean;
}

export default function Toggle({ checked, onChange, label, disabled, statusColors }: ToggleProps) {
  const trackColor = statusColors
    ? (checked ? '#16a34a' : '#dc2626')
    : (checked ? '#16a34a' : '#e5e7eb');

  return (
    <label className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <span style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, flexShrink: 0 }}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute', inset: 0, borderRadius: 9999,
            background: trackColor,
            boxShadow: statusColors ? `0 0 0 3px ${checked ? 'rgba(22,163,74,0.18)' : 'rgba(220,38,38,0.18)'}` : 'none',
            transition: 'background 0.25s ease, box-shadow 0.25s ease',
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute', top: 2, left: 2, width: 20, height: 20, borderRadius: 9999,
            background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            transform: checked ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.25s ease',
          }}
        />
      </span>
      {label && (
        <span
          className="ml-3 text-sm font-medium"
          style={{ color: statusColors ? (checked ? '#15803d' : '#b91c1c') : '#374151' }}
        >
          {label}
        </span>
      )}
    </label>
  );
}

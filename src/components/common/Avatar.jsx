import React from 'react';
import { getInitials } from '../../utils/formatters';

const SIZES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const COLORS = [
  'bg-indigo-500',
  'bg-violet-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-sky-500',
  'bg-teal-500',
];

const getColorFromName = (name = '') => {
  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
};

const Avatar = ({
  src,
  name = '',
  size = 'md',
  className = '',
  showOnlineIndicator = false,
  isOnline = false,
}) => {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${SIZES[size]} rounded-full object-cover ring-2 ring-white`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <div
        className={`
          ${SIZES[size]} rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white
          ${bgColor}
          ${src ? 'hidden' : ''}
        `}
      >
        {initials || '?'}
      </div>
      {showOnlineIndicator && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;

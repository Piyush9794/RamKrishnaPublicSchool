import React from 'react';

const BADGE_VARIANTS = {
  default: 'bg-slate-100 text-slate-700',
  slate: 'bg-slate-100 text-slate-700',
  primary: 'bg-indigo-100 text-indigo-700',
  indigo: 'bg-indigo-100 text-indigo-700 border border-indigo-200/50',
  emerald: 'bg-emerald-100 text-emerald-700 border border-emerald-200/50',
  amber: 'bg-amber-100 text-amber-700 border border-amber-200/50',
  red: 'bg-red-100 text-red-700 border border-red-200/50',
  violet: 'bg-violet-100 text-violet-700 border border-violet-200/50',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200/50',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  secondary: 'bg-purple-100 text-purple-700',
  present: 'bg-emerald-100 text-emerald-700',
  absent: 'bg-red-100 text-red-700',
  late: 'bg-amber-100 text-amber-700',
  'half day': 'bg-blue-100 text-blue-700',
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-emerald-100 text-emerald-700',
  partial: 'bg-blue-100 text-blue-700',
  overdue: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-500',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  cancelled: 'bg-slate-100 text-slate-500',
};

const SIZES = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

const Badge = ({ children, variant = 'default', size = 'md', dot = false, className = '' }) => {
  const variantClass = BADGE_VARIANTS[variant?.toLowerCase()] || BADGE_VARIANTS.default;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full shrink-0
        ${variantClass}
        ${SIZES[size]}
        ${className}
      `}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      )}
      {children}
    </span>
  );
};

export default Badge;

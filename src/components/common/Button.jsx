import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 disabled:bg-indigo-300',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:bg-slate-50 disabled:text-slate-400',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200 disabled:bg-red-300',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 disabled:bg-emerald-300',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-200 disabled:bg-amber-300',
  outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-50',
  'outline-primary': 'border border-indigo-300 bg-transparent hover:bg-indigo-50 text-indigo-600 disabled:opacity-50',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 disabled:opacity-50',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-md gap-1',
  sm: 'px-3 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-5 py-3 text-base rounded-xl gap-2',
  xl: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
};

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;
  const startIcon = leftIcon || icon;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed select-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin shrink-0" size={size === 'xs' || size === 'sm' ? 14 : 16} />
      ) : startIcon ? (
        <span className="shrink-0">{startIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

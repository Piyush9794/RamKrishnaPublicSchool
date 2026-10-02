import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterDropdown = ({
  label = 'Filter',
  options = [],
  value,
  onChange,
  placeholder = 'All',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((o) => (o.value ?? o) === value);
  const displayLabel = selectedOption ? (selectedOption.label ?? selectedOption) : placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optValue) => {
    onChange(optValue === value ? '' : optValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl border transition-all ${
          value
            ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        {label && <span className="text-xs text-slate-500 font-medium">{label}:</span>}
        <span className="font-medium">{displayLabel}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 right-0 sm:left-0 z-30 min-w-[160px] max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="py-1">
              <button
                onClick={() => handleSelect('')}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 transition-colors"
              >
                {placeholder}
                {!value && <Check size={14} className="text-indigo-600" />}
              </button>
              {options.map((opt, i) => {
                const optValue = opt.value ?? opt;
                const optLabel = opt.label ?? opt;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(optValue)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    {optLabel}
                    {value === optValue && <Check size={14} className="text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;

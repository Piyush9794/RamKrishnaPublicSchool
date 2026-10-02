import React from 'react';
import { motion } from 'framer-motion';
import { InboxIcon } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title = 'No data found',
  description = 'There is nothing to display here yet.',
  icon: Icon = InboxIcon,
  action,
  actionText,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
        <Icon size={28} className="text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action} variant="primary" size="sm">
          {actionText || 'Get Started'}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import appConfig from '../../config/appConfig';

const MobileSidebar = ({ isOpen, onClose, navItems, role }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 sidebar-gradient flex flex-col shadow-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{appConfig.appName}</p>
                  <p className="text-indigo-300 text-xs capitalize">{role} Portal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 no-scrollbar">
              {navItems.map((item, i) => (
                <React.Fragment key={i}>
                  {item.type === 'divider' ? (
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                    </div>
                  ) : item.children ? (
                    <div>
                      <p className="px-3 py-2 text-indigo-300 text-sm font-medium">{item.label}</p>
                      <div className="pl-4 space-y-0.5">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                                isActive
                                  ? 'bg-white/20 text-white font-medium'
                                  : 'text-indigo-300 hover:text-white hover:bg-white/10'
                              }`
                            }
                          >
                            {child.icon && <span className="shrink-0">{child.icon}</span>}
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.exact}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          isActive
                            ? 'bg-white/20 text-white font-semibold'
                            : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;

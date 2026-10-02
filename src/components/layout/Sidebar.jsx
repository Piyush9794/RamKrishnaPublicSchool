import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import appConfig from '../../config/appConfig';

const NavItem = ({ item, isCollapsed }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = React.useState(() =>
    item.children?.some((c) => location.pathname.startsWith(c.href))
  );

  const isActive = item.href
    ? location.pathname === item.href || location.pathname.startsWith(item.href + '/')
    : false;

  const hasChildren = item.children?.length > 0;

  if (hasChildren) {
    const isChildActive = item.children.some((c) => location.pathname.startsWith(c.href));
    return (
      <div>
        <button
          onClick={() => setIsExpanded((p) => !p)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
            isChildActive
              ? 'bg-white/15 text-white'
              : 'text-indigo-200 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="shrink-0">{item.icon}</span>
          {!isCollapsed && (
            <>
              <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              />
            </>
          )}
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-9 mt-0.5 space-y-0.5"
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.href}
      end={item.exact}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
          isActive
            ? 'bg-white/20 text-white font-semibold shadow-sm'
            : 'text-indigo-200 hover:bg-white/10 hover:text-white'
        }`
      }
      title={isCollapsed ? item.label : undefined}
    >
      <span className="shrink-0">{item.icon}</span>
      {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
    </NavLink>
  );
};

const Sidebar = ({ navItems, role }) => {
  const { sidebarCollapsed, toggleSidebar } = useTheme();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.2, type: 'spring', damping: 25, stiffness: 200 }}
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 sidebar-gradient shadow-xl"
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <GraduationCap size={20} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">{appConfig.appName}</p>
            <p className="text-indigo-300 text-xs capitalize">{role} Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 no-scrollbar">
        {navItems.map((item, i) => (
          <React.Fragment key={i}>
            {item.type === 'divider' ? (
              !sidebarCollapsed && (
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              )
            ) : (
              <NavItem item={item} isCollapsed={sidebarCollapsed} />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronRight
            size={18}
            className={`transition-transform duration-200 ${sidebarCollapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

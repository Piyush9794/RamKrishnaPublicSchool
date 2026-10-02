import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Bell, Sun, Moon, LogOut, User, Settings, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../common/Avatar';
import { getRelativeTime } from '../../utils/dateUtils';

const TopNavbar = ({ onMenuClick, title }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount, notifications, fetchNotifications, markRead, markAllRead } = useNotifications();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNotificationsOpen = () => {
    if (!showNotifications) fetchNotifications();
    setShowNotifications((p) => !p);
    setShowProfile(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const profileRoute = user?.role === 'admin'
    ? '/admin/settings'
    : user?.role === 'teacher'
    ? '/teacher/profile'
    : '/parent/profile';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-xs">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        {title && (
          <h1 className="text-base font-semibold text-slate-800 hidden sm:block">{title}</h1>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={handleNotificationsOpen}
            className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            id="notifications-btn"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute -right-2 sm:right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-sm text-slate-400">No notifications</div>
                  ) : (
                    notifications.slice(0, 10).map((n) => (
                      <button
                        key={n._id || n.id}
                        onClick={() => markRead(n._id || n.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 ${
                          !n.isRead ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!n.isRead && (
                            <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                          )}
                          <div className={!n.isRead ? '' : 'pl-3.5'}>
                            <p className="text-sm font-medium text-slate-800">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{getRelativeTime(n.createdAt)}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
                <Link
                  to={`/${user?.role}/notifications`}
                  onClick={() => setShowNotifications(false)}
                  className="block text-center py-3 text-sm text-indigo-600 font-medium hover:bg-slate-50 border-t border-slate-100"
                >
                  View all notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setShowProfile((p) => !p); setShowNotifications(false); }}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            id="profile-menu-btn"
            aria-label="Profile menu"
          >
            <Avatar name={user?.name || user?.email} size="sm" src={user?.avatar} />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-800 leading-tight max-w-[100px] truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to={profileRoute}
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <User size={15} className="text-slate-400" />
                    My Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/settings"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings size={15} className="text-slate-400" />
                      Settings
                    </Link>
                  )}
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

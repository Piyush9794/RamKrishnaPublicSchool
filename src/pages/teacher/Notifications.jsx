import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Clock, Info } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import { useNotifications } from '../../context/NotificationContext';
import { getRelativeTime } from '../../utils/dateUtils';

const TeacherNotifications = () => {
  const { notifications, markRead, markAllRead } = useNotifications();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Notifications"
        subtitle="Stay updated with school announcements, schedule changes, and leave updates"
        action={
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark All as Read
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            <Bell size={32} className="mx-auto text-slate-300 mb-2" />
            No notifications available
          </div>
        ) : (
          notifications.map((n) => (
            <motion.div
              key={n._id || n.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => markRead(n._id || n.id)}
              className={`p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                !n.isRead ? 'bg-indigo-50/40' : ''
              }`}
            >
              <div className={`p-2.5 rounded-xl ${!n.isRead ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">{n.title}</h4>
                  <span className="text-xs text-slate-400">{getRelativeTime(n.createdAt)}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{n.message}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherNotifications;

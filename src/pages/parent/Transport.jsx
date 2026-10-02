import React from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Clock, Phone, User } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentTransport = () => {
  const transportInfo = {
    busNumber: 'BUS-04 (KA-05-EX-4012)',
    routeName: 'Route 4 - Sector 12 & Central Avenue Loop',
    pickupStop: 'Stop 14 - Sector 12 Main Park Gate',
    pickupTime: '07:25 AM',
    dropTime: '03:45 PM',
    driverName: 'Robert Vance',
    driverPhone: '+1 (555) 444-2211',
    conductorName: 'Mark Higgins',
    conductorPhone: '+1 (555) 444-3322',
    vehicleStatus: 'On Schedule',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Transport Details"
        subtitle="Bus route schedule, pickup/drop timings, and driver contact details"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600 text-white rounded-xl">
              <Bus size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{transportInfo.busNumber}</h2>
              <p className="text-xs text-slate-500">{transportInfo.routeName}</p>
            </div>
          </div>
          <Badge variant="emerald">{transportInfo.vehicleStatus}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Pickup Location & Time</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin size={16} className="text-emerald-600" />
              <span>{transportInfo.pickupStop}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock size={14} className="text-slate-400" />
              <span>Morning Pickup: <strong>{transportInfo.pickupTime}</strong></span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Afternoon Drop Time</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin size={16} className="text-emerald-600" />
              <span>{transportInfo.pickupStop}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock size={14} className="text-slate-400" />
              <span>Afternoon Drop: <strong>{transportInfo.dropTime}</strong></span>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Assigned Bus Personnel</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{transportInfo.driverName} (Driver)</p>
                <p className="text-slate-500 mt-0.5">{transportInfo.driverPhone}</p>
              </div>
              <Phone size={16} className="text-emerald-600" />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{transportInfo.conductorName} (Conductor)</p>
                <p className="text-slate-500 mt-0.5">{transportInfo.conductorPhone}</p>
              </div>
              <Phone size={16} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentTransport;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, User, Truck, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';

const TABS = ['Vehicles', 'Routes', 'Drivers'];

const VEHICLES = [
  { id: 'VH001', number: 'UP32 AB 1234', model: 'TATA Starbus', capacity: 45, route: 'Route 1 — MG Road', driver: 'Ramesh Yadav', status: 'Active' },
  { id: 'VH002', number: 'UP32 CD 5678', model: 'Ashok Leyland', capacity: 50, route: 'Route 2 — Hazratganj', driver: 'Sunil Kumar', status: 'Active' },
  { id: 'VH003', number: 'UP32 EF 9012', model: 'TATA Starbus', capacity: 40, route: 'Route 3 — Gomti Nagar', driver: 'Amit Verma', status: 'Maintenance' },
];

const ROUTES = [
  { id: 'RT001', name: 'Route 1 — MG Road', stops: ['School', 'MG Road', 'Hazratganj', 'Charbagh'], students: 38, vehicle: 'VH001' },
  { id: 'RT002', name: 'Route 2 — Hazratganj', stops: ['School', 'Hazratganj', 'Aminabad', 'Alambagh'], students: 42, vehicle: 'VH002' },
  { id: 'RT003', name: 'Route 3 — Gomti Nagar', stops: ['School', 'Gomti Nagar', 'Vikas Nagar', 'Indira Nagar'], students: 35, vehicle: 'VH003' },
];

const DRIVERS = [
  { id: 'DR001', name: 'Ramesh Yadav', license: 'UP0120200012345', phone: '9876543210', vehicle: 'UP32 AB 1234', status: 'Active' },
  { id: 'DR002', name: 'Sunil Kumar', license: 'UP0120190067890', phone: '9812345678', vehicle: 'UP32 CD 5678', status: 'Active' },
  { id: 'DR003', name: 'Amit Verma', license: 'UP0120210034567', phone: '9898989898', vehicle: 'UP32 EF 9012', status: 'Active' },
];

const TransportPage = () => {
  const [activeTab, setActiveTab] = useState('Vehicles');

  return (
    <div className="space-y-5">
      <PageHeader
        title="Transport"
        subtitle="Manage vehicles, routes, drivers and student allocation"
        icon={<Bus size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Add New
          </button>
        }
      />

      <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'Vehicles' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {VEHICLES.map(v => (
              <div key={v.id} className="bg-white rounded-2xl card-shadow p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Bus size={24} className="text-blue-600" />
                  </div>
                  <Badge variant={v.status === 'Active' ? 'success' : 'warning'} size="sm">{v.status}</Badge>
                </div>
                <h3 className="font-bold text-slate-900">{v.number}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{v.model}</p>
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5"><Truck size={12} />Capacity: {v.capacity} seats</p>
                  <p className="flex items-center gap-1.5"><MapPin size={12} />{v.route}</p>
                  <p className="flex items-center gap-1.5"><User size={12} />{v.driver}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">View</button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Routes' && (
          <div className="space-y-4">
            {ROUTES.map(route => (
              <div key={route.id} className="bg-white rounded-2xl card-shadow p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{route.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{route.students} students · Vehicle: {route.vehicle}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {route.stops.map((stop, i) => (
                        <React.Fragment key={stop}>
                          <span className="text-xs px-2.5 py-1 bg-slate-100 rounded-full text-slate-700">{stop}</span>
                          {i < route.stops.length - 1 && <span className="text-slate-300">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={15} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Edit2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Drivers' && (
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Driver ID', 'Name', 'License No.', 'Phone', 'Assigned Vehicle', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DRIVERS.map(d => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{d.license}</td>
                      <td className="px-4 py-3 text-slate-600">{d.phone}</td>
                      <td className="px-4 py-3 text-slate-600">{d.vehicle}</td>
                      <td className="px-4 py-3"><Badge variant="success" size="sm">{d.status}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Edit2 size={15} /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TransportPage;

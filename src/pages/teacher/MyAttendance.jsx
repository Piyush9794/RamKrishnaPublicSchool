import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, CheckCircle2, Clock, AlertTriangle, WifiOff,
  RefreshCw, Navigation, Loader2, Shield
} from 'lucide-react';
import useGeolocation from '../../hooks/useGeolocation';
import teacherAttendanceApi from '../../services/teacherAttendance.api';

const STATUS_OPTIONS = ['Present', 'Half Day'];

const TeacherSelfAttendance = () => {
  const [status, setStatus] = useState('Present');
  const [remarks, setRemarks] = useState('');
  const [marked, setMarked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [todayRecord, setTodayRecord] = useState(null);

  const { location, isLoading: geoLoading, error: geoError, requestLocation, permissionState, reset } = useGeolocation();

  const handleMarkAttendance = async () => {
    if (!location) {
      setSubmitError('Location is required. Please detect location first.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        status,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        locationTimestamp: location.locationTimestamp,
        remarks: remarks.trim(),
      };
      await teacherAttendanceApi.markAttendance(payload);
      setMarked(true);
      setTodayRecord({ ...payload, markedAt: new Date().toLocaleTimeString('en-IN') });
    } catch (err) {
      setSubmitError(err?.response?.data?.message || 'Failed to mark attendance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDetectLocation = () => {
    reset();
    requestLocation();
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
        <p className="text-slate-500 mt-1">{today}</p>
      </div>

      {marked && todayRecord ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl card-shadow p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Attendance Marked!</h2>
          <p className="text-slate-500 text-sm mb-5">Your attendance has been recorded successfully.</p>
          <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="font-semibold text-emerald-600">{todayRecord.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Marked At</span>
              <span className="font-medium text-slate-800">{todayRecord.markedAt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Location</span>
              <span className="font-mono text-xs text-slate-700">
                {todayRecord.latitude.toFixed(4)}°N, {todayRecord.longitude.toFixed(4)}°E
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Accuracy</span>
              <span className="font-medium text-slate-800">±{Math.round(todayRecord.accuracy)}m</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-6 space-y-5">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Today's Attendance</span>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Not Marked</span>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Attendance Status</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${status === opt ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Location Detection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-600" />Location</span>
            </label>

            <AnimatePresence mode="wait">
              {geoLoading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <Loader2 size={18} className="animate-spin text-blue-600" />
                  <span className="text-sm text-blue-700">Detecting location...</span>
                </motion.div>
              )}
              {!geoLoading && location && (
                <motion.div key="success" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-700">Location detected ✓</span>
                  </div>
                  <div className="space-y-1 text-xs text-emerald-700 font-mono">
                    <p>Latitude: {location.latitude.toFixed(6)}°N</p>
                    <p>Longitude: {location.longitude.toFixed(6)}°E</p>
                    <p>Accuracy: ±{Math.round(location.accuracy)}m</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
                    <Shield size={11} />
                    <span>Any location allowed · No geofencing active</span>
                  </div>
                </motion.div>
              )}
              {!geoLoading && geoError && (
                <motion.div key="error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    {geoError.code === 'PERMISSION_DENIED' ? <Shield size={16} className="text-red-500" /> :
                     geoError.code === 'UNSUPPORTED' ? <WifiOff size={16} className="text-red-500" /> :
                     <AlertTriangle size={16} className="text-red-500" />}
                    <span className="text-sm font-semibold text-red-700">Location Error</span>
                  </div>
                  <p className="text-sm text-red-600">{geoError.message}</p>
                  {geoError.code === 'PERMISSION_DENIED' && (
                    <p className="text-xs text-red-500 mt-2">Please enable location access in your browser settings, then retry.</p>
                  )}
                </motion.div>
              )}
              {!geoLoading && !location && !geoError && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-center">
                  <Navigation size={20} className="text-slate-400 mx-auto mb-1.5" />
                  <p className="text-sm text-slate-500">📍 Location Required</p>
                  <p className="text-xs text-slate-400 mt-0.5">Click below to detect your current location</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!location && (
              <button
                onClick={handleDetectLocation}
                disabled={geoLoading}
                className="mt-2 w-full py-2.5 rounded-xl border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Navigation size={14} /> {geoLoading ? 'Detecting...' : 'Detect My Location'}
              </button>
            )}
            {location && (
              <button onClick={handleDetectLocation} disabled={geoLoading} className="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
                <RefreshCw size={11} /> Re-detect location
              </button>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Remarks (optional)</label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              rows={2}
              placeholder="Any notes..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Error */}
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" /> {submitError}
            </div>
          )}

          {/* Submit */}
          <motion.button
            onClick={handleMarkAttendance}
            disabled={submitting || !location}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {submitting ? <><Loader2 size={16} className="animate-spin" /> Marking...</> : <><CheckCircle2 size={16} /> Mark My Attendance</>}
          </motion.button>

          {!location && (
            <p className="text-center text-xs text-slate-400">
              ⚠️ Attendance cannot be submitted without location. Location is required.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherSelfAttendance;

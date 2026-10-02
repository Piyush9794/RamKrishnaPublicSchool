import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Shield, UserCheck, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_HOME_ROUTES } from '../../utils/roles';

const ROLE_TABS = [
  { role: ROLES.ADMIN, label: 'Admin', icon: Shield, color: 'from-violet-600 to-indigo-600', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-300', ring: 'ring-violet-500' },
  { role: ROLES.TEACHER, label: 'Teacher', icon: UserCheck, color: 'from-blue-600 to-cyan-600', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', ring: 'ring-blue-500' },
  { role: ROLES.PARENT, label: 'Parent', icon: Users, color: 'from-emerald-600 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', ring: 'ring-emerald-500' },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES.ADMIN);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login, user, isAuthenticated, getHomeRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  // Redirect authenticated user to their role portal automatically
  useEffect(() => {
    if (isAuthenticated && user) {
      const fromPath = location.state?.from?.pathname;
      const targetRoute = fromPath && fromPath.startsWith(`/${user.role}`) ? fromPath : getHomeRoute();
      navigate(targetRoute, { replace: true });
    }
  }, [isAuthenticated, user, getHomeRoute, location, navigate]);

  const activeTab = ROLE_TABS.find(t => t.role === selectedRole);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setLoginError('');
    reset();
  };

  const onSubmit = async (data) => {
    setLoginError('');
    try {
      // Determine role based on selected tab
      const roleToUse = selectedRole;
      const userData = await login({ ...data, role: roleToUse });

      // Calculate appropriate home route for logged in role
      const homeRoute = ROLE_HOME_ROUTES[userData.role] || '/';
      const fromPath = location.state?.from?.pathname;

      // Only redirect to fromPath if it matches the user's role namespace
      const targetRoute = fromPath && fromPath.startsWith(`/${userData.role}`) ? fromPath : homeRoute;

      navigate(targetRoute, { replace: true });
    } catch (err) {
      setLoginError(err?.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <GraduationCap size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            School Management<br />System
          </h1>
          <p className="text-indigo-200 text-lg mb-12">
            Empowering education through<br />intelligent management
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Students', value: '2,500+' },
              { label: 'Teachers', value: '150+' },
              { label: 'Classes', value: '80+' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-indigo-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <GraduationCap size={28} className="sm:hidden text-white" />
              <GraduationCap size={32} className="hidden sm:block text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">School Management System</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">Sign in to your account</p>

            {/* Role Selector */}
            <div className="flex gap-1.5 sm:gap-2 mb-6 p-1 bg-slate-100 rounded-2xl">
              {ROLE_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = selectedRole === tab.role;
                return (
                  <button
                    key={tab.role}
                    type="button"
                    onClick={() => handleRoleChange(tab.role)}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${isActive
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-sm`
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Error Alert */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2"
                >
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{loginError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    type="email"
                    id="email"
                    placeholder="you@school.edu"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.email
                        ? 'border-red-300 focus:ring-red-400 bg-red-50'
                        : 'border-slate-200 focus:ring-indigo-400 bg-white'
                      }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.password
                        ? 'border-red-300 focus:ring-red-400 bg-red-50'
                        : 'border-slate-200 focus:ring-indigo-400 bg-white'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${activeTab.color} shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  `Sign in as ${activeTab.label}`
                )}
              </motion.button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

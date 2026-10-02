import React, { useState, useRef } from 'react';
import {
  CreditCard, Printer, Download, Palette, QrCode, Sparkles,
  ShieldCheck, User, Search, Check, RefreshCw, Layers,
  Phone, MapPin, Calendar, HeartPulse, Bus, Award, ArrowLeftRight
} from 'lucide-react';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';

const THEMES = [
  {
    id: 'navy',
    name: 'Classic Navy & Gold',
    headerBg: 'bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900',
    headerText: 'text-amber-400',
    accentBorder: 'border-amber-400',
    badgeBg: 'bg-amber-400 text-indigo-950',
    bodyBg: 'bg-white',
    cardBorder: 'border-indigo-200',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue & White',
    headerBg: 'bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900',
    headerText: 'text-white',
    accentBorder: 'border-blue-500',
    badgeBg: 'bg-blue-600 text-white',
    bodyBg: 'bg-slate-50',
    cardBorder: 'border-blue-200',
  },
  {
    id: 'emerald',
    name: 'Modern Emerald',
    headerBg: 'bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900',
    headerText: 'text-emerald-300',
    accentBorder: 'border-emerald-400',
    badgeBg: 'bg-emerald-500 text-white',
    bodyBg: 'bg-white',
    cardBorder: 'border-emerald-200',
  },
  {
    id: 'crimson',
    name: 'Imperial Crimson',
    headerBg: 'bg-gradient-to-r from-rose-900 via-rose-950 to-slate-900',
    headerText: 'text-rose-200',
    accentBorder: 'border-rose-400',
    badgeBg: 'bg-rose-600 text-white',
    bodyBg: 'bg-rose-50/30',
    cardBorder: 'border-rose-200',
  },
  {
    id: 'dark',
    name: 'Luxury Dark',
    headerBg: 'bg-gradient-to-r from-slate-900 via-slate-950 to-black',
    headerText: 'text-yellow-400',
    accentBorder: 'border-yellow-500',
    badgeBg: 'bg-yellow-500 text-slate-950',
    bodyBg: 'bg-slate-900 text-slate-100',
    cardBorder: 'border-slate-800',
  },
];

const MOCK_STUDENTS = [
  {
    id: 'STU-2026-001',
    rollNo: '101',
    name: 'Aarav Sharma',
    class: '10',
    section: 'A',
    dob: '15 Aug 2010',
    gender: 'Male',
    bloodGroup: 'O+',
    fatherName: 'Rajesh Sharma',
    contact: '+91 98765 43210',
    address: '124, Park Street, Civil Lines, Kanpur',
    busRoute: 'Route #4 (Kidwai Nagar)',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80',
    academicYear: '2026 - 2027',
  },
  {
    id: 'STU-2026-002',
    rollNo: '102',
    name: 'Ananya Verma',
    class: '10',
    section: 'A',
    dob: '22 Mar 2011',
    gender: 'Female',
    bloodGroup: 'B+',
    fatherName: 'Sunil Verma',
    contact: '+91 98123 45678',
    address: '45, Swaroop Nagar, Mall Road, Kanpur',
    busRoute: 'Route #2 (Arya Nagar)',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&auto=format&fit=crop&q=80',
    academicYear: '2026 - 2027',
  },
  {
    id: 'STU-2026-003',
    rollNo: '103',
    name: 'Rohan Gupta',
    class: '12',
    section: 'Science',
    dob: '05 Nov 2008',
    gender: 'Male',
    bloodGroup: 'AB+',
    fatherName: 'Mahesh Gupta',
    contact: '+91 97654 32109',
    address: '88, Kakadeo Main Road, Kanpur',
    busRoute: 'Self Transport',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
    academicYear: '2026 - 2027',
  },
];

const IdCardDesignerPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape'
  const [activeSide, setActiveSide] = useState('front'); // 'front' | 'back'
  const [searchQuery, setSearchQuery] = useState('');

  // Customizable School Info
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'RAMKRISHNA PUBLIC SCHOOL',
    tagline: 'Affiliated to CBSE, New Delhi • Affiliation No. 2130099',
    address: 'GT Road, Near Swaroop Nagar, Kanpur, UP - 208001',
    phone: '+91 63921 80746 | info@rkps.edu.in',
  });

  // Toggles for card fields
  const [visibleFields, setVisibleFields] = useState({
    dob: true,
    bloodGroup: true,
    fatherName: true,
    contact: true,
    busRoute: true,
    qrCode: true,
    signature: true,
  });

  // Editable Student Data
  const [studentData, setStudentData] = useState(MOCK_STUDENTS[0]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudentData(student);
  };

  const handleInputChange = (field, value) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleField = (field) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const filteredStudents = MOCK_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.class.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo">Admin Exclusive</Badge>
            <span className="text-xs font-semibold text-slate-500">• ID Card Studio</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Student ID Card Designer
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Customize, preview, and print official high-resolution student identity cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOrientation((o) => (o === 'portrait' ? 'landscape' : 'portrait'))}
            icon={<ArrowLeftRight size={15} />}
          >
            {orientation === 'portrait' ? 'Switch to Landscape' : 'Switch to Portrait'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            icon={<Printer size={15} />}
          >
            Print ID Card
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customization Controls & Student List */}
        <div className="lg:col-span-6 space-y-6">
          {/* Student Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User size={16} className="text-indigo-600" /> Select Student
            </h3>

            <div className="relative">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search student name, ID or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {filteredStudents.map((stu) => {
                const isSelected = selectedStudent.id === stu.id;
                return (
                  <button
                    key={stu.id}
                    onClick={() => handleStudentSelect(stu)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img
                      src={stu.photo}
                      alt={stu.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{stu.name}</p>
                      <p className="text-[10px] font-semibold text-indigo-600">
                        Cl: {stu.class}-{stu.section}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Palette Chooser */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Palette size={16} className="text-indigo-600" /> Card Color Theme
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {THEMES.map((t) => {
                const active = selectedTheme.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheme(t)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      active
                        ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    {active && <Check size={14} className="text-indigo-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Edit Student Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers size={16} className="text-indigo-600" /> Edit ID Card Data
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Student Name</label>
                <input
                  type="text"
                  value={studentData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Student ID / Adm No</label>
                <input
                  type="text"
                  value={studentData.id}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Class & Section</label>
                <input
                  type="text"
                  value={`${studentData.class} - ${studentData.section}`}
                  onChange={(e) => {
                    const [c, s] = e.target.value.split('-');
                    handleInputChange('class', c?.trim() || e.target.value);
                    handleInputChange('section', s?.trim() || '');
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Roll No</label>
                <input
                  type="text"
                  value={studentData.rollNo}
                  onChange={(e) => handleInputChange('rollNo', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Blood Group</label>
                <input
                  type="text"
                  value={studentData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Father's Name</label>
                <input
                  type="text"
                  value={studentData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Visible Field Toggles */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo-600" /> Card Display Options
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.keys(visibleFields).map((field) => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all capitalize ${
                    visibleFields[field]
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-400 bg-slate-50'
                  }`}
                >
                  {field.replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live ID Card Preview */}
        <div className="lg:col-span-6 space-y-6 sticky top-24">
          <div className="bg-slate-900 p-3.5 sm:p-6 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center space-y-6 min-h-[450px] sm:min-h-[500px] w-full overflow-x-auto">
            {/* Top Preview Controls */}
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live Card Preview
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeSide === 'front' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeSide === 'back' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Back Side
                </button>
              </div>
            </div>

            {/* ID CARD CONTAINER */}
            <div ref={printRef} className="print:m-0 print:p-0">
              {orientation === 'portrait' ? (
                /* PORTRAIT CARD (CR-80 standard size ~3.375" x 2.125") */
                <div
                  className={`w-[290px] h-[460px] ${selectedTheme.bodyBg} ${selectedTheme.cardBorder} border-2 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between relative transition-all duration-300 text-slate-900`}
                >
                  {activeSide === 'front' ? (
                    <>
                      {/* School Header Banner */}
                      <div className={`${selectedTheme.headerBg} p-4 text-center text-white relative shadow-sm`}>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-xs border border-white/30">
                            RK
                          </div>
                          <span className={`text-xs font-black tracking-tight ${selectedTheme.headerText}`}>
                            {schoolInfo.name}
                          </span>
                        </div>
                        <p className="text-[8px] font-medium text-slate-200 leading-tight">
                          {schoolInfo.tagline}
                        </p>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex-1 flex flex-col items-center text-center justify-between">
                        {/* Student Photo */}
                        <div className="relative">
                          <div className={`w-24 h-24 rounded-2xl p-1 bg-gradient-to-b from-slate-200 to-white shadow-md border-2 ${selectedTheme.accentBorder}`}>
                            <img
                              src={studentData.photo}
                              alt={studentData.name}
                              className="w-full h-full rounded-xl object-cover"
                            />
                          </div>
                          <span className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md ${selectedTheme.badgeBg}`}>
                            STUDENT
                          </span>
                        </div>

                        {/* Name & Class */}
                        <div className="mt-2 space-y-0.5">
                          <h4 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                            {studentData.name}
                          </h4>
                          <p className="text-[11px] font-bold text-indigo-700">
                            CLASS: {studentData.class} - {studentData.section}
                          </p>
                        </div>

                        {/* Student Details Grid */}
                        <div className="w-full bg-slate-100/80 p-2.5 rounded-xl border border-slate-200 text-[10px] text-slate-800 space-y-1.5 text-left font-medium">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-bold">ADM NO:</span>
                            <span className="font-bold text-slate-900">{studentData.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-bold">ROLL NO:</span>
                            <span className="font-bold text-slate-900">{studentData.rollNo}</span>
                          </div>
                          {visibleFields.dob && (
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-bold">DOB:</span>
                              <span>{studentData.dob}</span>
                            </div>
                          )}
                          {visibleFields.bloodGroup && (
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-bold">BLOOD GROUP:</span>
                              <span className="font-extrabold text-rose-600">{studentData.bloodGroup}</span>
                            </div>
                          )}
                          {visibleFields.busRoute && (
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-bold">ROUTE:</span>
                              <span className="truncate max-w-[120px]">{studentData.busRoute}</span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Barcode */}
                        {visibleFields.qrCode && (
                          <div className="w-full pt-1 flex flex-col items-center justify-center">
                            {/* Dummy Barcode lines */}
                            <div className="h-6 w-3/4 flex items-center justify-center gap-0.5 opacity-80">
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-full ${i % 3 === 0 ? 'w-1 bg-slate-900' : 'w-0.5 bg-slate-700'}`}
                                />
                              ))}
                            </div>
                            <span className="text-[8px] font-mono font-bold text-slate-500 tracking-widest mt-0.5">
                              {studentData.id}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer Academic Year */}
                      <div className={`${selectedTheme.headerBg} py-1 text-center text-[9px] font-bold text-white`}>
                        SESSION: {studentData.academicYear}
                      </div>
                    </>
                  ) : (
                    /* BACK SIDE PORTRAIT */
                    <div className="p-4 flex-1 flex flex-col justify-between text-left text-slate-800 text-[10px]">
                      <div className="space-y-3">
                        <div className="border-b border-slate-200 pb-2">
                          <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wide">
                            EMERGENCY INFORMATION
                          </h5>
                          <p className="text-[9px] text-slate-500">If found, please return to school address.</p>
                        </div>

                        <div className="space-y-2">
                          {visibleFields.fatherName && (
                            <div>
                              <span className="text-slate-400 font-bold block text-[9px]">FATHER'S NAME</span>
                              <span className="font-bold text-slate-900">{studentData.fatherName}</span>
                            </div>
                          )}
                          {visibleFields.contact && (
                            <div>
                              <span className="text-slate-400 font-bold block text-[9px]">EMERGENCY PHONE</span>
                              <span className="font-bold text-indigo-700">{studentData.contact}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-slate-400 font-bold block text-[9px]">RESIDENTIAL ADDRESS</span>
                            <span className="font-medium text-slate-800 leading-tight block">
                              {studentData.address}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-200 text-center">
                        <div>
                          <p className="text-[8px] text-slate-500 leading-tight">
                            {schoolInfo.address}
                            <br />
                            Phone: {schoolInfo.phone}
                          </p>
                        </div>

                        {visibleFields.signature && (
                          <div className="pt-2 flex flex-col items-center">
                            <div className="h-6 font-serif italic text-slate-700 font-bold text-xs">
                              R.K. Sharma
                            </div>
                            <span className="text-[8px] font-bold text-slate-400 border-t border-slate-300 px-4 pt-0.5">
                              PRINCIPAL SIGNATURE
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* LANDSCAPE CARD (CR-80 standard 460px x 280px) */
                <div
                  className={`w-[450px] h-[270px] ${selectedTheme.bodyBg} ${selectedTheme.cardBorder} border-2 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between relative transition-all duration-300 text-slate-900`}
                >
                  {activeSide === 'front' ? (
                    <>
                      <div className={`${selectedTheme.headerBg} px-4 py-2 flex items-center justify-between text-white shadow-sm`}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-[10px] border border-white/30">
                            RK
                          </div>
                          <div>
                            <span className={`text-xs font-black tracking-tight ${selectedTheme.headerText}`}>
                              {schoolInfo.name}
                            </span>
                            <p className="text-[7px] text-slate-200 leading-none">{schoolInfo.tagline}</p>
                          </div>
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${selectedTheme.badgeBg}`}>
                          STUDENT ID CARD
                        </span>
                      </div>

                      <div className="p-3 flex-1 flex items-center gap-4">
                        <div className="shrink-0 flex flex-col items-center">
                          <div className={`w-24 h-24 rounded-xl p-1 bg-white border-2 ${selectedTheme.accentBorder} shadow-md`}>
                            <img
                              src={studentData.photo}
                              alt={studentData.name}
                              className="w-full h-full rounded-lg object-cover"
                            />
                          </div>
                          <span className="text-[8px] font-mono font-bold text-slate-600 mt-1">
                            {studentData.id}
                          </span>
                        </div>

                        <div className="flex-1 space-y-1 text-left">
                          <h4 className="text-sm font-black text-slate-900">{studentData.name}</h4>
                          <p className="text-xs font-bold text-indigo-700">
                            CLASS: {studentData.class} - {studentData.section} | ROLL NO: {studentData.rollNo}
                          </p>

                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-medium text-slate-700 bg-slate-100 p-2 rounded-lg border border-slate-200 mt-2">
                            {visibleFields.dob && <div><span className="text-slate-400">DOB:</span> {studentData.dob}</div>}
                            {visibleFields.bloodGroup && <div><span className="text-slate-400">BLOOD:</span> <strong className="text-rose-600">{studentData.bloodGroup}</strong></div>}
                            {visibleFields.fatherName && <div><span className="text-slate-400">FATHER:</span> {studentData.fatherName}</div>}
                            {visibleFields.contact && <div><span className="text-slate-400">PHONE:</span> {studentData.contact}</div>}
                          </div>
                        </div>
                      </div>

                      <div className={`${selectedTheme.headerBg} px-4 py-1 text-center text-[8px] font-bold text-white flex justify-between`}>
                        <span>SESSION: {studentData.academicYear}</span>
                        <span>{schoolInfo.phone}</span>
                      </div>
                    </>
                  ) : (
                    /* LANDSCAPE BACK SIDE */
                    <div className="p-4 flex-1 flex flex-col justify-between text-left text-slate-800 text-[10px]">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-bold text-slate-900 uppercase text-[10px] mb-1">RESIDENTIAL ADDRESS</h5>
                          <p className="text-[9px] text-slate-700 leading-snug">{studentData.address}</p>
                          <p className="text-[9px] font-bold text-indigo-700 mt-1">BUS ROUTE: {studentData.busRoute}</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 uppercase text-[10px] mb-1">SCHOOL CONTACT</h5>
                          <p className="text-[8px] text-slate-500 leading-tight">{schoolInfo.address}</p>
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-t border-slate-200 pt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-slate-900 p-1 rounded-lg flex items-center justify-center text-white">
                            <QrCode size={30} />
                          </div>
                          <span className="text-[8px] text-slate-400 font-mono">SCAN FOR VERIFICATION</span>
                        </div>

                        {visibleFields.signature && (
                          <div className="text-center">
                            <div className="h-5 font-serif italic text-slate-700 font-bold text-xs">R.K. Sharma</div>
                            <span className="text-[7px] font-bold text-slate-400 border-t border-slate-300 px-2">PRINCIPAL</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-400 font-medium">
              Click <strong className="text-white">Print ID Card</strong> to generate high-resolution print copy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCardDesignerPage;

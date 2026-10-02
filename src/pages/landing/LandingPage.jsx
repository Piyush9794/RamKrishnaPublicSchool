import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Phone, Mail, MapPin, Award, BookOpen, Users,
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock, Menu, X,
  Laptop, Library, Bus, Trophy, HeartHandshake, ChevronRight, Star
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import AnimateOnScroll from '../../components/common/AnimateOnScroll';
import Loader from '../../components/common/Loader';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SVG animation duration is 1.94s playing at 0.5x speed (3.88s total cycle)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3880);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loader
        fullScreen
        size="lg"
        text="Loading Radhakrishna Public School..."
        className='text-black'
        src="/Loader (1).lottie"
      />
    );
  }

  const stats = [
    { label: 'Enrolled Students', value: '2,500+', icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Certified Educators', value: '150+', icon: GraduationCap, color: 'from-violet-500 to-purple-600' },
    { label: 'Academic Excellence', value: '100%', icon: Award, color: 'from-emerald-500 to-teal-600' },
    { label: 'Co-Curricular Clubs', value: '35+', icon: Trophy, color: 'from-amber-500 to-orange-600' },
  ];

  const academicPrograms = [
    {
      title: 'Primary Wing',
      grades: 'Classes I – V',
      desc: 'Building strong foundational literacy, numeracy, creative thinking, and holistic character building through activity-based learning.',
      color: 'bg-blue-50/80 border-blue-200 text-blue-900',
      badge: 'Foundation Phase',
    },
    {
      title: 'Middle School',
      grades: 'Classes VI – VIII',
      desc: 'Fostering inquiry-driven STEM learning, digital skills, analytical reasoning, languages, and competitive sports development.',
      color: 'bg-violet-50/80 border-violet-200 text-violet-900',
      badge: 'Exploration Phase',
    },
    {
      title: 'Secondary School',
      grades: 'Classes IX – X',
      desc: 'Rigorous academic curriculum preparing students for board excellence, competitive aptitude, scientific labs, and leadership roles.',
      color: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      badge: 'Board Preparation',
    },
    {
      title: 'Senior Secondary',
      grades: 'Classes XI – XII',
      desc: 'Specialized streams in Science, Commerce, and Humanities with integrated entrance exam mentorship and career counseling.',
      color: 'bg-amber-50/80 border-amber-200 text-amber-900',
      badge: 'Career & College',
    },
  ];

  const facilities = [
    { title: 'Smart Classrooms', desc: 'Interactive digital boards, multimedia lectures, and high-speed campus WiFi.', icon: Laptop },
    { title: 'Science & STEM Labs', desc: 'State-of-the-art Physics, Chemistry, Biology, and Robotics laboratories.', icon: Sparkles },
    { title: 'Central Library', desc: 'Over 20,000 reference books, journals, and quiet digital e-learning stations.', icon: Library },
    { title: 'GPS Transport', desc: 'Fleet of safe air-conditioned buses equipped with real-time GPS tracking & CCTV.', icon: Bus },
    { title: 'Sports & Athletics', desc: 'Basketball court, football ground, cricket nets, indoor badminton & chess arena.', icon: Trophy },
    { title: 'Health & Safety', desc: '24/7 campus CCTV surveillance, qualified medical infirmary, and security guards.', icon: ShieldCheck },
  ];

  const teachers = [
    {
      name: 'Dr. Anjali Sharma',
      designation: 'Principal',
      subject: 'School Administration',
      experience: '18+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-indigo-500 to-violet-500',
    },

    {
      name: 'Mr. Rajesh Kumar',
      designation: 'Senior Mathematics Teacher',
      subject: 'Mathematics • Classes IX–XII',
      experience: '15+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-blue-500 to-indigo-500',
    },

    {
      name: 'Dr. Neha Verma',
      designation: 'Senior Science Teacher',
      subject: 'Physics • Classes XI–XII',
      experience: '12+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-emerald-500 to-teal-500',
    },

    {
      name: 'Mrs. Priya Singh',
      designation: 'English Faculty',
      subject: 'English Literature • Classes VI–XII',
      experience: '10+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-rose-500 to-pink-500',
    },

    {
      name: 'Mr. Amit Gupta',
      designation: 'Computer Science Teacher',
      subject: 'Computer Science • Coding & AI',
      experience: '9+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-cyan-500 to-blue-500',
    },

    {
      name: 'Mrs. Kavita Mishra',
      designation: 'Social Science Teacher',
      subject: 'History • Geography • Civics',
      experience: '14+ Years Experience',
      avatar:
        'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=900&auto=format&fit=crop&q=85',
      badgeColor: 'from-amber-500 to-orange-500',
    },
  ];
  const notices = [
    { date: 'OCT 05, 2026', title: 'Admissions Open for Academic Session 2026-27', tag: 'Admissions' },
    { date: 'OCT 12, 2026', title: 'Annual Inter-School Science & Technology Exhibition', tag: 'Events' },
    { date: 'OCT 18, 2026', title: 'Mid-Term Board Examination Schedule Announced', tag: 'Academic' },
  ];

  const testimonials = [
    {
      name: 'Mr. Rajesh Sharma',
      role: 'Parent of Class 10 Student',
      quote: 'Ramkrishna Public School has provided an exceptional academic atmosphere for my son. The teachers are dedicated and supportive.',
      rating: 5,
    },
    {
      name: 'Dr. Sunita Verma',
      role: 'Parent of Class 8 Student',
      quote: 'The balance between academics, STEM activities, and co-curricular sports at RKPS is incredible. My daughter loves going to school every day!',
      rating: 5,
    },
  ];

  const topStudents = [
    {
      name: 'Aarav Sharma',
      class: 'Class 12 • CBSE Science',
      score: '98.6%',
      rank: 'School Topper (Rank #1)',
      stream: 'PCM + Computer Science',
      highlights: ['100/100 Physics', '99/100 Mathematics'],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Ananya Verma',
      class: 'Class 10 • CBSE Board',
      score: '97.8%',
      rank: 'District Rank #2',
      stream: 'General CBSE Curriculum',
      highlights: ['100/100 Science', '99/100 English'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Rohan Gupta',
      class: 'Class 12 • Commerce',
      score: '97.2%',
      rank: 'Commerce Stream Topper',
      stream: 'Accountancy + Economics',
      highlights: ['100/100 Accountancy', '98/100 Business'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Priya Singh',
      class: 'Class 12 • Humanities',
      score: '96.5%',
      rank: 'Humanities Stream Topper',
      stream: 'History + Pol. Science',
      highlights: ['99/100 Political Science', '98/100 History'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-violet-500 to-purple-500',
    },
    {
      name: 'Ananya Verma',
      class: 'Class 10 • CBSE Board',
      score: '97.8%',
      rank: 'District Rank #2',
      stream: 'General CBSE Curriculum',
      highlights: ['100/100 Science', '99/100 English'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Rohan Gupta',
      class: 'Class 12 • Commerce',
      score: '97.2%',
      rank: 'Commerce Stream Topper',
      stream: 'Accountancy + Economics',
      highlights: ['100/100 Accountancy', '98/100 Business'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Priya Singh',
      class: 'Class 12 • Humanities',
      score: '96.5%',
      rank: 'Humanities Stream Topper',
      stream: 'History + Pol. Science',
      highlights: ['99/100 Political Science', '98/100 History'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-violet-500 to-purple-500',
    },
    {
      name: 'Ananya Verma',
      class: 'Class 10 • CBSE Board',
      score: '97.8%',
      rank: 'District Rank #2',
      stream: 'General CBSE Curriculum',
      highlights: ['100/100 Science', '99/100 English'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Rohan Gupta',
      class: 'Class 12 • Commerce',
      score: '97.2%',
      rank: 'Commerce Stream Topper',
      stream: 'Accountancy + Economics',
      highlights: ['100/100 Accountancy', '98/100 Business'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Priya Singh',
      class: 'Class 12 • Humanities',
      score: '96.5%',
      rank: 'Humanities Stream Topper',
      stream: 'History + Pol. Science',
      highlights: ['99/100 Political Science', '98/100 History'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-violet-500 to-purple-500',
    }, {
      name: 'Ananya Verma',
      class: 'Class 10 • CBSE Board',
      score: '97.8%',
      rank: 'District Rank #2',
      stream: 'General CBSE Curriculum',
      highlights: ['100/100 Science', '99/100 English'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Rohan Gupta',
      class: 'Class 12 • Commerce',
      score: '97.2%',
      rank: 'Commerce Stream Topper',
      stream: 'Accountancy + Economics',
      highlights: ['100/100 Accountancy', '98/100 Business'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badgeColor: 'from-emerald-500 to-teal-500',
    }

  ];

  const StudentCarousel = ({ students }) => {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate the cards for a seamless infinite loop
    const carouselItems = [...students, ...students];

    return (
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-20 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />

        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 z-20 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

        <motion.div
          className="flex w-max gap-5 sm:gap-6 md:gap-8"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {carouselItems.map((student, index) => (
            <article
              key={`${student.name}-${index}`}
              className="
              group
              relative
              shrink-0
              w-[220px]
              sm:w-[250px]
              md:w-[280px]
              lg:w-[300px]
            "
            >
              {/* Image Card */}
              <div
                className="
                relative
                aspect-[1.25/1]
                overflow-hidden
                rounded-2xl
                bg-slate-100
                border
                border-slate-200
                shadow-sm
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:shadow-xl
                group-hover:border-indigo-200
              "
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
                  loading="lazy"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                {/* Score */}
                <div
                  className={`
                  absolute
                  top-3
                  right-3
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  py-1.5
                  rounded-full
                  bg-gradient-to-r
                  ${student.badgeColor}
                  text-white
                  text-xs
                  font-black
                  shadow-lg
                  border
                  border-white/30
                `}
                >
                  <Sparkles size={11} />
                  {student.score}
                </div>

                {/* Rank */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-[11px] font-bold text-slate-700 shadow-md">
                    <Award
                      size={12}
                      className="text-amber-500"
                    />
                    {student.rank}
                  </span>
                </div>
              </div>

              {/* Student information */}
              <div className="pt-3 px-1">
                <h3
                  className="
                  text-sm
                  sm:text-base
                  font-bold
                  text-slate-900
                  truncate
                  group-hover:text-indigo-600
                  transition-colors
                "
                >
                  {student.name}
                </h3>

                <p className="text-xs sm:text-sm text-indigo-600 font-semibold mt-0.5 truncate">
                  {student.class}
                </p>

                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 truncate">
                  {student.stream}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    );
  };

  //Teacher carousel

  const TeacherCarousel = ({ teachers }) => {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate cards for seamless infinite scrolling
    const carouselItems = [...teachers, ...teachers];

    return (
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div
          className="
          absolute
          left-0
          top-0
          bottom-0
          w-16
          sm:w-24
          md:w-32
          z-20
          pointer-events-none
          bg-gradient-to-r
          from-slate-50
          via-slate-50/80
          to-transparent
        "
        />

        {/* Right fade */}
        <div
          className="
          absolute
          right-0
          top-0
          bottom-0
          w-16
          sm:w-24
          md:w-32
          z-20
          pointer-events-none
          bg-gradient-to-l
          from-slate-50
          via-slate-50/80
          to-transparent
        "
        />

        <motion.div
          className="flex w-max gap-5 sm:gap-6 md:gap-8"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {carouselItems.map((teacher, index) => (
            <article
              key={`${teacher.name}-${index}`}
              className="
              group
              relative
              shrink-0
              w-[220px]
              sm:w-[250px]
              md:w-[280px]
              lg:w-[300px]
            "
            >
              {/* Teacher Image */}
              <div
                className="
                relative
                aspect-[1.25/1]
                overflow-hidden
                rounded-2xl
                bg-slate-100
                border
                border-slate-200
                shadow-sm
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:shadow-xl
                group-hover:border-indigo-200
              "
              >
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  loading="lazy"
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
                />

                {/* Image Overlay */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/55
                  via-black/5
                  to-transparent
                "
                />

                {/* Experience Badge */}
                <div
                  className={`
                  absolute
                  top-3
                  right-3
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  py-1.5
                  rounded-full
                  bg-gradient-to-r
                  ${teacher.badgeColor}
                  text-white
                  text-[10px]
                  sm:text-xs
                  font-black
                  shadow-lg
                  border
                  border-white/30
                `}
                >
                  <Award size={11} />
                  {teacher.experience}
                </div>

                {/* Designation */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span
                    className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/95
                    backdrop-blur-sm
                    px-3
                    py-1.5
                    text-[10px]
                    sm:text-[11px]
                    font-bold
                    text-slate-700
                    shadow-md
                  "
                  >
                    <GraduationCap
                      size={12}
                      className="text-indigo-600"
                    />

                    {teacher.designation}
                  </span>
                </div>
              </div>

              {/* Teacher Information */}
              <div className="pt-3 px-1">
                <h3
                  className="
                  text-sm
                  sm:text-base
                  font-bold
                  text-slate-900
                  truncate
                  group-hover:text-indigo-600
                  transition-colors
                "
                >
                  {teacher.name}
                </h3>

                <p
                  className="
                  text-xs
                  sm:text-sm
                  text-indigo-600
                  font-semibold
                  mt-0.5
                  truncate
                "
                >
                  {teacher.subject}
                </p>

                <p
                  className="
                  text-[11px]
                  sm:text-xs
                  text-slate-500
                  mt-1
                  truncate
                "
                >
                  Dedicated to Student Success
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Fixed Sticky Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Announcement Bar */}
        {/* <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white text-xs py-2 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-white/10">
          <div className="flex items-center gap-6">
            <a href="tel:+916392180746" className="flex items-center gap-1.5 hover:text-indigo-200 transition-colors">
              <Phone size={13} className="text-indigo-400" />
              <span className="font-semibold">+91 63921 80746</span>
            </a>
            <a href="mailto:info@rkps.edu.in" className="hidden md:flex items-center gap-1.5 hover:text-indigo-200 transition-colors">
              <Mail size={13} className="text-indigo-400" />
              <span>info@rkps.edu.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-indigo-200">Affiliated to Central Board of Secondary Education (CBSE)</span>
            <Link
              to="/login"
              className="bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full text-xs font-semibold text-white transition-all border border-white/20"
            >
              Portal Login →
            </Link>
          </div>
        </div> */}

        {/* Main Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap size={22} className="sm:hidden" />
              <GraduationCap size={24} className="hidden sm:block" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg lg:text-xl font-black text-slate-900 leading-none tracking-tight block truncate">
                Ramkrishna Public School
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-widest block mt-0.5 truncate">
                RKPS • CBSE Affiliated
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a>
            <a href="#academics" className="hover:text-indigo-600 transition-colors">Academics</a>
            <a href="#toppers" className="hover:text-indigo-600 transition-colors">Toppers</a>
            <a href="#facilities" className="hover:text-indigo-600 transition-colors">Facilities</a>
            <a href="#notices" className="hover:text-indigo-600 transition-colors">Notice Board</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              icon={<Users size={16} />}
            >
              Portal Login
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight size={16} />}
            >
              Apply Admissions
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 shrink-0"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Slideout Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 overflow-hidden px-4 py-4 space-y-3"
            >
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">About Us</a>
              <a href="#academics" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">Academics</a>
              <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">Facilities</a>
              <a href="#notices" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">Notice Board</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-700">Contact & Map</a>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Button fullWidth onClick={() => navigate('/login')}>Portal Login</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <AnimateOnScroll animation="fade-down" delay={0.2}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} /> Welcome to Ramkrishna Public School
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-right" delay={0.3}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Empowering Minds,<br />
                  <span className="text-gradient">Inspiring Excellence</span>
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={0.4}>
                <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Ramkrishna Public School provides a world-class environment fostering academic brilliance, moral integrity, modern STEM skills, and holistic physical development for every child.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={0.5}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                  <Button
                    size="lg"
                    onClick={() => navigate('/login')}
                    icon={<Users size={18} />}
                  >
                    Portal Login
                  </Button>
                  <a href="tel:+916392180746">
                    <Button variant="outline" size="lg" icon={<Phone size={18} />}>
                      Call +91 63921 80746
                    </Button>
                  </a>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={0.6}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-500" /> CBSE Accredited
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Smart Digital Campus
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-500" /> GPS Safe Transport
                  </span>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Card Feature Display */}
            <AnimateOnScroll animation="zoom-in" delay={0.3} className="relative">
              <div className="bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-5 sm:p-8 text-white shadow-2xl shadow-indigo-300/50 space-y-6 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Ramkrishna Public School</h3>
                      <p className="text-xs text-indigo-200">Session 2026-2027</p>
                    </div>
                  </div>
                  <Badge variant="emerald">Admissions Open</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                    <p className="text-xs text-indigo-200">School Code</p>
                    <p className="text-base sm:text-lg font-bold">RKPS-80746</p>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                    <p className="text-xs text-indigo-200">Helpline</p>
                    <p className="text-sm sm:text-base font-bold">+91 63921 80746</p>
                  </div>
                </div>

                <div className="p-4 bg-white/15 backdrop-blur rounded-2xl border border-white/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Quick Access Portals</span>
                    <span className="text-emerald-300">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                    <Link to="/login" className="p-2 bg-white text-indigo-900 rounded-xl hover:bg-indigo-50 transition-colors">
                      Admin
                    </Link>
                    <Link to="/login" className="p-2 bg-white text-indigo-900 rounded-xl hover:bg-indigo-50 transition-colors">
                      Teacher
                    </Link>
                    <Link to="/login" className="p-2 bg-white text-indigo-900 rounded-xl hover:bg-indigo-50 transition-colors">
                      Parent
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <AnimateOnScroll key={idx} animation="zoom-in-up" delay={idx * 0.1}>
                  <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5 sm:gap-4 shadow-xs hover:shadow-md transition-all hover:-translate-y-1">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon size={22} className="sm:hidden" />
                      <Icon size={24} className="hidden sm:block" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll animation="fade-down">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="indigo">About RKPS</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Nurturing Character & Academic Vision</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Founded on principles of educational excellence, Ramkrishna Public School blends modern technological pedagogy with timeless moral values.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateOnScroll animation="fade-up-right" delay={0.1}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Academic Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Empowering students with innovative curriculum, critical thinking, mathematical proficiency, and creative expression.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={0.2}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Moral & Ethics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Instilling discipline, respect, empathy, responsibility, and cultural pride in every student from early years.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up-left" delay={0.3}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Future Readiness</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Equipping children with digital literacy, computer coding, robotics, public speaking, and problem-solving skills.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section id="academics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll animation="fade-down">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="emerald">Academic Wings</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Structured Learning Pathways</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Comprehensive educational curriculum tailored for every developmental phase.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicPrograms.map((prog, idx) => (
              <AnimateOnScroll key={idx} animation="flip-up" delay={idx * 0.1}>
                <div className={`p-6 rounded-3xl border shadow-xs transition-all hover:-translate-y-1 flex flex-col justify-between ${prog.color}`}>
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/70">
                      {prog.badge}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{prog.title}</h3>
                    <p className="text-xs font-semibold text-slate-500">{prog.grades}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{prog.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
    TOP PERFORMERS / ACHIEVERS
========================================================= */}

      <section
        id="toppers"
        className="py-20 bg-white border-y border-slate-200/80 overflow-hidden"
      >
        <div className="space-y-12">

          {/* Section Heading */}
          <AnimateOnScroll animation="fade-down">
            <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                <Trophy
                  size={14}
                  className="text-amber-600"
                />

                CBSE Board Toppers & Achievers
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Celebrating Our Top Performers
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Meet our exceptional students who achieved outstanding
                academic results through dedication, hard work and
                faculty mentorship.
              </p>

            </div>
          </AnimateOnScroll>


          {/* =====================================================
        INFINITE CAROUSEL
    ===================================================== */}

          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <StudentCarousel students={topStudents} />
          </AnimateOnScroll>


          {/* Bottom Button */}
          <AnimateOnScroll animation="fade-up" delay={0.3}>
            <div className="flex justify-center px-4 pt-2">

              <button
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
                className="
            group
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            border
            border-slate-200
            bg-white
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            hover:border-indigo-300
            hover:text-indigo-600
            hover:shadow-md
            transition-all
          "
              >
                Discover More

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </div>
          </AnimateOnScroll>

        </div>
      </section>


      {/* =========================================================
    TEACHERS / FACULTY SECTION
========================================================= */}

      <section
        id="teachers"
        className="
    py-20
    bg-slate-50
    border-y
    border-slate-200/80
    overflow-hidden
  "
      >
        <div className="space-y-12">

          {/* Section Heading */}
          <AnimateOnScroll animation="fade-down">
            <div
              className="
          text-center
          max-w-3xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          space-y-4
        "
            >
              {/* Badge */}
              <div
                className="
            inline-flex
            items-center
            gap-2
            px-4
            py-1.5
            rounded-full
            bg-indigo-100
            text-indigo-800
            text-xs
            font-bold
            border
            border-indigo-200
          "
              >
                <GraduationCap
                  size={14}
                  className="text-indigo-600"
                />

                Our Faculty
              </div>

              {/* Heading */}
              <h2
                className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
            text-slate-900
            tracking-tight
          "
              >
                Meet Our Dedicated Teachers
              </h2>

              {/* Description */}
              <p
                className="
            text-slate-600
            text-sm
            sm:text-base
            leading-relaxed
            max-w-2xl
            mx-auto
          "
              >
                Our experienced educators are committed to creating
                an inspiring learning environment and helping every
                student reach their full potential.
              </p>
            </div>
          </AnimateOnScroll>


          {/* =====================================================
        TEACHER CAROUSEL
    ===================================================== */}

          <AnimateOnScroll
            animation="fade-up"
            delay={0.2}
          >
            <TeacherCarousel teachers={teachers} />
          </AnimateOnScroll>


          {/* Faculty CTA */}
          <AnimateOnScroll
            animation="fade-up"
            delay={0.3}
          >
            <div className="flex justify-center px-4 pt-2">

              <button
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
                className="
            group
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            border
            border-slate-200
            bg-white
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            hover:border-indigo-300
            hover:text-indigo-600
            hover:shadow-md
            transition-all
          "
              >
                Meet Our Faculty

                <ArrowRight
                  size={16}
                  className="
              transition-transform
              group-hover:translate-x-1
            "
                />
              </button>

            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* Facilities Showcase */}
      <section id="facilities" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll animation="fade-down">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="violet">Campus Infrastructure</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">World-Class Facilities</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Modern amenities engineered to inspire intellectual curiosity and active sports participation.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <AnimateOnScroll key={idx} animation="fade-up" delay={idx * 0.08}>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-start gap-4 hover:-translate-y-1">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{fac.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{fac.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notice Board */}
      <section id="notices" className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <AnimateOnScroll animation="fade-right">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-300 mb-3">
                  <Clock size={13} /> Official Announcements
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">School Notice Board</h2>
                <p className="text-xs text-indigo-200 mt-2 leading-relaxed">
                  Stay informed with latest school announcements, academic schedules, and admissions alerts.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-2 space-y-3">
              {notices.map((n, idx) => (
                <AnimateOnScroll key={idx} animation="fade-left" delay={idx * 0.1}>
                  <div className="p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:bg-white/15 transition-colors">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-400">{n.date} • {n.tag}</span>
                      <p className="text-sm font-semibold text-white mt-0.5">{n.title}</p>
                    </div>
                    <ChevronRight size={18} className="text-indigo-300 shrink-0" />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimateOnScroll animation="fade-down">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="amber">Parent Testimonials</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">What Parents Say About RKPS</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item, idx) => (
              <AnimateOnScroll key={idx} animation="zoom-in-up" delay={idx * 0.15}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 hover:-translate-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                  <div className="border-t border-slate-100 pt-3">
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* School Info */}
            <AnimateOnScroll animation="fade-right">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Ramkrishna Public School</h3>
                    <p className="text-xs text-indigo-400">CBSE Affiliated Institution</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ramkrishna Public School is dedicated to nurturing young minds with holistic education, scientific temperament, and ethical foundations.
                </p>

                <div className="space-y-2.5 text-xs">
                  <a href="tel:+916392180746" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                    <Phone size={16} className="text-indigo-400 shrink-0" />
                    <span className="font-bold text-sm text-indigo-300">+91 63921 80746</span>
                  </a>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail size={16} className="text-indigo-400 shrink-0" />
                    <span>info@rkps.edu.in / admissions@rkps.edu.in</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>Ramkrishna Public School, Knowledge Park Campus, Main Road, Sector 12</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Quick Links */}
            <AnimateOnScroll animation="fade-up" delay={0.1}>
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Portals</h4>
                  <ul className="space-y-2">
                    <li><Link to="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                    <li><Link to="/login" className="hover:text-white transition-colors">Teacher Portal</Link></li>
                    <li><Link to="/login" className="hover:text-white transition-colors">Parent Portal</Link></li>
                    <li><Link to="/login" className="hover:text-white transition-colors">Student Attendance</Link></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#about" className="hover:text-white transition-colors">About School</a></li>
                    <li><a href="#academics" className="hover:text-white transition-colors">Academic Streams</a></li>
                    <li><a href="#facilities" className="hover:text-white transition-colors">Facilities</a></li>
                    <li><a href="#notices" className="hover:text-white transition-colors">Notices & Events</a></li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Google Map Location in Footer */}
            <AnimateOnScroll animation="fade-left" delay={0.2}>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-400" />
                  School Map Location
                </h4>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
                  <iframe
                    title="Ramkrishna Public School Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562094291886!2d77.361234!3d28.582100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjhCsDM0JzU1LjYiTiA3N8KwMjEnNDAuNCJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll animation="fade-up" delay={0.3}>
            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
              <p>© {new Date().getFullYear()} Ramkrishna Public School (RKPS). All Rights Reserved.</p>
              <p>Designed for Academic Excellence & Efficient School Governance.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_PATH = '/Loader (1).lottie';

const SIZES = {
  xs: { icon: 48, spinner: 16 },
  sm: { icon: 80, spinner: 20 },
  md: { icon: 140, spinner: 32 },
  lg: { icon: 220, spinner: 44 },
  xl: { icon: 320, spinner: 56 },
};

const Loader = ({
  size = 'lg',
  text,
  subtext,
  fullScreen = false,
  className = '',
  src = DEFAULT_PATH,
  speed = 0.5,
  variant = 'auto', // 'auto' | 'spinner'
}) => {
  const [hasError, setHasError] = useState(false);

  const getDimension = () => {
    if (typeof size === 'number') return size;
    return SIZES[size]?.icon || SIZES.lg.icon;
  };

  const getSpinnerSize = () => {
    if (typeof size === 'number') return Math.max(16, Math.floor(size / 4));
    return SIZES[size]?.spinner || SIZES.lg.spinner;
  };

  const dimension = getDimension();
  const path = src || DEFAULT_PATH;
  const isLottie = path.toLowerCase().endsWith('.lottie') || path.toLowerCase().endsWith('.json');

  const renderContent = () => {
    const isSpinner = variant === 'spinner' || hasError;

    return (
      <div className={`flex flex-col items-center justify-center gap-3 text-center ${className}`}>
        {!isSpinner ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ width: dimension, height: dimension }}
          >
            {isLottie ? (
              <DotLottieReact
                src={encodeURI(path)}
                autoplay
                loop
                speed={speed}
                onError={() => setHasError(true)}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={encodeURI(path)}
                  alt="Loading..."
                  onError={() => setHasError(true)}
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={getSpinnerSize()} className="text-indigo-600 dark:text-indigo-400" />
          </motion.div>
        )}

        {text && (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-black tracking-wide animate-pulse">
              {text}
            </p>

            {subtext && (
              <p className="text-xs text-black font-medium">
                {subtext}
              </p>
            )}
          </div>
        )}

      </div>
    );
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white w-screen h-screen overflow-hidden transition-all duration-300">
        {renderContent()}
      </div>
    );
  }

  return renderContent();
};

export const PageLoader = ({ text = 'Loading Radhakrishna Public School...', subtext }) => (
  <div className="flex items-center justify-center min-h-[400px] w-full p-6">
    <Loader size="lg" text={text} subtext={subtext} />
  </div>
);

export default Loader;



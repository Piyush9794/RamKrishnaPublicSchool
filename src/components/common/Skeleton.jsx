import React from 'react';

const Skeleton = ({ className = '', ...props }) => (
  <div className={`skeleton rounded-lg ${className}`} {...props} />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
    <Skeleton className="h-3 w-3/5" />
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 5 }) => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
    <div className="p-4 border-b border-slate-100">
      <Skeleton className="h-8 w-48" />
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-100">
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="p-4 text-left">
              <Skeleton className="h-4 w-20" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, ri) => (
          <tr key={ri} className="border-b border-slate-50">
            {Array.from({ length: cols }).map((_, ci) => (
              <td key={ci} className="p-4">
                <Skeleton className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const SkeletonStats = ({ count = 4 }) => (
  <div className={`grid grid-cols-2 md:grid-cols-${count} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    ))}
  </div>
);

export default Skeleton;

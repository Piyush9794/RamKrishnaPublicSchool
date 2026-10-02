import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from path if items not provided
  const crumbs = items || (() => {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.map((part, i) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      href: '/' + parts.slice(0, i + 1).join('/'),
    }));
  })();

  if (!crumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-slate-500">
      <Link to="/" className="flex items-center hover:text-slate-700 transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.href || i}>
            <ChevronRight size={14} className="text-slate-300 shrink-0" />
            {isLast || !crumb.href ? (
              <span className={`font-medium ${isLast ? 'text-slate-900' : 'text-slate-500'}`}>
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.href} className="hover:text-slate-700 transition-colors">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
